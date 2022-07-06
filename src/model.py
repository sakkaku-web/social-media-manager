from dataclasses import dataclass


@dataclass
class TokenResponse():
    access_token: str
    refresh_token: str
    expires_in: int
