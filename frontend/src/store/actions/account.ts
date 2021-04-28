import { Action, GoogleLogin, LoginInfo, SignUpInfo } from '../../types';

export const REQUEST_USER_LOGIN = 'REQUEST_USER_LOGIN';
export const REQUEST_GOOGLE_USER_LOGIN = 'REQUEST_GOOGLE_USER_LOGIN';
export const REQUEST_USER_SIGNUP = 'REQUEST_USER_SIGNUP';
export const STORE_USER_LOGIN_IS_LOADING = 'STORE_USER_LOGIN_IS_LOADING';
export const STORE_USER_LOGIN_SUCCESS = 'STORE_USER_LOGIN_SUCCESS';
export const STORE_USER_LOGIN_FAIL = 'STORE_USER_LOGIN_FAIL';
export const STORE_USER_SIGNUP_FAIL = 'STORE_USER_SIGNUP_FAIL';
export const STORE_USER_LOGOUT = 'STORE_USER_LOGOUT';

export const requestUserLogin = (loginInfo: LoginInfo): Action<LoginInfo> => ({
  type: REQUEST_USER_LOGIN,
  payload: loginInfo,
});

export const requestUserSignUp = (signUpInfo: SignUpInfo): Action<SignUpInfo> => ({
  type: REQUEST_USER_SIGNUP,
  payload: signUpInfo,
});

export const requestGoogleUserLogin = (googleLogin: GoogleLogin): Action<GoogleLogin> => ({
  type: REQUEST_GOOGLE_USER_LOGIN,
  payload: googleLogin,
});

export const storeUserLoginIsLoading = (isLoading: boolean): Action<boolean> => ({
  type: STORE_USER_LOGIN_IS_LOADING,
  payload: isLoading,
});

export const storeUserLoginSuccess = (userInfo: any): Action => ({
  type: STORE_USER_LOGIN_SUCCESS,
  payload: userInfo,
});

export const storeUserLoginFail = (errorMsg: string): Action<string> => ({
  type: STORE_USER_LOGIN_FAIL,
  payload: errorMsg,
});

export const storeUserSignUpFail = (errorMsg: string): Action<string> => ({
  type: STORE_USER_SIGNUP_FAIL,
  payload: errorMsg,
});

export const storeUserLogout = (): Action => ({
  type: STORE_USER_LOGOUT,
});
