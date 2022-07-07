from dataclasses import dataclass
from pydantic import BaseModel


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
