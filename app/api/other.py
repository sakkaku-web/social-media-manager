from pydantic import BaseModel
from flask_openapi3 import APIBlueprint

from app.config import other_tag
import requests

api = APIBlueprint('other', __name__, url_prefix='/other',
                   abp_tags=[other_tag])


class AnimePath(BaseModel):
    id: str


class AnimeCharacterResponse(BaseModel):
    id: str
    name: str


class AnimeResponse(BaseModel):
    anime_name: str
    characters: list[AnimeCharacterResponse]


@api.get('/anime/<id>', responses={'200': AnimeResponse})
def anime(path: AnimePath):
    res = requests.get(
        f'https://www.animecharactersdatabase.com/api_series_characters.php?anime_id={path.id}', headers={"User-Agent": "random-character-api:v0.0.1"})
    res.raise_for_status()
    json = res.json()

    return AnimeResponse(anime_name=json['anime_name'], characters=json['characters']).dict()
