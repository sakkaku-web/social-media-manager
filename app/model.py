from dataclasses import dataclass
from pydantic import BaseModel


class OAuthToken(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: str


class TwitterToken(BaseModel):
    access_token: str
    access_secret: str
