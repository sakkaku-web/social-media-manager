export interface SNSPost {
  title: string;
  text: string;
  media?: SNSMedia;
}

export interface SNSMedia {
  image: File;
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
