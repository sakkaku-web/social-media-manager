from flask_openapi3 import Info, OpenAPI, APIBlueprint
from flask import redirect

import os
import re
import importlib

from app.auth import security_schemes

info = Info(title='SNS-Manager API', version='0.0.1')
app = OpenAPI(__name__, info=info, security_schemes=security_schemes)
app.secret_key = os.getenv('SESSION_SECRET')

api = APIBlueprint('api', __name__, url_prefix='/api')


@app.errorhandler(404)
@app.errorhandler(503)
def page_not_found(e):
    return redirect('/openapi')


def auto_register_api(bp: APIBlueprint):
    here = os.path.dirname(__file__)
    api_dir = os.path.join(here, "api")
    for root, dirs, files in os.walk(api_dir):
        for file in files:
            if file == "__init__.py":
                continue
            if not file.endswith(".py"):
                continue
            api_file = os.path.join(root, file)
            rule = re.split(r"app|.py", api_file)[1]
            api_route = ".".join(rule.split(os.sep)).strip(".")
            api = importlib.import_module('app.' + api_route)
            try:
                bp.register_api(api.api)
            except AttributeError:
                print(f"Failed to register api: {api_route}")


auto_register_api(api)
app.register_api(api)
