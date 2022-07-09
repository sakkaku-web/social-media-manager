
import requests as req
from dotenv import load_dotenv
from argparse import ArgumentParser
import os
from shared import build_images, BASE_URL

load_dotenv()

parser = ArgumentParser()
parser.add_argument('--title', type=str)
parser.add_argument('--text', type=str)
parser.add_argument('--tags', type=str)
parser.add_argument('-i', '--images', nargs='+',
                    default=[], help='images to upload')

parser.add_argument('--refresh', default=False, action='store_true')

args = parser.parse_args()

if args.refresh:
    refresh_token = os.getenv('PIXIV_REFRESH')
    res = req.post(f'{BASE_URL}/pixiv/auth/refresh', json={'refresh_token': refresh_token})

    print(res.text)
    res.raise_for_status()

else:
    token = os.getenv('PIXIV_TOKEN')
    headers = {'Authorization': f'Bearer {token}'}

    data = {
        'title': args.title,
        'text': args.text,
        'tags': args.tags,
    }
    files = build_images(args.images)
    res = req.post(f'{BASE_URL}/pixiv/post',
                   data=data, files=files, headers=headers)
    print(f'{res.status_code}: {res.text}')
