import os
import requests as req
from dotenv import load_dotenv

# Script can submit multiple images as single post to multiple subreddits
# Set token in REDDIT_TOKEN
#
# Customize variables below

title = 'Korone + Chimecho'
text = 'Test Text Comment'
sendreplies = False
images = [
    # Text does not work with single images
    '/home/sakkaku/Downloads/fuurin.png',
]

# TODO: fix flair
subreddits = [
    # {'sr': 'AnimeART', 'flair': 'Original Content'},
    {'sr': 'AnimeSketch', 'flair': None},
    {'sr': 'kumi_yada', 'flair': None},
]

# ---------------

load_dotenv()

baseURL = 'https://oauth.reddit.com'
token = os.getenv('REDDIT_TOKEN')
headers = {
    'Authorization': 'Bearer ' + token,
    'User-Agent': 'script:sns-manager:0.0.1 (by /u/illu11)',
}
asset_url = 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com'


def upload_image(image_path: str):
    filename = image_path.split('/')[-1]
    mimetype = 'image/{}'.format(filename.split('.')[1])
    data = {
        'filepath': filename,
        'mimetype': mimetype,
    }
    res = req.post(baseURL + '/api/media/asset.json',
                   data=data, headers=headers)
    res.raise_for_status()

    asset_data = res.json()
    args = asset_data['args']
    full_url = 'https:{}'.format(args['action'])

    with open(image_path, "rb") as image:
        upload_data = {item["name"]: item["value"] for item in args["fields"]}
        res = req.post(full_url, data=upload_data, files={"file": image})
        res.raise_for_status()

    asset_id = asset_data['asset']['asset_id']
    print('Uploaded {} with id {}'.format(image_path, asset_id))
    return asset_id


def post_images_to_subreddit(ids, sr: dict, title: str):
    res = None
    body = {
        'sr': sr['sr'],
        'title': title,
        'sendreplies': sendreplies,
        'flair_id': sr['flair'],
    }
    if len(ids) > 1:
        body['kind'] = 'self'
        body['items']: [{'media_id': i, 'caption': '',
                         'outbound_url': ''} for i in ids]
        res = req.post(
            baseURL + '/api/submit_gallery_post.json?api_type=json', json=body, headers=headers)
    else:
        body['kind'] = 'image'
        body['url'] = f'{asset_url}/rte_images/{ids[0]}',
        res = req.post(baseURL + '/api/submit?api_type=json',
                       body, headers=headers)

    data = return_data_if_no_error(res)

    if 'url' in data:
        print(f'Submitted post in {sr}: {data["url"]}')
        return data['id']

    print('Submitted single image post. No direct URL available')
    return None


def add_comment(post_id: str, text: str):
    body = {
        'text': text,
        'thing_id': post_id,
    }
    res = req.post(baseURL + '/api/comment?api_type=json',
                   body, headers=headers)
    data = return_data_if_no_error(res)
    print(f'Added comment to post {post_id}: {text}')

    return data['things'][0]['data']['id']


def return_data_if_no_error(res):
    res.raise_for_status()

    json = res.json()['json']
    errors = json['errors']

    if len(errors) > 0:
        print(errors)
        exit()

    return json['data']


for sr in subreddits:
    # Has to be uploaded for each subreddit, otherwise error 500
    image_ids = [upload_image(i) for i in images]
    post_id = post_images_to_subreddit(image_ids, sr, title)

    if post_id:
        add_comment(post_id, text)
