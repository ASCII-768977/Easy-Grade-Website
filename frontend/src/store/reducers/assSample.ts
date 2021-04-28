import { UPDATE_ALLOCATED_STATUS, GET_ALLOCATED_STATUS, UPDATE_ALLOCATED_VALUE } from '../actions/actionTypes';
import initialSate from '../initialState';
import { Action } from '../../types';

const initialCourseState = initialSate.assSample;

const assSampleReducer = (state = initialCourseState, action: Action) => {
  switch (action.type) {
    case UPDATE_ALLOCATED_STATUS:
      return { ...state, assSample: action.payload };
    case GET_ALLOCATED_STATUS:
      return state;
    case UPDATE_ALLOCATED_VALUE:
      return { ...state, totalNum: action.payload };
    default:
      return state;
  }
};

export default assSampleReducer;
