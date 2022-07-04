import json
import os
from dotenv import load_dotenv
from argparse import ArgumentParser

from reddit import RedditClient

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

with open(args.post, 'r') as post_file:
    post = json.load(post_file)

    # Reddit
    reddit = RedditClient(os.getenv('REDDIT_TOKEN'))

    subreddits = []
    for sr in args.subreddits:
        split = sr.split(':')
        subreddits.append(
            {'sr': split[0], 'flair': split[1] if len(split) > 1 else None})

    reddit.submit_post(post, subreddits)
