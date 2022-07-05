import tweepy as tw
import os
from dotenv import load_dotenv


class TwitterClient:
    def __init__(self, client: str, secret: str, a_token: str, a_secret: str):
        auth = tw.OAuth1UserHandler(client, secret, a_token, a_secret)
        self.api = tw.API(auth)

    def tweet(self, text: str, hashtags: [str], images: [str]):
        print(f'----- Start tweeting -----')
        ids = [self.api.media_upload(i).media_id for i in images]

        tags = ' '.join([f'#{t}' for t in hashtags])
        status = self.api.update_status(
            status=f'{text}\n\n {tags}', media_ids=ids)

        print(
            f'Successfully tweeted: https://twitter.com/anyuser/status/{status.id_str}')

        print(f'----- Finish tweeting -----')


# ----------------- Testing -----------------
# load_dotenv()
# client = TwitterClient(os.getenv('TWITTER_CLIENT'), os.getenv(
#     'TWITTER_SECRET'), os.getenv('TWITTER_USER'), os.getenv('TWITTER_PASSWORD'))

# client.tweet('Test Tweet', ['test', 'testing'], [
#              'images/pixel-ina.png', 'images/pixel-gura.png'])
