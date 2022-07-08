
import requests as req
from dotenv import load_dotenv
from argparse import ArgumentParser
import os
from shared import build_images, BASE_URL

load_dotenv()

parser = ArgumentParser()
parser.add_argument('--title', type=str, required=True)
parser.add_argument('--text', type=str)
parser.add_argument('--tags', type=str, required=True)
parser.add_argument('-i', '--images', nargs='+',
                    default=[], help='images to upload')
args = parser.parse_args()


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
