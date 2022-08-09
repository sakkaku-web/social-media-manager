from flask import session, request, redirect
from flask_openapi3 import APIBlueprint
import os
import tweepy
from pydantic import BaseModel
import urllib.parse as url

from app.model import ErrorMessage, AuthQuery
from app.config import twitter_tag
from app.auth import SESSION_REDIRECT, redirect_or_return

auth_api = APIBlueprint(
    'auth', __name__, url_prefix='/auth', abp_tags=[twitter_tag])

SESSION_TWITTER_OAUTH_SECRET = 'TWITTER_OAUTH_SECRET'


def _client(): return os.getenv('TWITTER_CLIENT')
def _secret(): return os.getenv('TWITTER_SECRET')


def _redirect_url():
    return url.urljoin(request.base_url, 'callback')


class TwitterToken(BaseModel):
    access_token: str
    access_secret: str


class TwitterCallback(BaseModel):
    oauth_verifier: str
    oauth_token: str


@auth_api.get('/', responses={'302': None})
def twitter_auth(query: AuthQuery):
    """ Redirects to twitter login
    """
    auth_handler = tweepy.OAuth1UserHandler(
        _client(), _secret(), callback=_redirect_url())

    url = auth_handler.get_authorization_url()
    session[SESSION_TWITTER_OAUTH_SECRET] = auth_handler.request_token['oauth_token_secret']
    session[SESSION_REDIRECT] = query.return_to
    return redirect(url)


@auth_api.get('/callback', responses={'200': TwitterToken, '400': ErrorMessage})
def twitter_auth_callback(query: TwitterCallback):
    """ Callback after login to get access token
    """
    if not query.oauth_verifier:
        return ErrorMessage(message='User denied access').dict(), 400

    if not session[SESSION_TWITTER_OAUTH_SECRET]:
        return ErrorMessage(message='Missing oauth secret').dict(), 400

    auth_handler = tweepy.OAuth1UserHandler(
        _client(), _secret(), callback=_redirect_url())

    auth_handler.request_token = {
        'oauth_token': query.oauth_token,
        'oauth_token_secret': session[SESSION_TWITTER_OAUTH_SECRET],
    }
    access_token, access_secret = auth_handler.get_access_token(
        query.oauth_verifier)

    session[SESSION_TWITTER_OAUTH_SECRET] = ''

    token = TwitterToken(access_token=access_token,
                         access_secret=access_secret)
    return redirect_or_return('twitter', token.dict())


# @auth.post('/revoke', responses={'200': None})
# def twitter_revoke():
#     """ Revoke an access token used for this request
#     """
#     req_auth = request.authorization
#     auth = tweepy.OAuth1UserHandler(
#         _client(), _secret(), req_auth.username, req_auth.password)
#     api = tweepy.API(auth)

#     res = api.request('POST', '1.1/oauth/invalidate_token')

#     return ''
