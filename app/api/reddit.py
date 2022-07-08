from flask import session, request, redirect
from flask_openapi3 import APIBlueprint, Tag
from nanoid import generate
import requests as req
import urllib.parse as url
import os

from app.model import OAuthToken, RefreshToken, ErrorMessage, Token

tag = Tag(name='Reddit')
api = APIBlueprint('reddit', __name__, url_prefix='/reddit', abp_tags=[tag])
auth = APIBlueprint('auth', __name__, url_prefix='/auth', abp_tags=[tag])


REDDIT_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
REDDIT_REVOKE_URL = 'https://www.reddit.com/api/v1/revoke_token'
SESSION_STATE = 'REDDIT_STATE'
def _client(): return os.getenv('REDDIT_CLIENT')
def _secret(): return os.getenv('REDDIT_SECRET')


headers = {
    'User-Agent': 'web:sns-manager-api:0.0.1 (by /u/illu11)',
}


def _redirect_url():
    return url.urljoin(request.base_url, 'callback')


@auth.get('/', responses={'302': None})
def reddit_auth():
    """ Redirects to reddit login
    """
    state = generate()
    scopes = [
        'identity',
        'edit',
        'structuredstyles',
        'read',
        'submit',
        'flair',
    ]

    query = url.urlencode({
        'client_id': _client(),
        'response_type': 'code',
        'state': state,
        'redirect_uri': _redirect_url(),
        'duration': 'permanent',
        'scope': ' '.join(scopes),
    })

    session[SESSION_STATE] = state
    return redirect(f'https://www.reddit.com/api/v1/authorize?{query}')


def _basic_auth():
    return req.auth.HTTPBasicAuth(_client(), _secret())


def _get_access_token(data: dict):
    res = req.post(REDDIT_TOKEN_URL, data=data,
                   auth=_basic_auth(), headers=headers)
    res.raise_for_status()

    token_data = res.json()
    return OAuthToken(access_token=token_data['access_token'],
                      refresh_token=token_data['refresh_token'], expires_in=token_data['expires_in'])


@auth.get('/callback', responses={'200': OAuthToken, '400': ErrorMessage})
def reddit_auth_callback():
    """ Callback after login to get access token
    """
    query = request.args

    if 'error' in query:
        return ErrorMessage(message=query['error']).dict(), 400

    if query['state'] != session[SESSION_STATE]:
        return ErrorMessage(message='Invalid state').dict(), 400

    token = _get_access_token({
        'grant_type': 'authorization_code',
        'code': query['code'],
        'redirect_uri': _redirect_url(),
    })
    return token.dict()


@auth.post('/refresh', responses={'200': OAuthToken})
def reddit_refresh(body: RefreshToken):
    """ Get a new access token using the refresh token
    """
    token = _get_access_token({
        'grant_type': 'refresh_token',
        'refresh_token': body.refresh_token,
    })
    return token.dict()


@auth.post('/revoke', responses={'200': None})
def reddit_revoke(body: Token):
    """ Revoke an access token or refresh token
    """
    data = {'token': body.token}
    res = req.post(REDDIT_REVOKE_URL, data=data,
                   auth=_basic_auth(), headers=headers)
    res.raise_for_status()

    return ''


api.register_api(auth)
