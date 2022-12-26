import type { TokenType } from "src/storage";
import env from "../../environment";
import type { User } from "../auth";
import type { ReferenceImage } from "../models";

const URL = "https://api.twitter.com/2";

export class Twitter2Client {
  private headers: HeadersInit;

  constructor(token: string) {
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  private async getJson(url: string) {
    const res = await fetch(URL + url, { headers: this.headers });
    if (res.status !== 200) {
      return null;
    }
    return await res.json();
  }

  // async refreshToken(refreshToken: string): Promise<TokenType | null> {
  //   const res = await fetch(env.apiBase + "/api/reddit/auth/refresh", {
  //     method: "POST",
  //     headers: {
  //       ...this.headers,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refresh_token: refreshToken }),
  //   });
  //   if (res.status !== 200) {
  //     return null;
  //   }
  //   return res.json();
  // }

  async getUser(): Promise<User> {
    // const data = await this.getJson("/api/v1/me");
    // if (!data) {
    //   return null;
    // }
    // return { id: data["id"], name: data["name"] };
    return { id: "", name: "<UNAVAILABLE>" };
  }

  async getIdOfUser(user: string): Promise<string> {
    const { data } = await this.getJson(`/users/by/username/${user}`);
    console.log(data);

    // curl "https://api.twitter.com/2/users/by/username/{username}" -H "Authorization: Bearer $BEARER_TOKEN"
    return "";
  }

  async getUpvoted(user: string): Promise<ReferenceImage[]> {
    const data = await this.getJson(`/user/${user}/upvoted?sort=new&type=link`);
    if (!data) {
      return [];
    }
    const items = data["data"]["children"] as object[];
    return items
      .map((x) => x["data"])
      .map((x) => ({ link: x["permalink"], image: x["url"] }));
  }
}
