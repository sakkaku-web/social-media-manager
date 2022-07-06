from flask import Flask, redirect, request, jsonify, session
from nanoid import generate
import requests as req
import urllib.parse as url
import os
from dataclasses import dataclass


app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')

REDIRECT_URI = 'http://localhost:5000/api/reddit/auth/callback'
REDDIT_TOKEN_URL = 'https://www.reddit.com/api/v1/access_token'
REDDIT_REVOKE_URL = 'https://www.reddit.com/api/v1/revoke_token'
SESSION_STATE = 'REDDIT_STATE'
def client(): return os.getenv('REDDIT_CLIENT')
def secret(): return os.getenv('REDDIT_SECRET')


@dataclass
class TokenResponse:
    access_token: str
    refresh_token: str
    expires_in: int


@app.get('/api/reddit/auth')
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
        'client_id': client(),
        'response_type': 'code',
        'state': state,
        'redirect_uri': REDIRECT_URI,
        'duration': 'permanent',
        'scope': ' '.join(scopes),
    })

    session[SESSION_STATE] = state
    return redirect(f'https://www.reddit.com/api/v1/authorize?{query}')


def _basic_auth():
    return req.auth.HTTPBasicAuth(client(), secret())


def _get_access_token(data: dict):
    res = req.post(REDDIT_TOKEN_URL, data=data, auth=_basic_auth())
    res.raise_for_status()

    token_data = res.json()
    return TokenResponse(token_data['access_token'],
                         token_data['refresh_token'], token_data['expires_in'])


@app.get('/api/reddit/auth/callback')
def reddit_auth_callback():
    query = request.args

    if 'error' in query:
        return jsonify({'message': query.error}), 400

    if query['state'] != session[SESSION_STATE]:
        return jsonify({'message': 'Invalid state'}), 400

    token = _get_access_token({
        'grant_type': 'authorization_code',
        'code': query['code'],
        'redirect_uri': REDIRECT_URI,
    })
    return jsonify(token)


@app.post('/api/reddit/auth/refresh')
def reddit_refresh():
    refresh_token = request.get_data()
    token = _get_access_token({
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
    })
    return jsonify(token)


@app.post('/api/reddit/auth/revoke')
def reddit_revoke():
    token = request.get_data()
    data = {'token': token}
    req.post(REDDIT_REVOKE_URL, data=data, auth=_basic_auth())


if __name__ == '__main__':
    app.run(debug=True)
