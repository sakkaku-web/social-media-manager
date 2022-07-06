from flask import Flask

import os

from reddit import reddit_api


app = Flask(__name__)
app.secret_key = os.getenv('SESSION_SECRET')

app.register_blueprint(reddit_api, url_prefix='/api/reddit')
