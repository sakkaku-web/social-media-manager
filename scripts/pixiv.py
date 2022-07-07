from gppt import GetPixivToken
from dotenv import load_dotenv
import os
import requests as req


def login(user: str, password: str) -> str:
    print('Logging in to pixiv...')

    g = GetPixivToken()
    res = g.login(headless=True, user=os.getenv(
        'PIXIV_USER'), pass_=os.getenv('PIXIV_PASSWORD'))
    token = res['access_token']

    print(f'Logged in: {token}')
    return token


class PixivClient:
    base_url = 'https://app-api.pixiv.net'

    def __init__(self, token: str):
        self.headers = {
            'Authorization': f'Bearer {token}',
        }

    def upload_illust(self, title: str, desc: str, tags: [str], images: [str]):
        print(f'----- Start uploading to pixiv -----')
        data = {
            'title': title,
            'caption': desc,
            'type': 'illust',
            'restrict': 'public',
            'x_restrict': 'none',
            'is_sexual': 'false',
            'tags[]': tags,
        }
        files = [open(p, 'rb') for p in images]
        file_data = [('files[]', f)
                     for f in files]
        res = req.post(f'{self.base_url}/v1/upload/illust',
                       data=data, files=file_data, headers=self.headers)
        for f in files:
            f.close()

        res.raise_for_status()
        print(f'Successfully posted. Getting url...')

        key = res.json()['convert_key']
        res = req.post(f'{self.base_url}/v1/upload/status',
                       data={'convert_key': key}, headers=self.headers)
        print(res.text)
        res.raise_for_status()

        illust_id = res.json()['illust_id']
        print(f'Final link: https://pixiv.net/artworks/{illust_id}')

        print(f'----- Finished uploading to pixiv -----')


# ----------------- Testing -----------------
load_dotenv()
token = login(os.getenv('PIXIV_USER'), os.getenv('PIXIV_PASSWORD'))
# client = PixivClient(token)

# client.upload_illust('Test Upload', 'Please ignore', ['test1', 'test123'], [
#                      'images/pixel-ina.png', 'images/pixel-gura.png'])
