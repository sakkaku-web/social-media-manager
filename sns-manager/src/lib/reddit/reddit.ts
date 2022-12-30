import { Configuration, RedditApi, ReferenceImage, User } from "../../openapi";
import type { TokenType } from "src/storage";
import env from "../../environment";

const URL = "https://oauth.reddit.com";

export class RedditClient {
  private headers: HeadersInit;
  private client: RedditApi;

  constructor(
    token: string,
    userAgent = "web:social-media-manager:0.0.1 (by /u/illu11)"
  ) {
    this.client = new RedditApi(
      new Configuration({
        basePath: env.apiBase,
        headers: { Authorization: `Bearer ${token}` },
      })
    );
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
    return this.client.userUserGet();
    // const data = await this.getJson("/api/v1/me");
    // if (!data) {
    //   return null;
    // }
    // return { id: data["id"], name: data["name"] };
  }

  async getUpvoted(user: string): Promise<ReferenceImage[]> {
    return this.client
      .upvotedUpvotedUsernameGet({ username: user })
      .then((x) => x.images);

    // const data = await this.getJson(`/user/${user}/upvoted?sort=new&type=link`);
    // if (!data) {
    //   return [];
    // }
    // const items = data["data"]["children"] as object[];
    // return items
    //   .map((x) => x["data"])
    //   .filter((x) => !x["selftext"])
    //   .map((x) => ({
    //     link: "https://reddit.com" + x["permalink"],
    //     image: x["url"],
    //   }));
  }
}
