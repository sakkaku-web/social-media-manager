from pydantic import BaseModel, Field
from flask_openapi3 import FileStorage
from typing import List


class RedditUpvote(BaseModel):
    title: str
    link: str
    image: str


class RedditUpvoteResponse(BaseModel):
    result: List[RedditUpvote]


class User(BaseModel):
    id: str
    name: str


class OAuthToken(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: str


class Login(BaseModel):
    username: str
    password: str


class RefreshToken(BaseModel):
    refresh_token: str


class Token(BaseModel):
    token: str


class AuthQuery(BaseModel):
    return_to: str = Field(
        None, description="return to this URL after the callback")


class ErrorMessage(BaseModel):
    message: str


class SNSPostResponse(BaseModel):
    url: str = None


class RedditPost(BaseModel):
    title: str
    text: str = None
    images: list[FileStorage] = []
    subreddit: str
    flair: str = Field(None,
                       description="searches flair by text and adds it to the post")


class PixivPost(BaseModel):
    title: str
    text: str = None
    images: list[FileStorage] = Field(min_items=1, max_items=200)
    tags: str = Field(description="tags separated by space")


class TwitterPost(BaseModel):
    text: str
    images: list[FileStorage] = Field([], min_items=0, max_items=4)
