export interface IAuthState {
  isAuthenticated: boolean | null;
  user: IAuthData;
  token: IToken;
}

export interface IAuthData {
  id: string;
  email: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
