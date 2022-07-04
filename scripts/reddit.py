import os
import requests as req
from dotenv import load_dotenv


class RedditClient:
    asset_url = 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com'

    def __init__(self, token: str):
        self.baseURL = 'https://oauth.reddit.com'
        self.headers = {
            'Authorization': 'Bearer ' + token,
            'User-Agent': 'script:sns-manager:0.0.1 (by /u/illu11)',
        }

    def _find_flair(self, sr: str, text: str):
        if text:
            res = req.get(f'{self.baseURL}/r/{sr}/api/link_flair',
                          headers=self.headers)
            res.raise_for_status()
            data = res.json()

            for flair in data:
                flair_text = flair['text']
                if text.lower() in flair_text.lower():
                    return flair['id'], flair_text

        return None, None

    def _return_data_if_no_error(self, res):
        res.raise_for_status()

        json = res.json()['json']
        errors = json['errors']

        if len(errors) > 0:
            print(errors)
            exit()

        return json['data']

    def _upload_image(self, image_path: str):
        filename = image_path.split('/')[-1]
        mimetype = 'image/{}'.format(filename.split('.')[1])
        data = {
            'filepath': filename,
            'mimetype': mimetype,
        }

        res = req.post(self.baseURL + '/api/media/asset.json',
                       data=data, headers=self.headers)
        res.raise_for_status()

        asset_data = res.json()
        self._upload_image_action_to_s3(image_path, asset_data['args'])

        asset_id = asset_data['asset']['asset_id']
        print('Uploaded {} with id {}'.format(image_path, asset_id))
        return asset_id

    def _upload_image_action_to_s3(self, image_path: str, args: dict):
        full_url = 'https:{}'.format(args['action'])

        with open(image_path, "rb") as image:
            upload_data = {item["name"]: item["value"]
                           for item in args["fields"]}
            res = req.post(full_url, data=upload_data, files={"file": image})
            res.raise_for_status()

    def _post_images_to_subreddit(self, image_ids, sr_data: dict, title: str):
        sr = sr_data['sr']
        body = {
            'sr': sr,
            'title': title,
            'sendreplies': False,  # TODO: customize?
        }

        self._apply_flair_to_body(body, sr, sr_data['flair'])

        if len(image_ids) > 1:
            return self._submit_gallery_post(body)
        else:
            return self._submit_single_post(body)

    def _apply_flair_to_body(self, body: dict, sr: str, flair: str):
        if flair:
            flair_id, flair_text = self._find_flair(sr, flair)
            if flair_id:
                body['flair_id'] = flair_id
                body['flair_text'] = flair_text
            else:
                print(f"Didn't find flair '{flair}'. Skipping")

    def _submit_single_post(self, body: dict, image_ids):
        body['kind'] = 'image'
        body['url'] = f'{self.asset_url}/rte_images/{image_ids[0]}',
        res = req.post(self.baseURL + '/api/submit?api_type=json',
                       body, headers=self.headers)

        print('Submitted single image post. No direct URL available')
        return None

    def _submit_gallery_post(self, body: dict, image_ids):
        body['kind'] = 'self'
        body['items'] = [{'media_id': i, 'caption': '',
                          'outbound_url': ''} for i in image_ids]
        res = req.post(
            self.baseURL + '/api/submit_gallery_post.json?api_type=json', json=body, headers=self.headers)

        data = self._return_data_if_no_error(res)
        print(f'Submitted post: {data["url"]}')
        return data['id']

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

    def submit_post(self, post, subreddits):
        for sr in subreddits:
            # Has to be uploaded for each subreddit, otherwise error 500

            print(f'----- Start submitting to {sr["sr"]} ------')
            image_ids = [self._upload_image(i) for i in post['images']]
            post_id = self._post_images_to_subreddit(
                image_ids, sr, post['title'])

            if post_id and len(image_ids) > 0:
                self._add_comment(post_id, post['text'])

            print(f'----- Submit finished -----')


# ----------------- Testing -----------------
load_dotenv()

client = RedditClient(os.getenv('REDDIT_TOKEN'))

test_sr = [{'sr': 'kumi_yada', 'flair': 'test'}]

###
# single_image_post = {
#     'title': 'Test submit single image post',
#     'text': 'Should be ignored',
#     'images': ['images/pixel-ina.png'],
# }
# client.submit_post(single_image_post, test_sr)
###
# multi_image_post = {
#     'title': 'Test submit multiple image post',
#     'text': 'Should be a comment',
#     'images': ['images/pixel-ina.png', 'images/pixel-gura.png'],
# }
# client.submit_post(multi_image_post, test_sr)
###
