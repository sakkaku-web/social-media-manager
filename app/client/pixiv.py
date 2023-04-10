from dotenv import load_dotenv
import os
import requests as req
from flask_openapi3 import FileStorage


class PixivClient:
    base_url = 'https://app-api.pixiv.net'

    def __init__(self, token: str):
        self.headers = {
            'Authorization': f'Bearer {token}',
        }

    def upload_illust(self, title: str, desc: str, tags: [str], images: [FileStorage]):
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
        file_data = [('files[]', (i.filename, i.read(), i.mimetype))
                     for i in images]
        res = req.post(f'{self.base_url}/v1/upload/illust',
                       data=data, files=file_data, headers=self.headers)

        res.raise_for_status()
        print(f'Successfully posted. Getting url...')

        key = res.json()['convert_key']
        res = req.post(f'{self.base_url}/v1/upload/status',
                       data={'convert_key': key}, headers=self.headers)
        res.raise_for_status()

        print(f'----- Finished uploading to pixiv -----')
        return res.json()['illust_id']

    def ping(self):
        res = req.get(f'{self.base_url}/v1/pixiv-info/android',
                      headers=self.headers)
        res.raise_for_status()
        return 'pong'

    def bookmarks(self, userId: str):
        res = req.get(f'{self.base_url}/v1/user/bookmarks/illust?user_id={userId}&restrict=public',
                      headers=self.headers)
        res.raise_for_status()
        return res.json()

    # search illustration by keyword
    def search(self, keyword: str):
        res = req.get(f'{self.base_url}/v1/search/illust?word={keyword}&sort=date_desc',
                      headers=self.headers)
        res.raise_for_status()
        return res.json()


# ----------------- Testing -----------------
# load_dotenv()
# token = login(os.getenv('PIXIV_USER'), os.getenv('PIXIV_PASSWORD'))
# client = PixivClient(token)

# client.upload_illust('Test Upload', 'Please ignore', ['test1', 'test123'], [
#                      'images/pixel-ina.png', 'images/pixel-gura.png'])
