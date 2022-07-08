import requests as req
from dotenv import load_dotenv
from argparse import ArgumentParser
import os
from shared import build_images, BASE_URL

load_dotenv()

parser = ArgumentParser()
parser.add_argument('-t', '--text', type=str, required=True,
                    help='text to post including hash tags')
parser.add_argument('-i', '--images', nargs='+',
                    default=[], help='images to upload')
args = parser.parse_args()


user = os.getenv('TWITTER_USER')
password = os.getenv('TWITTER_PASSWORD')

files = build_images(args.images)
res = req.post(f'{BASE_URL}/twitter/post',
               data={'text': args.text}, files=files, auth=(user, password))
print(f'{res.status_code}: {res.text}')
