from flask_openapi3 import APIBlueprint, Tag
import requests as req

from app.model import PixivPost, SNSPostResponse
from app.auth import jwt_security, jwt_token
from app.api.pixiv_auth import auth_api
from app.client.pixiv import PixivClient
from app.config import pixiv_tag
from pydantic import BaseModel, Field

api = APIBlueprint('pixiv', __name__, url_prefix='/pixiv',
                   abp_tags=[pixiv_tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.post('/post', responses={'200': SNSPostResponse})
@jwt_token
def pixiv_post(form: PixivPost, token: str):
    """ Upload pixiv illustration post
    """
    client = PixivClient(token)
    tags = form.tags.split(' ')
    illust_id = client.upload_illust(form.title, form.text, tags, form.images)

    return SNSPostResponse(url=f'https://pixiv.net/artworks/{illust_id}').dict()


@api.get('/ping')
@jwt_token
def ping(token: str):
    client = PixivClient(token)
    return {'pong': client.ping()}


class BookmarkRequest(BaseModel):
    user_id: str


@api.get('/bookmarks')
@jwt_token
def bookmarks(token: str, query: BookmarkRequest):
    client = PixivClient(token)
    return client.bookmarks(query.user_id)
