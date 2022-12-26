from flask_openapi3 import Info, OpenAPI, APIBlueprint
from flask import redirect, url_for
from flask_cors import CORS
from requests import HTTPError, Response

import os
import re
import importlib

from app.auth import security_schemes

import app.api.pixiv as pix
import app.api.reddit as red
import app.api.twitter as tw
import app.api.pinterest as pin
import app.api.twitter2 as tw2

info = Info(title='SNS-Manager API', version='0.0.1')
app = OpenAPI(__name__, info=info, security_schemes=security_schemes)
app.secret_key = os.getenv('SESSION_SECRET')

origin = 'https://sakkaku-web.github.io' if os.getenv(
    'FLASK_ENV') != 'development' else '*'
print('CORS origin: ' + origin)
CORS(app, origins=[origin], supports_credentials=True)

api = APIBlueprint('api', __name__, url_prefix='/api')


def _redirect():
    return redirect(url_for("openapi.index"))


@app.errorhandler(HTTPError)
def http_error(error: HTTPError):
    res = error.response
    return res.reason, res.status_code


@app.errorhandler(404)
def page_not_found(e):
    return _redirect()


@app.get('/', doc_ui=False)
def index():
    return _redirect()


# Doesn't deploy sometimes?
# def auto_register_api(bp: APIBlueprint):
#     here = os.path.dirname(__file__)
#     api_dir = os.path.join(here, "api")
#     for root, dirs, files in os.walk(api_dir):
#         for file in files:
#             if file == "__init__.py":
#                 continue
#             if not file.endswith(".py"):
#                 continue
#             api_file = os.path.join(root, file)
#             rule = re.split(r"app|.py", api_file)[1]
#             api_route = ".".join(rule.split(os.sep)).strip(".")
#             api = importlib.import_module('app.' + api_route)
#             try:
#                 bp.register_api(api.api)
#             except AttributeError:
#                 print(f"Failed to register api: {api_route}")

# auto_register_api(api)

api.register_api(pix.api)
api.register_api(red.api)
api.register_api(tw.api)
api.register_api(tw2.api)
api.register_api(pin.api)
app.register_api(api)
