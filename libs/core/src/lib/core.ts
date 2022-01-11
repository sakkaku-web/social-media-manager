export interface Post {
  text: string;
}

export interface User {
  name: string;
  username: string;
}

export interface SocialMediaService {
  getUser(): Promise<User>;
  createPost(post: Post);
}
