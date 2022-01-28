# Social Media Manager

Currently working providers:

- twitter
- pinterest

Endpoints:

- `apps/sns-api` contains the basic social media auth and proxy
  - `/api/auth/{PROVIDER}/login` - get the login url for the provider
  - `/api/auth/{PROVIDER}/callback` - the redirect url after login, has to be set as a valid redirect url in each provider
  - `/api/{PROVIDER}` - proxy to the provider endpoint where Bearer token (if available) will automatically be set
    - pinterest -> https://api.pinterest.com/v5
