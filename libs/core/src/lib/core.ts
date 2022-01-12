export interface Post {
  text: string;
}

export interface User {
  username: string;
}

export enum SocialProvider {
  TWITTER = 'twitter',
  REDDIT = 'reddit',
}
