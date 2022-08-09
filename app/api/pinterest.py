from flask_openapi3 import APIBlueprint

from app.api.pinterest_auth import auth_api
from app.auth import jwt_security, jwt_token
from app.client.pinterest import PinterestClient
from app.config import pinterest_tag
from app.model import User

api = APIBlueprint('pinterest', __name__, url_prefix='/pinterest',
                   abp_tags=[pinterest_tag], abp_security=jwt_security)

api.register_api(auth_api)


@api.get('/user', responses={'200': User})
@jwt_token
def user(token: str):
    client = PinterestClient(token)
    data = client.get('/user_account')

    user = data['username']
    return User(id=user, name=user).dict()
