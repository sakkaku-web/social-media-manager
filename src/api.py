from flask import Flask

import os

from reddit import reddit_api


app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')

app.register_blueprint(reddit_api, url_prefix='/api/reddit')


@app.get('/')
def index():
    return 'Welcome to SNS-Manager API. We are working on an OpenAPI UI so you can explore the API!'
