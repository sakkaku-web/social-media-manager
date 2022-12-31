import type { User } from "src/openapi";

const URL = "https://api.pinterest.com/v5";

export class PinterestClient {
  private headers: HeadersInit;

  constructor(token: string) {
    this.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  async getUser(): Promise<User> {
    const res = await fetch(URL + "/user_account");
    const data = await res.json();
    return {
      id: data["username"],
      name: data["usernamae"],
    };
  }

  async getBoards(bookmark?: string): Promise<[Board[], string]> {
    const query = new URLSearchParams({ bookmark });
    const res = await fetch(`${URL}/boards?${query}`);
    const data = await res.json();

    const boards = data["items"].map((x) => ({ id: x["id"], name: x["name"] }));
    return [boards, data["bookmark"]];
  }

  async getPinsOfBoard(
    board: string,
    bookmark?: string
  ): Promise<[Pin[], string]> {
    const query = new URLSearchParams({ bookmark });
    const res = await fetch(`${URL}/boards/${board}/pins?${query}`);
    const data = await res.json();

    const pins = data["items"].map((x) => ({
      id: x["id"],
      link: x["link"],
      image: x["link"],
    }));
    return [pins, data["bookmark"]];
  }
}

export interface Board {
  id: string;
  name: string;
}

export interface Pin {
  id: string;
  link: string;
  image: string;
}
