import { STORE_CURRENT_COURSE } from '../actions/actionTypes';
import initialState from '../initialState';
import { Action } from '../../types';

const initialToDoState = initialState.course;

const courseReducer = (state = initialToDoState, action: Action) => {
  switch (action.type) {
    case STORE_CURRENT_COURSE:
      if (typeof action.payload.annoucements !== 'undefined') {
        action.payload.annoucements.sort((firstEle, secondEle) => {
          if (+firstEle.createdDate > +secondEle.createdDate) return -1;
          if (+firstEle.createdDate < +secondEle.createdDate) return 1;
          if (+firstEle.createdDate === +secondEle.createdDate) return 0;
        });
      }
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default courseReducer;
