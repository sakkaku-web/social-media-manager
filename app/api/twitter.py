from flask import session, request, redirect
from flask_openapi3 import APIBlueprint, Tag
import requests as req
import os
import tweepy
import urllib.parse as url

from app.model import TwitterToken, ErrorMessage

tag = Tag(name='Twitter')
api = APIBlueprint('twitter', __name__, url_prefix='/twitter', abp_tags=[tag])
auth = APIBlueprint('auth', __name__, url_prefix='/auth', abp_tags=[tag])

SESSION_TWITTER_OAUTH_SECRET = 'TWITTER_OAUTH_SECRET'


def _client(): return os.getenv('TWITTER_CLIENT')
def _secret(): return os.getenv('TWITTER_SECRET')


def _redirect_url():
    return url.urljoin(request.base_url, 'callback')


@auth.get('/', responses={'302': None})
def twitter_auth():
    """ Redirects to twitter login
    """
    auth_handler = tweepy.OAuth1UserHandler(
        _client(), _secret(), callback=_redirect_url())

    url = auth_handler.get_authorization_url()
    session[SESSION_TWITTER_OAUTH_SECRET] = auth_handler.request_token['oauth_token_secret']
    return redirect(url)


@auth.get('/callback', responses={'200': TwitterToken, '400': ErrorMessage})
def twitter_auth_callback():
    """ Callback after login to get access token
    """
    query = request.args

    if not 'oauth_verifier' in query:
        return ErrorMessage(message='User denied access').dict(), 400

    if not session[SESSION_TWITTER_OAUTH_SECRET]:
        return ErrorMessage(message='Missing oauth secret').dict(), 400

    auth_handler = tweepy.OAuth1UserHandler(
        _client(), _secret(), callback=_redirect_url())

    auth_handler.request_token = {
        'oauth_token': query['oauth_token'],
        'oauth_token_secret': session[SESSION_TWITTER_OAUTH_SECRET],
    }
    access_token, access_secret = auth_handler.get_access_token(
        query['oauth_verifier'])

    session[SESSION_TWITTER_OAUTH_SECRET] = ''
    return TwitterToken(access_token=access_token, access_secret=access_secret).dict()


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


api.register_api(auth)
