from flask import session, request, redirect, jsonify
from flask_openapi3 import APIBlueprint, Tag

from app.api.reddit_auth import auth_api
from app.model import ErrorMessage, RedditPost, SNSPostResponse
from app.client.reddit import RedditClient
from app.auth import jwt_security, jwt_token

tag = Tag(name='Reddit')
api = APIBlueprint('reddit', __name__, url_prefix='/reddit',
                   abp_tags=[tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.post('/post', responses={'200': SNSPostResponse})
@jwt_token
def reddit_post(form: RedditPost, token: str):
    """ Submit a reddit post
    """
    client = RedditClient(token)
    post_id = client.submit_post(form)

    # post_id contains a type prefix
    actual_id = post_id.split('_')[-1]
    url = f'https://reddit.com/r/{form.subreddit}/comments/{actual_id}'
    return SNSPostResponse(url=url).dict()
