from flask_openapi3 import APIBlueprint
import os

from app.config import twitter_tag
from app.api.twitter_auth import auth_api
from app.auth import basic_security, basic_auth
from app.model import SNSPostResponse, TwitterPost, User
from app.client.twitter import TwitterClient

api = APIBlueprint('twitter', __name__,
                   url_prefix='/twitter', abp_tags=[twitter_tag], abp_security=basic_security)

api.register_api(auth_api)


# TODO: share with twitter_auth?
def _client(): return os.getenv('TWITTER_CLIENT')
def _secret(): return os.getenv('TWITTER_SECRET')


def _twitter_client(user: str, pw: str):
    return TwitterClient(_client(), _secret(), user, pw)


@api.post('/post', responses={'200': SNSPostResponse})
@basic_auth
def twitter_post(form: TwitterPost, user: str, password: str):
    """ Posting a twitter tweet
    """
    id_str = _twitter_client(user, password).tweet(form.text, form.images)

    return SNSPostResponse(url=f'https://twitter.com/anyuser/status/{id_str}').dict()


@api.get('/user', responses={'200': User})
@basic_auth
def user(user: str, password: str):
    data = _twitter_client(user, password).user()
    return User(id=data['username'], name=data['name']).dict()
