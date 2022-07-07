from dataclasses import dataclass
from pydantic import BaseModel


@dataclass
class Token(BaseModel):
    access_token: str
    refresh_token: str
    expires_in: int
