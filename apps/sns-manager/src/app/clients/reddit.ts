import { SNSPost, SocialProvider, User } from '@kumi-arts/core';
import { Axios, AxiosResponse } from 'axios';
import { createClient } from './client';

export interface RedditPost extends SNSPost {
  subreddit: string;
}

export interface PrepareImageUpload {
  s3UploadLease: { action: string; fields: [{ name: string; value: string }] };
  asset: { asset_id: string };
}

export class RedditClient {
  private client: Axios;

  constructor() {
    this.client = createClient(SocialProvider.REDDIT, {
      baseURL: '/api/reddit',
    });
  }

  private async prepareImageUpload(
    subreddit: string,
    media: File
  ): Promise<PrepareImageUpload> {
    const body = `filepath=${media.name}&mimetype=${media.type}`;
    return this.handleResponse(
      await this.client.post(
        `/r/${subreddit}/api/widget_image_upload_s3`,
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
    );
  }

  private async uploadImage(
    { s3UploadLease }: PrepareImageUpload,
    media: File
  ): Promise<void> {
    const body = new FormData();
    s3UploadLease.fields.forEach((f) => {
      body.append(f.name, f.value);
    });
    body.append('file', media, media.name);

    return this.handleResponse(await this.client.post(`/custom/media`, body));
  }

  async postMedia({
    subreddit,
    media,
    title,
    text,
  }: RedditPost): Promise<string> {
    const mediaIds = [];

    if (media) {
      const prepare = await this.prepareImageUpload(subreddit, media);
      const x = await this.uploadImage(prepare, media);
      console.log(x);

      mediaIds.push(prepare.asset.asset_id);
    }

    // const body = new FormData();
    // body.append('title', media.title);
    // body.append('items');
    // body.append('sr', media.subreddit);
    // body.append('kind', 'image');

    // if (mediaIds.length > 1) {
    const x: any = this.handleResponse(
      await this.client.post(
        `/api/submit_gallery_post.json?api_type=json`,
        JSON.stringify({
          items: mediaIds.map((id) => ({ media_id: id })),
          kind: 'self',
          sr: subreddit,
          title: title,
          text: text,
        })
      )
    );

    return x.json?.data?.url || '';
    // }

    // const body = new URLSearchParams({
    //   kind: 'image',
    //   sr: subreddit,
    //   title: title,
    //   text: text,
    //   url: 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com/rte_images/8ax4zcskwy891',
    // });

    // const x: any = this.handleResponse(
    //   await this.client.post(`/api/submit?api_type=json`, body.toString(), {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   })
    // );

    // return x.json?.data?.url || '';
  }

  private handleResponse<T>(res: AxiosResponse<T>): T {
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res.data));
    }

    return res.data;
  }

  async getUser(): Promise<User> {
    const { data } = await this.client.get('/api/v1/me');
    if (!data.name) {
      throw new Error('Failed to get user');
    }

    return { id: data.name, name: data.name };
  }

  async querySubreddit(query: string): Promise<string[]> {
    const urlParam = new URLSearchParams({ query });

    const { data } = await this.client.get(
      `/api/subreddit_autocomplete_v2?${urlParam.toString()}`
    );

    return data.data.children
      .map(
        (child: Record<string, Record<string, string>>) =>
          child.data.display_name
      )
      .filter((x: string) => !!x);
  }
}
