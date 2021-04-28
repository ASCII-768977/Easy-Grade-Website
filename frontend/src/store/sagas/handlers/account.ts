import { call, put, select } from 'redux-saga/effects';
import { ASYNC_UPDATE_ACCOUNT } from '../actions/asyncActionTypes';
import { asyncUpdateAccount, axiosUserGoogleLogin, axiosUserLogin, axiosUserSignUp } from '../requests/account';
import {
  REQUEST_GOOGLE_USER_LOGIN,
  REQUEST_USER_LOGIN,
  REQUEST_USER_SIGNUP,
  storeUserLoginFail,
  storeUserLoginIsLoading,
  storeUserLoginSuccess,
  storeUserSignUpFail,
} from '../../actions/account';
import { Action } from '../../../types';
import { State } from '../../../types/state';

export function* asyncHandleAccount(action: Action): any {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      try {
        yield put(storeUserLoginIsLoading(true));
        const { data } = yield call(axiosUserLogin, action.payload);
        yield put(storeUserLoginSuccess(data));
        const user = yield select(userSelector);
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    case REQUEST_GOOGLE_USER_LOGIN: {
      try {
        const { data } = yield call(axiosUserGoogleLogin, action.payload.GoogleLoginInfo);
        const dataWithToken = { ...data, token: action.payload.token };
        yield put(storeUserLoginSuccess(dataWithToken));
        const user = yield select(userSelector);
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        yield put(storeUserLoginFail(err.response.data.message));
      }
      break;
    }
    case REQUEST_USER_SIGNUP: {
      try {
        const { data } = yield call(axiosUserSignUp, action.payload);
        yield put(storeUserLoginSuccess(data));
        const user = yield select(userSelector);
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch (err) {
        yield put(storeUserSignUpFail(err.response.data.message));
      }
      break;
    }
    case ASYNC_UPDATE_ACCOUNT: {
      try {
        yield call(asyncUpdateAccount, action.payload.user, action.payload._id);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const userSelector = (state: State) => state.user;
