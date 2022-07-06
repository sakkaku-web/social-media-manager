# Social Media Manager

**Website is discontinued. Will only be used to get the oauth token for now. Instead use scripts in `./scripts`**

## Scripts

### `reddit.py`

Right now get the token from the website. It's now possible to get the token from the new website: https://sns-manager.herokuapp.com/api/reddit/auth

- multi image post (text as comment)
- single image post (no text, not possible because of reddit api)
- text post

### `pixiv.py`

Set the following env variables `PIXIV_USER` and `PIXIV_PASSWORD` and run the `login()` method in the script to get a token for the client.

Note: there is no official rest api documentation. But it's possible to find it using the pixiv mobile app and [mitmproxy](mitmproxy.org). It's the easiest using an [android emulator](genymotion.com/) (< Android 7.0)

- post illustrations

### `twitter.py`

It uses OAuth 1.0 User Context because media upload is only supported with that. The following values have to be generated by you: Client Id, Client Secret, Access Token, Access Secret

https://developer.twitter.com/en/apps

- post tweets with images

## ------ OLD README after being discontinued ------

Manage your social media post on a single website.

Supported Social Media:

- [x] Twitter
- [x] Pinterest
- [x] Reddit (single subreddit)
- [ ] Imgur
- [ ] Pixiv?
- [ ] Youtube?
- [ ] Instagram -> too difficult, needs to go through facebook where I probably have to verify my identifiy, not dealing with this crap
- [ ] Facebook -> same as instagram

Supported Features:

- [x] Post text/image
- [ ] View notification
- [ ] Schedule posts

## Development

run `npm run serve`

Endpoints:

- `apps/sns-api` contains the basic social media auth and proxy
  - `/api/auth/{PROVIDER}/login` - get the login url for the provider
  - `/api/auth/{PROVIDER}/callback` - the redirect url after login, has to be set as a valid redirect url in each provider
  - `/api/{PROVIDER}` - proxy to the provider endpoint where Bearer token (if available) will automatically be set
    - pinterest -> https://api.pinterest.com/v5
    - twitter -> https://api.twitter.com
      - if contains `/1.1/media/` -> https://upload.twitter.com
  - When running the server, make sure the env variables in `.env.sample` is set.

## Credits

- Used cat logo on some places, is made by quatre main under this [license](https://creativecommons.org/licenses/by/2.0/): https://placekitten.com/attribution.html
