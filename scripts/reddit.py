import requests as req
import os
import json
from dotenv import load_dotenv
from argparse import ArgumentParser
from shared import build_images, BASE_URL

load_dotenv()

parser = ArgumentParser()
parser.add_argument('--title')
parser.add_argument('--text')
parser.add_argument('-i', '--images', nargs='+', default=[])
parser.add_argument('-sr', '--subreddits', nargs='+', default=[],
                    help='subreddits to post, name or name with flair separated by colon')

parser.add_argument('--refresh', default=False, action='store_true')

args = parser.parse_args()


if args.refresh:
    refresh_token = os.getenv('REDDIT_REFRESH')
    res = req.post(f'{BASE_URL}/reddit/auth/refresh', json={'refresh_token': refresh_token})

    print(res.text)
    res.raise_for_status()

else:
    reddit_header = {'Authorization': f'Bearer {os.getenv("REDDIT_TOKEN")}'}

    files = build_images(args.images)

    for sr in args.subreddits:
        split = sr.split(':')
        subreddit = split[0]
        flair = split[1] if len(split) > 1 else None

        data = {
            'title': args.title,
            'text': args.text,
            'subreddit': subreddit,
            'flair': flair,
        }
        res = req.post(f'{BASE_URL}/reddit/post', data=data,
                       files=files, headers=reddit_header)
        print(f'{res.status_code}: {res.text}')
