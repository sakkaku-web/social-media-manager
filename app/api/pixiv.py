from flask_openapi3 import APIBlueprint, Tag
import requests as req

from app.model import PixivPost, SNSPostResponse
from app.auth import jwt_security, jwt_token
from app.api.pixiv_auth import auth_api
from app.client.pixiv import PixivClient

tag = Tag(name='Pixiv')
api = APIBlueprint('pixiv', __name__, url_prefix='/pixiv',
                   abp_tags=[tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.post('/post', responses={'200': SNSPostResponse})
@jwt_token
def pixiv_post(form: PixivPost, token: str):
    """ Submit a pixiv illustration post
    """
    client = PixivClient(token)
    tags = form.tags.split(' ')
    illust_id = client.upload_illust(form.title, form.text, tags, form.images)

    return SNSPostResponse(url=f'https://pixiv.net/artworks/{illust_id}').dict()
