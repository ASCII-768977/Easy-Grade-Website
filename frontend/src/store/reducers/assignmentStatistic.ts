import { STORE_ASSIGNMENT_STATISTIC } from '../actions/actionTypes';
import initialState from '../initialState';
import { Action } from '../../types';

const initialAssignmentStatisticState = initialState.assignmentStatistic;

const AssignmentStatisticReducer = (state = initialAssignmentStatisticState, action: Action) => {
  switch (action.type) {
    case STORE_ASSIGNMENT_STATISTIC:
      return [...action.payload];
    default:
      return state;
  }
};

export default AssignmentStatisticReducer;
