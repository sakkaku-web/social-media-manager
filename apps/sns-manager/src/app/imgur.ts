import { User } from '@kumi-arts/core';

export class ImgurClient {
  constructor(private token: string) {}

  private url(url: string) {
    return `https://api.imgur.com/${url}`;
  }

  private get headers(): HeadersInit {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  async credits(): Promise<void> {
    const response = await fetch(this.url('3/credits'));
    const data = await response.json();
    console.log(data);
  }

  private fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      // Read file content on file loaded event
      reader.onload = function (event) {
        resolve(event.target?.result as string);
      };

      // Convert data to base64
      reader.readAsDataURL(file);
    });
  };

  async uploadImage(image: File): Promise<string> {
    const body = new FormData();
    body.append('image', await this.fileToBase64(image));
    body.append('name', image.name);

    const response = await fetch(this.url('3/image'), {
      method: 'POST',
      headers: this.headers,
      body,
    });

    const { data } = await response.json();
    return data.link;
  }

  async getUser(): Promise<User> {
    const response = await fetch(this.url('3/account/me/settings'), {
      headers: this.headers,
    });

    const { data } = await response.json();
    const name = data.account_url;
    return { id: name, name };
  }
}
