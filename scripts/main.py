import requests as req
import os
import json
from dotenv import load_dotenv
from argparse import ArgumentParser

load_dotenv()

parser = ArgumentParser()
parser.add_argument('-p', '--post', required=True,
                    help='path to the file with the data for the post')
parser.add_argument('-sr', '--subreddits', nargs='+', default=[],
                    help='subreddits to post, name or name with flair separated by colon')

args = parser.parse_args()

if not os.path.exists(args.post):
    print(f'File "{args.post}" does not exist')
    exit()


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


def format_image_paths():
    if 'images' in post:
        post_folder = os.path.dirname(os.path.abspath(args.post))
        post['images'] = [p if p.startswith(
            '/') else os.path.join(post_folder, p) for p in post['images']]
        post['images'] = resolve_image_paths(post['images'])


base_url = 'https://sns-manager.herokuapp.com/api'
headers = {
    'Authorization': f'Bearer {os.getenv("REDDIT_TOKEN")}',
}


with open(args.post, 'r') as post_file:
    post = json.load(post_file)
    format_image_paths()

    files = [('images', open(i, 'rb'))
             for i in resolve_image_paths(post['images'])]

    subreddits = []
    for sr in args.subreddits:
        split = sr.split(':')
        subreddit = split[0]
        flair = split[1] if len(split) > 1 else None

        data = {
            'title': post['title'],
            'text': post['text'],
            'subreddit': subreddit,
            'flair': flair,
        }
        res = req.post(f'{base_url}/reddit/post', data=data,
                       files=files, headers=headers)
        print(f'{res.status_code}: {res.text}')
