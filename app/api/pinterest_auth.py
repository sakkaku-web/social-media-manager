from flask import session, request, redirect
from flask_openapi3 import APIBlueprint, Tag
import requests as req
import os
import urllib.parse as url
from nanoid import generate
from pydantic import BaseModel
import base64

from app.model import OAuthToken, Login, RefreshToken, ErrorMessage, AuthQuery
from app.auth import basic_security, SESSION_REDIRECT, redirect_or_return
from app.config import pinterest_tag

auth_api = APIBlueprint(
    'auth', __name__, url_prefix='/auth', abp_tags=[pinterest_tag])

SESSION_STATE = 'PINTEREST_STATE'


class PinterestCallback(BaseModel):
    state: str
    code: str


def _client(): return os.getenv('PINTEREST_CLIENT')
def _secret(): return os.getenv('PINTEREST_SECRET')


def _redirect_url():
    return url.urljoin(request.base_url, 'callback')


@auth_api.get('/', responses={'302': None})
def pinterest_auth(query: AuthQuery):
    """ Redirects to reddit login
    """
    state = generate()
    query_str = url.urlencode({
        'client_id': _client(),
        'response_type': 'code',
        'redirect_uri': _redirect_url(),
        'state': state,
        'scope': 'boards:read,pins:read,user_accounts:read'
    })

    session[SESSION_STATE] = state
    session[SESSION_REDIRECT] = query.return_to
    return redirect(f'https://www.pinterest.com/oauth?{query_str}')


@auth_api.get('/callback', responses={'200': OAuthToken, '400': ErrorMessage})
def pinterest_auth_callback(query: PinterestCallback):
    """ Callback after login to get access token
    """
    if query.state != session[SESSION_STATE]:
        return ErrorMessage(message='Invalid state').dict(), 400

    data = {
        'code': query.code,
        'redirect_uri': _redirect_url(),
        'grant_type': 'authorization_code',
    }
    basic = base64.b64encode(f'{_client()}:{_secret()}'.encode('utf-8'))

    res = req.post('https://api.pinterest.com/v5/oauth/token', data=data,
                   headers={'Authorization': f'Basic {str(basic, "utf-8")}'})
    res.raise_for_status()
    token = res.json()
    oauth = OAuthToken(access_token=token['access_token'],
                       refresh_token=token['refresh_token'],
                       expires_in=token['expires_in'])

    return redirect_or_return('pinterest', oauth.dict())
