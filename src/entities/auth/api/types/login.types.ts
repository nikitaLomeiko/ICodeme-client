import { IToken } from "../../model";

export interface IAuthResponse extends IToken, IAuth {}

export interface IAuth {
  userId: string;
  email: string;
}

export interface ILoginParams {
  email: string;
  password: string;
}
