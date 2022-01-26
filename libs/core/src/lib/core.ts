export interface SNSPost {
  text: string;
}

export interface SNSMedia {
  image: Buffer;
  filename: string;
}

export interface User {
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
