from flask import request
from flask_openapi3 import APIBlueprint, Tag
from gppt import GetPixivToken
import requests as req
import os

from app.model import OAuthToken, Login, RefreshToken
from app.auth import basic_security

tag = Tag(name='Pixiv')
api = APIBlueprint('pixiv', __name__, url_prefix='/pixiv', abp_tags=[tag])
auth = APIBlueprint('auth', __name__, url_prefix='/auth', abp_tags=[tag])


def _client(): return os.getenv('PIXIV_CLIENT')
def _secret(): return os.getenv('PIXIV_SECRET')


def _build_token(res: dict) -> OAuthToken:
    return OAuthToken(access_token=res['access_token'], refresh_token=res['refresh_token'], expires_in=res['expires_in'])


@auth.post('/', responses={'200': OAuthToken})
def pixiv_auth(body: Login):
    """ Login to pixiv
    This might take a while to finish. It uses selenium to login as the user and could be error prone.
    """
    g = GetPixivToken()
    res = g.login(headless=True, user=body.username, pass_=body.password)

    return _build_token(res).dict()


@auth.post('/refresh', responses={'200': OAuthToken})
def pixiv_refresh(body: RefreshToken):
    """ Get a new access token using the refresh token
    """
    data = {
        'client_id': _client(),
        'client_secret': _secret(),
        'refresh_token': body.refresh_token,
        'grant_type': 'refresh_token',
    }
    res = req.post('https://oauth.secure.pixiv.net/auth/token', data=data)
    res.raise_for_status()

    return _build_token(res.json()).dict()


api.register_api(auth)
