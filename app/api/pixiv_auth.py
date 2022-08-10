from flask_openapi3 import APIBlueprint, Tag
from gppt import GetPixivToken
import requests as req
import os

from app.model import OAuthToken, Login, RefreshToken
from app.auth import basic_security
from app.config import pixiv_tag

auth_api = APIBlueprint(
    'auth', __name__, url_prefix='/auth', abp_tags=[pixiv_tag])


class PixivToken(OAuthToken):
    user_id: int
    username: str
    name: str


def _client(): return os.getenv('PIXIV_CLIENT')
def _secret(): return os.getenv('PIXIV_SECRET')


def _build_token(res: dict) -> PixivToken:
    return PixivToken(access_token=res['access_token'],
                      refresh_token=res['refresh_token'],
                      expires_in=res['expires_in'],
                      user_id=res['user']['id'],
                      username=res['user']['account'],
                      name=res['user']['name'])


def _refresh_token(refresh_token: str) -> PixivToken:
    data = {
        'client_id': _client(),
        'client_secret': _secret(),
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token',
    }
    res = req.post('https://oauth.secure.pixiv.net/auth/token', data=data)
    res.raise_for_status()

    return _build_token(res.json())


@auth_api.post('/', responses={'200': PixivToken})
def pixiv_auth(body: Login):
    """ Login to pixiv
    This might take a while to finish. It uses selenium to login as the user and could be error prone.
    """
    g = GetPixivToken()
    res = g.login(headless=True, user=body.username, pass_=body.password)

    return _refresh_token(res['refresh_token']).dict()


@auth_api.post('/refresh', responses={'200': PixivToken})
def pixiv_refresh(body: RefreshToken):
    """ Get a new access token using the refresh token
    """
    return _refresh_token(body.refresh_token).dict()
