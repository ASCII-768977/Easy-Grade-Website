import initialSate from '../initialState';
import { Action } from '../../types';
import {
  STORE_CURRENT_SUBMISSION,
  STORE_MULTI_SUBMISSION,
  STORE_SUBMISSION_IS_ISEMPTY,
  STORE_SUBMISSION_NUM,
  STORE_SUBMISSION_STATUS,
} from '../actions/submission';

const initialSubmissionState = initialSate.submission;

const submissionReducer = (state = initialSubmissionState, action: Action) => {
  switch (action.type) {
    case STORE_CURRENT_SUBMISSION:
      return { ...state, currentSubmission: action.payload };
    case STORE_MULTI_SUBMISSION:
      return { ...state, multiSubmission: action.payload };
    case STORE_SUBMISSION_NUM:
      return { ...state, submissionNum: action.payload };
    case STORE_SUBMISSION_IS_ISEMPTY:
      return { ...state, isEmpty: action.payload };
    case STORE_SUBMISSION_STATUS:
      return { ...state, submissionStatus: action.payload };
    default:
      return state;
  }
};

export default submissionReducer;
