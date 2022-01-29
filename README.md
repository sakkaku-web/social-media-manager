# Social Media Manager

Manage your social media post on a single website.

## Development

Current working providers:

- twitter (currently uses OAuth 1.0a because media upload is needed)
- pinterest

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
