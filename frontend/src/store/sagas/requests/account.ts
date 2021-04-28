import { AxiosResponse } from 'axios';
import { Account } from '../../../types';
import { apiUserGoogleLogin, apiUserLogin, apiUserSignUp } from '../../../api/account';
import { GoogleLoginInfo, LoginInfo, SignUpInfo } from '../../../types';
import authAxios from '../../../api/authAxios';
import baseUrl from '../../../config/config';

export const asyncUpdateAccount = async (user: Account, _id: string): Promise<AxiosResponse> => {
  const updateAccount = `${baseUrl}/account/${_id}`;
  return await authAxios.put(updateAccount, user);
};

export const axiosUserLogin = async (loginInfo: LoginInfo): Promise<AxiosResponse> => {
  return await authAxios.post(apiUserLogin(), loginInfo);
};

export const axiosUserGoogleLogin = async (googleLoginInfo: GoogleLoginInfo): Promise<AxiosResponse> => {
  return await authAxios.post(apiUserGoogleLogin(), googleLoginInfo);
};

export const axiosUserSignUp = async (signUpInfo: SignUpInfo): Promise<AxiosResponse> => {
  return await authAxios.post(apiUserSignUp(), signUpInfo);
};
