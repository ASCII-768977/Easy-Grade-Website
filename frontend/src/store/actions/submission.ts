import { Action } from '../../types';
import { Submission } from '../../types/submission';

export const STORE_SUBMISSION_IS_ISEMPTY = 'STORE_SUBMISSION_IS_ISEMPTY';
export const storeSubMissionIsEmpty = (isEmpty: boolean): Action<boolean> => ({
  type: STORE_SUBMISSION_IS_ISEMPTY,
  payload: isEmpty,
});

export const STORE_CURRENT_SUBMISSION = 'STORE_CURRENT_SUBMISSION';
export const storeCurrentSubmission = (submission: Submission): Action<Submission> => ({
  type: STORE_CURRENT_SUBMISSION,
  payload: submission,
});

export const STORE_MULTI_SUBMISSION = 'STORE_MULTI_SUBMISSION';
export const storeMultiSubMission = (multiSubmission: Array<Submission>): Action<Array<Submission>> => ({
  type: STORE_MULTI_SUBMISSION,
  payload: multiSubmission,
});

export const STORE_SUBMISSION_NUM = 'STORE_SUBMISSION_NUM';
export const storeSubMissionNum = (submissionNum: number): Action<number> => ({
  type: STORE_SUBMISSION_NUM,
  payload: submissionNum,
});

export const REQUEST_S_SUBMISSION = 'REQUEST_S_SUBMISSION';
export const asyncRequest_S_submission = (assignmentId: string): Action<string> => ({
  type: REQUEST_S_SUBMISSION,
  payload: assignmentId,
});

export const REQUEST_T_SUBMISSION = 'REQUEST_T_SUBMISSION';
export const asyncRequest_T_submission = (submissionID: string): Action<string> => ({
  type: REQUEST_T_SUBMISSION,
  payload: submissionID,
});

interface SubmissionFormData {
  assignmentId: string;
  submittedByName: string;
  pdfFile: any;
  commentSubmit: string;
}

export const CREATE_S_SUBMISSION = 'CREATE_S_SUBMISSION';
export const asyncCreate_S_submission = (submissionFormData: SubmissionFormData): Action<SubmissionFormData> => ({
  type: CREATE_S_SUBMISSION,
  payload: submissionFormData,
});

export interface SubmissionStatus {
  success: boolean;
  error: '';
}
export const STORE_SUBMISSION_STATUS = 'STORE_SUBMISSION_STATUS';
export const storeSubmissionStatus = (submissionStatus: SubmissionStatus): Action<SubmissionStatus> => ({
  type: STORE_SUBMISSION_STATUS,
  payload: submissionStatus,
});

export interface UpdateSubmission {
  submissionId: string;
  feedback: string;
  gradedScore: number;
}
export const UPDATE_SUBMISSION = 'UPDATE_SUBMISSION';
export const asyncUpdateSubmission = (updateSubmission: UpdateSubmission): Action<UpdateSubmission> => ({
  type: UPDATE_SUBMISSION,
  payload: updateSubmission,
});
