import { STORE_COURSE_LIST, UPDATE_COURSE_LIST } from '../actions/actionTypes';
import initialSate from '../initialState';
import { Action } from '../../types';

const initialCourseState = initialSate.courseList;

const courseListReducer = (state = initialCourseState, action: Action) => {
  switch (action.type) {
    case STORE_COURSE_LIST:
      return action.payload;
    case UPDATE_COURSE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default courseListReducer;
