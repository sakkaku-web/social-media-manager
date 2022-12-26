import type { TokenType } from "src/storage";
import env from "../../environment";
import type { User } from "../auth";
import type { ReferenceImage } from "../models";

const URL = "https://oauth.reddit.com";

export class RedditClient {
  private headers: HeadersInit;

  constructor(
    token: string,
    userAgent = "web:social-media-manager:0.0.1 (by /u/illu11)"
  ) {
    this.headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": userAgent,
    };
  }

  private async getJson(url: string) {
    const res = await fetch(URL + url, { headers: this.headers });
    if (res.status !== 200) {
      return null;
    }
    return await res.json();
  }

  async refreshToken(refreshToken: string): Promise<TokenType | null> {
    const res = await fetch(env.apiBase + "/api/reddit/auth/refresh", {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (res.status !== 200) {
      return null;
    }
    return res.json();
  }

  async getUser(): Promise<User> {
    const data = await this.getJson("/api/v1/me");
    if (!data) {
      return null;
    }
    return { id: data["id"], name: data["name"] };
  }

  async getUpvoted(user: string): Promise<ReferenceImage[]> {
    const data = await this.getJson(`/user/${user}/upvoted?sort=new&type=link`);
    if (!data) {
      return [];
    }
    const items = data["data"]["children"] as object[];
    return items
      .map((x) => x["data"])
      .filter((x) => !x["selftext"])
      .map((x) => ({
        link: "https://reddit.com" + x["permalink"],
        image: x["url"],
      }));
  }
}
