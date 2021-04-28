import { STORE_ASSIGNMENT_LIST } from '../actions/actionTypes';
import initialState from '../initialState';
import { Action } from '../../types';

const initialAssignmentListState = initialState.assignmentList;

const assignmentListReducer = (state = initialAssignmentListState, action: Action) => {
  switch (action.type) {
    case STORE_ASSIGNMENT_LIST:
      let assignmentSet: any = {};
      action.payload.forEach((item: any) => {
        assignmentSet[item._id] = item;
      });
      return { ...assignmentSet };
    default:
      return state;
  }
};

export default assignmentListReducer;
