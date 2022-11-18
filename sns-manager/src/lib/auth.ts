export interface Token {
  token: string;
  refreshToken?: string;

  // For pixiv
  userId?: string;
  username?: string;
}

export interface User {
  id: string;
  name: string;
}
