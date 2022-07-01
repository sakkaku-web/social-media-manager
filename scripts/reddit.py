import os
import requests as req
from dotenv import load_dotenv

# Script can submit multiple images as single post to multiple subreddits
#
# Set token in REDDIT_TOKEN
# Customize variables below

title = 'Test'
images = [
  '/home/sakkaku/Downloads/pixel-ina.png',
  '/home/sakkaku/Downloads/pixel-gura.png',
  '/home/sakkaku/Downloads/pixel-ame.png',
]

subreddits = [
  'kumi_yada',
  'test',
]

### ---------------

load_dotenv()

baseURL = 'https://oauth.reddit.com'
token = os.getenv('REDDIT_TOKEN')
headers = {
  'Authorization': 'Bearer ' + token,
  'User-Agent': 'test-script:sns-manager:0.0.1 (by /u/illu11)',
}
asset_url = 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com'

def upload_image(image_path: str):
  filename = image_path.split('/')[-1]
  mimetype ='image/{}'.format(filename.split('.')[1])
  data = {
    'filepath': filename,
    'mimetype': mimetype,
  }
  res = req.post(baseURL + '/api/media/asset.json', data=data, headers=headers)
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

def post_images_to_subreddit(ids, sr: str, title: str):
  res = None
  if len(ids) > 1:
    body = {
      'items': [{'media_id': i, 'caption': '', 'outbound_url': ''} for i in ids],
      'kind': 'self',
      'sr': sr,
      'title': title,
    }
    res = req.post(baseURL + '/api/submit_gallery_post.json?api_type=json', json=body, headers=headers)
  else:
    image_id, asset_url = ids[0]
    body = {
      'sr': sr,
      'title': title,
      'kind': 'image',
      'url': f'{asset_url}/rte_images/{image_id}',
    }
    res = req.post(baseURL + '/api/submit?api_type=json', body, headers=headers)

  res.raise_for_status()
  data = res.json()['json']['data']
  if 'url' in data:
    return data['url']
  return data['user_submitted_page']



for sr in subreddits:
  # Has to be uploaded for each subreddit, otherwise error 500
  image_ids = [upload_image(i) for i in images]
  url = post_images_to_subreddit(image_ids, sr, title)
  print(f'Submitted post in {sr}: {url}')
