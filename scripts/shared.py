import os
import requests as req

def resolve_image_paths(image_paths):
    file_paths = []
    for path in image_paths:
        if os.path.isfile(path):
            file_paths.append(path)
        else:
            with os.scandir(path) as dirs:
                for entry in dirs:
                    if entry.is_file():
                        file_paths.append(entry.path)
    return file_paths


def build_images(images: [str]):
    return [('images', open(i, 'rb'))
            for i in resolve_image_paths(images)]


def refresh_token(provider: str, refresh_token: str):
    res = req.post(f'{BASE_URL}/{provider}/auth/refresh',
                   json={'refresh_token': refresh_token})
    print(res.text)
    res.raise_for_status()

    print(
        f'Refreshed tokens for {provider}. Save the new tokens to your environment file')
    return res.json()['access_token']


#BASE_URL = 'https://sns-manager.herokuapp.com/api'
BASE_URL = 'http://localhost:8080/api'
