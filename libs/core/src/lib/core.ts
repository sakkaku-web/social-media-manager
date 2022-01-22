export interface SNSPost {
  text: string;
  images: string[];
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
}
