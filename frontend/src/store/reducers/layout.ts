import initialSate from '../initialState';
import { Action } from '../../types';
import { STORE_NAV_COLLAPSED } from '../actions/actionTypes';

const initialLayoutState = initialSate.layout;

const layoutReducer = (state = initialLayoutState, action: Action) => {
  switch (action.type) {
    case STORE_NAV_COLLAPSED:
      return { ...state, navCollapsed: action.payload };
    default:
      return state;
  }
};

export default layoutReducer;
