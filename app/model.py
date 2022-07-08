from dataclasses import dataclass
from pydantic import BaseModel, Field
from flask_openapi3 import FileStorage


class OAuthToken(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: str


class TwitterToken(BaseModel):
    access_token: str
    access_secret: str


class Login(BaseModel):
    username: str
    password: str


class RefreshToken(BaseModel):
    refresh_token: str


class Token(BaseModel):
    token: str


class ErrorMessage(BaseModel):
    message: str


class SNSPost(BaseModel):
    title: str
    text: str
    images: list[FileStorage] = []


class SNSPostResponse(BaseModel):
    url: str = None


class RedditPost(SNSPost):
    text: str = None
    subreddit: str
    flair: str = None
