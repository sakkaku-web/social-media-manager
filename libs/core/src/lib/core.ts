export interface Post {
  text: string;
}

export interface SocialMediaService {
  createPost(post: Post);
}
