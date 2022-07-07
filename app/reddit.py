from flask import session, request, redirect, jsonify
from flask_openapi3 import APIBlueprint, Tag
from nanoid import generate
import requests as req
import urllib.parse as url
import os

from app.model import Token

tag = Tag(name='Reddit', description='Reddit API')
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
    return Token(token_data['access_token'],
                 token_data['refresh_token'], token_data['expires_in'])


@auth.get('/callback', responses={'200': Token})
def reddit_auth_callback():
    query = request.args

    if 'error' in query:
        return jsonify({'message': query.error}), 400

    if query['state'] != session[SESSION_STATE]:
        return jsonify({'message': 'Invalid state'}), 400

    token = _get_access_token({
        'grant_type': 'authorization_code',
        'code': query['code'],
        'redirect_uri': _redirect_url(),
    })
    return jsonify(token)


@auth.post('/refresh', responses={'200': Token})
def reddit_refresh():
    refresh_token = request.get_data()
    token = _get_access_token({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    })
    return jsonify(token)


@auth.post('/revoke', responses={'200': None})
def reddit_revoke():
    token = request.get_data()
    data = {'token': token}
    res = req.post(REDDIT_REVOKE_URL, data=data,
                   auth=_basic_auth(), headers=headers)
    res.raise_for_status()

    return None


api.register_api(auth)
