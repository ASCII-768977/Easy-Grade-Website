import { Role } from './common';

export interface Account {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: Role;
  _id: string;
  accountEmail: string;
  name: string;
  errorMessage: string;
  signUpErrorMessage: string;
  accountName: string;
  accountPwd: string;
  status: string;
  course: Array<string>;
  institution: string;
  notificationType: Number;
}

export interface GoogleLogin {
  token: string;
  GoogleLoginInfo: GoogleLoginInfo;
}

export interface GoogleLoginInfo {
  accountEmail: string;
  accountName: string;
}

export interface SignUpInfo {
  accountName: string;
  accountEmail: string;
  accountPwd: string;
  role: Role;
}

export interface LoginInfo {
  accountEmail: string;
  accountPwd: string;
}
