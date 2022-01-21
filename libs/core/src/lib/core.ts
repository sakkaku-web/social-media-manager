export interface SNSPost {
  text: string;
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
