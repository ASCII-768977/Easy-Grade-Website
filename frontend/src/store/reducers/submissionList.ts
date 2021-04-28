import initialSate from '../initialState';
import { Action } from '../../types';

import { STORE_SUBMISSION_LIST, STORE_SUBMISSION_TABLE_CONFIG } from '../actions/actionTypes';

const initialSubmissionListState = initialSate.submissionList;

const submissionListReducer = (state = initialSubmissionListState, action: Action) => {
  switch (action.type) {
    case STORE_SUBMISSION_LIST:
      return { ...state, data: action.payload };
    case STORE_SUBMISSION_TABLE_CONFIG:
      return { ...state, config: { ...state.config, ...action.payload } };
    default:
      return state;
  }
};

export default submissionListReducer;
