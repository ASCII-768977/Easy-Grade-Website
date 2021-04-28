import { STORE_CURRENT_ASSIGNMENT } from '../actions/actionTypes';
import initialState from '../initialState';
import { Action } from '../../types';

const initialAssignmentState = initialState.assignment;

const assignmentReducer = (state = initialAssignmentState, action: Action) => {
  switch (action.type) {
    case STORE_CURRENT_ASSIGNMENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default assignmentReducer;
