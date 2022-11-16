const URL = 'https://oauth.reddit.com';

export class RedditClient {

  private headers: HeadersInit;

  constructor(token: string, userAgent = 'web:social-media-manager:0.0.1 (by /u/illu11)') {
    this.headers = {
      'Authorization': `Bearer ${token}`,
      'User-Agent': userAgent,
    };
  }

  private async getJson(url: string) {
    const res = await fetch(URL + url, { headers: this.headers });
    return [await res.json(), res.status];
  }

  async getUser(): Promise<RedditUser> {
    const [data, status] = await this.getJson('/api/v1/me');
    if (status !== 200) {
      return null;
    }
    return { id: data['id'], name: data['name'] };
  }

  async getUpvoted(user: string): Promise<RedditUpvoted[]> {
    const [data, status] = await this.getJson(`/user/${user}/upvoted?sort=new&type=link`);
    if (status !== 200) {
      return [];
    }
    const items = data['data']['children'] as object[];
    return items.map(x => x['data']).map(x => ({ link: x['permalink'], image: x['url'] }));
  }
}

export interface RedditUser {
  id: string;
  name: string;
}

export interface RedditUpvoted {
  link: string;
  image: string;
}
