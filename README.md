# Social Media Manager

This project contains a REST API and eventually a frontend for it. The goal is to manage all your social media platforms
on a single website.

REST API can be found here: https://sns-manager.herokuapp.com/

New UI will be available here: https://sakkaku-web.github.io/social-media-manager/

## Endpoint Sources

- [x] **Reddit**: https://www.reddit.com/dev/api
- [x] **Twitter**: https://developer.twitter.com/en/docs/twitter-api
- [x] **Pixiv**: there is no official rest api documentation. But it's possible to find it using the pixiv mobile app
      and [mitmproxy](https://mitmproxy.org). The easiest way is using an [android emulator](https://genymotion.com/) (< Android 7.0)
- [ ] **Pinterest**: should be possible, but no personal need right now.
- [ ] **Imgur**: should be possible, but no personal need right now.
- [ ] **Artstation**: they have an API but it seems to be more protected than pixiv. Finding the endpoints is not enough
- [ ] **Facebook**: Just no, they just want our data for everything
- [ ] **Instagram**: Need to go through facebook...

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
