export interface Post {
  text: string;
}

export interface User {
  username: string;
}

export interface SocialMediaService {
  getProfileLink(username: string): string;
  getUser(): Promise<User>;
  createPost(post: Post);
}
