import { call, put, select, fork } from 'redux-saga/effects';
import { Action } from '../../../types';
import {
  REQUEST_T_SUBMISSION,
  REQUEST_S_SUBMISSION,
  storeMultiSubMission,
  storeCurrentSubmission,
  storeSubMissionNum,
  storeSubMissionIsEmpty,
  CREATE_S_SUBMISSION,
  asyncRequest_S_submission,
  storeSubmissionStatus,
  UPDATE_SUBMISSION,
  asyncRequest_T_submission,
} from '../../actions/submission';
import {
  axiosCreate_S_submission,
  requestGetMultiSubmission,
  requestGetSubmissionById,
  requestGetSubmissionList,
  requestAllocateSubmission,
  requestUpdateSubmission,
} from '../requests/submission';
import { selectAccountName, selectUserEmail, selectSubmissionListConfig, selectAssignmentId } from '../selectors';
import { ASYNC_REQUEST_SUBMISSION_LIST, ASYNC_ALLOCATE_SUBMISSION } from '../actions/asyncActionTypes';
import { storeSubmissionTableConfig, storeSubmissionList } from '../../actions/actionCreator';
import { State } from '../../../types/state';

export function* asyncHandleSubmission(action: Action): any {
  switch (action.type) {
    case REQUEST_T_SUBMISSION: {
      try {
        const res = yield call(requestGetSubmissionById, action.payload);
        const submission = res.data;
        if (submission === 'OK') {
          yield put(storeSubMissionIsEmpty(true));

          break;
        }
        yield put(storeCurrentSubmission(submission));
        yield put(storeSubMissionIsEmpty(false));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case UPDATE_SUBMISSION: {
      try {
        const { submissionId, feedback, gradedScore } = action.payload;
        const res = yield call(requestUpdateSubmission, submissionId, feedback, gradedScore);
        if (res.status === 204) {
          yield fork(asyncHandleSubmission, asyncRequest_T_submission(submissionId));
          yield put(storeSubmissionStatus({ success: true, error: '' }));
        }
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case REQUEST_S_SUBMISSION: {
      try {
        const assignmentId = action.payload;
        const multiSubmissionRes = yield call(requestGetMultiSubmission, assignmentId);
        const multiSubmissions = multiSubmissionRes.data;
        if (multiSubmissions.length === 0) {
          yield put(storeSubMissionIsEmpty(true));
          break;
        }
        yield put(storeMultiSubMission(multiSubmissions));
        yield put(storeCurrentSubmission(multiSubmissions[0]));
        yield put(storeSubMissionNum(multiSubmissions.length));
        yield put(storeSubMissionIsEmpty(false));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case CREATE_S_SUBMISSION: {
      try {
        const submissionFormData = action.payload;
        const { assignmentId, pdfFile, commentSubmit } = submissionFormData;
        const accountEmail = yield select(selectUserEmail);
        const accountName = yield select(selectAccountName);
        let formData = new FormData();
        formData.append('assignmentId', assignmentId);
        formData.append('submittedByName', accountName);
        formData.append('pdf', pdfFile);
        formData.append('comment', commentSubmit);
        formData.append('submittedByEmail', accountEmail);
        const createSubmissionRes = yield call(axiosCreate_S_submission, formData);
        if (createSubmissionRes.status === 201) {
          yield fork(asyncHandleSubmission, asyncRequest_S_submission(assignmentId));
          yield put(storeSubmissionStatus({ success: true, error: '' }));
        }
      } catch (err) {
        yield put(storeSubmissionStatus({ success: false, error: err.response.data }));
      }
      break;
    }
    case ASYNC_REQUEST_SUBMISSION_LIST: {
      try {
        const { assignmentId } = action.payload;
        const config = yield select(selectSubmissionListConfig);
        const submissionListRes = yield call(requestGetSubmissionList, assignmentId, config);
        yield put(storeSubmissionList(submissionListRes.data.allSubmissions));
        let updatedConfig = {
          ...config,
          pagination: { ...config.pagination, ...submissionListRes.data.pagination },
        };
        updatedConfig.pagination.total = updatedConfig.pagination.totalCount;
        delete updatedConfig.pagination['totalCount'];
        updatedConfig.pagination.current = updatedConfig.pagination.pageNum;
        delete updatedConfig.pagination['pageNum'];
        yield put(storeSubmissionTableConfig(updatedConfig));
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case ASYNC_ALLOCATE_SUBMISSION: {
      try {
        const { allocatedDetails } = action.payload;
        const assignmentId = yield select(selectAssignmentId);
        const res = yield call(requestAllocateSubmission, assignmentId, allocatedDetails);
        yield fork(asyncHandleSubmission, {
          type: ASYNC_REQUEST_SUBMISSION_LIST,
          payload: { assignmentId: assignmentId },
        });
      } catch (err) {
        console.log(err);
      }
      break;
    }
    default: {
      return;
    }
  }
}
