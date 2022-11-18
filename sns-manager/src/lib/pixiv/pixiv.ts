import type { TokenType } from "src/storage";
import env from "../../environment";
import type { User } from "../auth";
import type { ReferenceImage } from "../models";

const URL = 'https://app-api.pixiv.net';
const HOME = 'https://www.pixiv.net';

export class PixivClient {

  private headers: HeadersInit;

  constructor(token: string) {
    this.headers = {
      'Authorization': `Bearer ${token}`,
    };
  }

  private async getJson(url: string) {
    const res = await fetch(env.apiBase + url, { headers: this.headers });
    if (res.status !== 200) {
      return null;
    }
    return await res.json();
  }

  async refreshToken(refreshToken: string): Promise<TokenType | null> {
    const res = await fetch(env.apiBase + '/api/pixiv/auth/refresh', {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    if (res.status !== 200) {
      return null;
    }
    return res.json();
  }

  async getUser(): Promise<User> {
    // dummy request to check if token is valid
    const data = await this.getJson('/api/pixiv/ping');
    if (!data) {
      return null;
    }
    return { id: 'test', name: 'test' };
  }

  async getBookmarks(userId: string): Promise<ReferenceImage[]> {
    const data = await this.getJson(`/api/pixiv/bookmarks?user_id=${userId}`)
    if (!data) {
      return [];
    }

    const illusts = data['illusts'];
    return illusts.map(x => ({ link: `${HOME}/artworks/${x['id']}`, image: this.formatImageUrl(x['image_urls']['medium']) }));
  }

  private formatImageUrl(url: string) {
    return url.replace(/\/c\/\w+\//, '/');
  }

}
