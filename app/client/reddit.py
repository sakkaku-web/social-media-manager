import requests as req
from flask_openapi3 import FileStorage

from app.model import RedditPost


class RedditClient:
    asset_url = 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com'

    def __init__(self, token: str, user_agent='script:sns-manager:0.0.1 (by /u/illu11)'):
        self.baseURL = 'https://oauth.reddit.com'
        self.headers = {
            'Authorization': f'Bearer {token}',
            'User-Agent': user_agent,
        }

    def get(self, url):
        res = req.get(self.baseURL + url, headers=self.headers)
        res.raise_for_status()
        return res.json()

    def _return_data_if_no_error(self, res):
        res.raise_for_status()

        json = res.json()['json']
        errors = json['errors']

        if len(errors) > 0:
            print(errors)
            raise Exception(errors)

        return json['data']

    def _add_comment(self, post_id: str, text: str):
        body = {
            'text': text,
            'thing_id': post_id,
        }
        res = req.post(self.baseURL + '/api/comment?api_type=json',
                       body, headers=self.headers)
        data = self._return_data_if_no_error(res)
        print(f'Added comment to post {post_id}: {text}')

        return data['things'][0]['data']['id']

    def submit_post(self, post: RedditPost):
        print(f'----- Start submitting to {post.subreddit} ------')

        image_ids = [self._upload_image(i) for i in post.images]
        post_id = self._post_to_subreddit(image_ids, post)

        if post_id and len(image_ids) > 0:
            self._add_comment(post_id, post.text)

        print(f'----- Submit finished -----')
        return post_id

    def _get_mimetype(self, image: FileStorage) -> str:
        return image.mimetype if image.mimetype else f'image/{image.filename.split(".")[-1]}'

    def _upload_image(self, image: FileStorage):
        data = {
            'filepath': image.filename,
            'mimetype': self._get_mimetype(image),
        }

        print(image.mimetype)

        res = req.post(self.baseURL + '/api/media/asset.json',
                       data=data, headers=self.headers)
        res.raise_for_status()

        asset_data = res.json()
        self._upload_image_action_to_s3(image, asset_data['args'])

        asset_id = asset_data['asset']['asset_id']
        print('Uploaded {} with id {}'.format(image.filename, asset_id))
        return asset_id

    def _upload_image_action_to_s3(self, image: FileStorage, args: dict):
        full_url = 'https:{}'.format(args['action'])

        upload_data = {item["name"]: item["value"]
                       for item in args["fields"]}
        res = req.post(full_url, data=upload_data,
                       files={"file": image.read()})
        res.raise_for_status()

    def _post_to_subreddit(self, image_ids, post: RedditPost):
        body = {
            'sr': post.subreddit,
            'title': post.title,
            'sendreplies': True,  # TODO: customize?
        }

        self._apply_flair_to_body(body, post)

        if len(image_ids) > 1:
            return self._submit_gallery_post(body, image_ids)
        else:
            return self._submit_single_post(body, image_ids, post)

    def _apply_flair_to_body(self, body: dict, post: RedditPost):
        if post.flair:
            flair_id, flair_text = self._find_flair(post.subreddit, post.flair)
            if flair_id:
                body['flair_id'] = flair_id
                body['flair_text'] = flair_text
            else:
                raise Exception(f'Failed to find flair {post.flair}')

    def _find_flair(self, sr: str, text: str):
        if text:
            print(f'Searching for flair: {text}')
            res = req.get(f'{self.baseURL}/r/{sr}/api/link_flair',
                          headers=self.headers)
            res.raise_for_status()
            data = res.json()

            for flair in data:
                flair_text = flair['text']
                if text.lower() in flair_text.lower():
                    return flair['id'], flair_text

        return None, None

    def _submit_gallery_post(self, body: dict, image_ids):
        body['kind'] = 'self'
        body['items'] = [{'media_id': i, 'caption': '',
                          'outbound_url': ''} for i in image_ids]
        res = req.post(
            self.baseURL + '/api/submit_gallery_post.json?api_type=json', json=body, headers=self.headers)

        data = self._return_data_if_no_error(res)
        return data['id']  # , data['url']

    def _submit_single_post(self, body: dict, image_ids, post: RedditPost):
        if len(image_ids) > 0:
            body['kind'] = 'image'
            body['url'] = f'{self.asset_url}/rte_images/{image_ids[0]}',
        else:
            body['kind'] = 'self'
            body['text'] = post.text

        res = req.post(self.baseURL + '/api/submit?api_type=json',
                       body, headers=self.headers)
        data = self._return_data_if_no_error(res)

        if 'url' in data:
            return data['name']  # , data['url']

        return None  # , None


# ----------------- Testing -----------------
# load_dotenv()

# client = RedditClient(os.getenv('REDDIT_TOKEN'))

# test_sr = [{'sr': 'kumi_yada', 'flair': 'test'}]

# ###
# single_image_post = {
#     'title': 'Test submit single image post',
#     'text': 'Should be ignored',
#     'images': ['images/pixel-ina.png'],
# }
# client.submit_post(single_image_post, test_sr)
# ###
# multi_image_post = {
#     'title': 'Test submit multiple image post',
#     'text': 'Should be a comment\n\nNew line',
#     'images': ['images'],
# }
# client.submit_post(multi_image_post, test_sr)
# ###
# text_post = {
#     'title': 'Test text post',
#     'text': 'Should be the text of the post\n\n**New line**',
#     'images': [],
# }
# client.submit_post(text_post, test_sr)
# ###
