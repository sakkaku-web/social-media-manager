from flask_openapi3 import APIBlueprint

from app.api.reddit_auth import auth_api
from app.model import RedditPost, SNSPostResponse, User, RedditUpvote, RedditUpvoteResponse
from app.client.reddit import RedditClient
from app.auth import jwt_security, jwt_token
from app.config import reddit_tag
from typing import List
from pydantic import parse_obj_as

api = APIBlueprint('reddit', __name__, url_prefix='/reddit',
                   abp_tags=[reddit_tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.post('/post', responses={'200': SNSPostResponse})
@jwt_token
def reddit_post(form: RedditPost, token: str):
    """ Submit a reddit post
    """
    client = RedditClient(token)
    post_id = client.submit_post(form)

    url = None
    if post_id:
        # post_id contains a type prefix
        actual_id = post_id.split('_')[-1]
        url = f'https://reddit.com/r/{form.subreddit}/comments/{actual_id}'
    return SNSPostResponse(url=url).dict()


@api.get('/user', responses={'200': User})
@jwt_token
def user(token: str):
    data = RedditClient(token).get('/api/v1/me')
    return User(id=data['id'], name=data['name']).dict()


@api.get('/upvoted', responses={'200': RedditUpvoteResponse})
@jwt_token
def upvoted(token: str):
    user_data = user(token=token)
    data = RedditClient(token).get(
        f'/user/{user_data["name"]}/upvoted?sort=new&type=link')
    result = []

    for item in data['data']['children']:
        x = item['data']

        result.append(RedditUpvote(
            title=x['title'], link=x['permalink'], image=x['url']))

    return RedditUpvoteResponse(result=result).dict()
