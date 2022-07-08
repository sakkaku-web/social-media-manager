from flask_openapi3 import APIBlueprint
import tweepy

from app.config import twitter_tag
from app.api.twitter_auth import auth_api

api = APIBlueprint('twitter', __name__,
                   url_prefix='/twitter', abp_tags=[twitter_tag])

api.register_api(auth_api)
