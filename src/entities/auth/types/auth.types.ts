export interface IAuthState {
  isAuthenticated: boolean;
  user: IAuthData;
  token: string;
  isLoading: boolean;
}

export interface IAuthData {
  id: string;
  name: string;
  email: string;
}
