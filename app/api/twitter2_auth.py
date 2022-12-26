from flask import session, request, redirect
from flask_openapi3 import APIBlueprint, Tag
from nanoid import generate
import requests as req
import urllib.parse as url
import os

from app.model import OAuthToken, RefreshToken, ErrorMessage, Token, AuthQuery
from app.config import twitter2_tag
from app.auth import SESSION_REDIRECT, redirect_or_return

auth_api = APIBlueprint('twitter2_auth', __name__,
                        url_prefix='/auth', abp_tags=[twitter2_tag])

REDDIT_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
REDDIT_REVOKE_URL = 'https://www.reddit.com/api/v1/revoke_token'
SESSION_STATE = 'TWITTER2_STATE'


def _client(): return os.getenv('TWITTER2_CLIENT')
def _secret(): return os.getenv('TWITTER2_SECRET')


def _redirect_url():
    return url.urljoin(request.base_url, 'callback')


scopes = [
    'tweet.read',
    'users.read',
    'offline.access',
]


@auth_api.get('/', responses={'302': None})
def twitter_auth(query: AuthQuery):
    """ Redirects to twitter login
    """
    state = generate()

    query_str = url.urlencode({
        'client_id': _client(),
        'response_type': 'code',
        'state': state,
        'redirect_uri': _redirect_url(),
        'scope': ' '.join(scopes),
        'code_challenge': state,
        'code_challenge_method': 'plain',
    })

    session[SESSION_STATE] = state
    session[SESSION_REDIRECT] = query.return_to
    return redirect(f'https://twitter.com/i/oauth2/authorize?{query_str}')


def _basic_auth():
    return req.auth.HTTPBasicAuth(_client(), _secret())


def _get_access_token(data: dict):
    res = req.post('https://api.twitter.com/2/oauth2/token',
                   data=data, auth=_basic_auth())
    res.raise_for_status()

    token_data = res.json()
    return OAuthToken(access_token=token_data['access_token'],
                      refresh_token='',
                      expires_in=token_data['expires_in'])


@auth_api.get('/callback', responses={'200': OAuthToken, '400': ErrorMessage})
def twitter_auth_callback():
    """ Callback after login to get access token
    """
    query = request.args

    if 'error' in query:
        return ErrorMessage(message=query['error']).dict(), 400

    if query['state'] != session[SESSION_STATE]:
        return ErrorMessage(message='Invalid state').dict(), 400

    token = _get_access_token({
        'grant_type': 'client_credentials',
        'client_id': _client(),
        'client_secret': _secret(),
        'client_type': 'third_party_app',
        'scope': ' '.join(scopes),
        'redirect_uri': _redirect_url(),
        'code': query['code'],
        'code_verifier': session[SESSION_STATE]
    })

    return redirect_or_return('twitter2', token.dict())


# @auth_api.post('/refresh', responses={'200': OAuthToken})
# def reddit_refresh(body: RefreshToken):
#     """ Get a new access token using the refresh token
#     """
#     token = _get_access_token({
#         'grant_type': 'refresh_token',
#         'refresh_token': body.refresh_token,
#     })
#     return token.dict()


# @auth_api.post('/revoke', responses={'200': None})
# def reddit_revoke(body: Token):
#     """ Revoke an access token or refresh token
#     """
#     data = {'token': body.token}
#     res = req.post(REDDIT_REVOKE_URL, data=data,
#                    auth=_basic_auth(), headers=headers)
#     res.raise_for_status()

#     return ''
