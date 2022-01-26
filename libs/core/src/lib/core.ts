export interface SNSPost {
  text: string;
  group?: string;
}

export interface SNSMedia {
  image: Buffer;
  filename: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Group {
  id: string;
  name: string;
}

export enum SocialProvider {
  TWITTER = 'twitter',
  REDDIT = 'reddit',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  IMGUR = 'imgur',
  PINTEREST = 'pinterest',
}
