import requests as req


class PinterestClient:
    def __init__(self, token: str) -> None:
        self.baseURL = 'https://api.pinterest.com/v5'
        self.headers = {
            'Authorization': f'Bearer {token}',
        }

    def get(self, url: str):
        res = req.get(self.baseURL + url, headers=self.headers)
        res.raise_for_status()
        return res.json()
