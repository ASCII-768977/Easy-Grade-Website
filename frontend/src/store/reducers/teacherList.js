import initialSate from '../initialState';
import { Action } from '../../types';
import { STORE_TEACHER_LIST } from '../actions/actionTypes';

const initialTeacherState = initialSate.teacherList;

const teacherReducer = (state = initialTeacherState, action: Action) => {
  switch (action.type) {
    case STORE_TEACHER_LIST:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default teacherReducer;
