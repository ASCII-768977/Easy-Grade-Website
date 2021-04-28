import baseUrl from '../config/config';

export const apiUserLogin = (): string => `${baseUrl}/account/login`;
export const apiUserGoogleLogin = (): string => `${baseUrl}/account/googlelogin`;
export const apiUserSignUp = (): string => `${baseUrl}/account`;
