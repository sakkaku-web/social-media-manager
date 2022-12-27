from flask_openapi3 import APIBlueprint
import os
from pydantic import BaseModel

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


def _twitter_client(user: str = '', pw: str = ''):
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


class ListTweetsPath(BaseModel):
    username: str


class ListTweetsQuery(BaseModel):
    since_id: str = None
    max_id: str = None
    count: int = 40


class TweetImage(BaseModel):
    tweet_id: str
    media_url: str
    link: str


class TweetImagesResponse(BaseModel):
    images: list[TweetImage]


@api.get('/tweets/<username>', responses={'200': TweetImagesResponse})
def list_tweets(path: ListTweetsPath, query: ListTweetsQuery):
    images = []
    attempts = 0

    start_id = query.max_id

    while len(images) == 0 and attempts <= 5:
        attempts += 1
        data = _twitter_client().list_tweets(
            path.username, start_id, query.since_id, query.count)
        for d in data:

            start_id = d.id_str
            entity = d.entities
            if hasattr(d, 'extended_entities') and 'media' in d.extended_entities:
                for x in d.extended_entities['media']:
                    if x['type'] == 'photo':
                        url = x['media_url_https'] or x['media_url']
                        images.append(TweetImage(
                            tweet_id=d.id_str, media_url=url, link=x['url']))

    return TweetImagesResponse(images=images).dict()
