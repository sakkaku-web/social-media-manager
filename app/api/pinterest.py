from flask_openapi3 import APIBlueprint, Tag

from app.api.pinterest_auth import auth_api
from app.auth import jwt_security
from app.config import pinterest_tag

api = APIBlueprint('pinterest', __name__, url_prefix='/pinterest',
                   abp_tags=[pinterest_tag], abp_security=jwt_security)

api.register_api(auth_api)
