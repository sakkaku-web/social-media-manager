from flask_openapi3 import Info, OpenAPI, APIBlueprint
from flask import redirect

import os

from app.auth import security_schemes

import app.reddit as reddit
import app.twitter as twitter
import app.pixiv as pixiv

info = Info(title='SNS-Manager API', version='0.0.1')
app = OpenAPI(__name__, info=info, security_schemes=security_schemes)
app.secret_key = os.getenv('SESSION_SECRET')

api = APIBlueprint('api', __name__, url_prefix='/api')


@app.errorhandler(404)
def page_not_found(e):
    return redirect('/openapi')


api.register_api(reddit.api)
api.register_api(twitter.api)
api.register_api(pixiv.api)
app.register_api(api)
