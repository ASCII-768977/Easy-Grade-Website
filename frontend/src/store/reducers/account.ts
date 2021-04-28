import { UPDATE_ACCOUNT_SETTING } from '../actions/actionTypes';
import initialState from '../initialState';
import { Action } from '../../types';
import jwt from 'jsonwebtoken';
import {
  STORE_USER_LOGIN_FAIL,
  STORE_USER_LOGIN_IS_LOADING,
  STORE_USER_LOGIN_SUCCESS,
  STORE_USER_LOGOUT,
  STORE_USER_SIGNUP_FAIL,
} from '../actions/account';

const getLocalUser = () => {
  const userLocal = JSON.parse(sessionStorage.getItem('user') as string);
  if (!userLocal) return null;
  const token = userLocal.token;

  try {
    const isGoogleToken = token.length > 500;
    let decoded;
    if (isGoogleToken) {
      decoded = jwt.decode(token);
    } else {
      decoded = jwt.verify(userLocal.token, 'soeasy');
    }
    // @ts-ignore
    let exp = decoded?.exp;
    if (!exp) return null;

    const isExpired = Date.now() - exp * 1000 > 0;

    if (isExpired) return null;

    return {
      ...userLocal,
      isAuthenticated: true,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const initialAccountState = getLocalUser() ? getLocalUser() : initialState.user;

const accountReducer = (state = initialAccountState, action: Action) => {
  switch (action.type) {
    case STORE_USER_LOGIN_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case STORE_USER_LOGIN_SUCCESS:
      return { isAuthenticated: true, isLoading: false, ...action.payload, errorMessage: '' };
    case STORE_USER_LOGIN_FAIL:
      return { ...state, isAuthenticated: false, isLoading: false, errorMessage: action.payload };
    case STORE_USER_SIGNUP_FAIL:
      return { ...state, isAuthenticated: false, isLoading: false, signUpErrorMessage: action.payload };
    case STORE_USER_LOGOUT:
      return initialState.user;
    case UPDATE_ACCOUNT_SETTING:
      return action.payload;
    default:
      return state;
  }
};

export default accountReducer;
