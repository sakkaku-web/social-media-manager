import tweepy as tw
from flask_openapi3 import FileStorage
from io import BufferedReader


class TwitterClient:
    def __init__(self, client: str, secret: str, a_token: str, a_secret: str):
        auth = tw.OAuth1UserHandler(client, secret, a_token, a_secret)
        self.api = tw.API(auth)
        self.api2 = tw.Client(access_token=a_token,
                              access_token_secret=a_secret,
                              consumer_key=client,
                              consumer_secret=secret)

    def user(self):
        return self.api2.get_me().data

    def tweet(self, text: str, images: [FileStorage]):
        print(f'----- Start tweeting -----')

        ids = []
        for image in images:
            image.name = image.filename
            res = self.api.media_upload(filename=image.filename,
                                        file=BufferedReader(image))
            ids.append(res.media_id)

        status = self.api.update_status(
            status=text, media_ids=ids)

        print(f'----- Finish tweeting -----')
        return status.id_str
