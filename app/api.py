from flask_openapi3 import Info, OpenAPI, APIBlueprint

import os

import app.reddit as reddit

info = Info(title='SNS-Manager API', version='0.0.1')
app = OpenAPI(__name__, info=info)
app.secret_key = os.getenv('SESSION_SECRET')

api = APIBlueprint('api', __name__, url_prefix='/api')


@app.get('/')
def index():
    return 'Welcome to SNS-Manager API. We are working on an OpenAPI UI so you can explore the API!'


api.register_api(reddit.api)
app.register_api(api)
# auto_register_api(app)
