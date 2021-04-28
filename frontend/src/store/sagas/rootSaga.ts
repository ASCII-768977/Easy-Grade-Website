import { takeLatest } from 'redux-saga/effects';
import * as actions from './actions/asyncActionTypes';

import { asyncHandleTodo } from './handlers/todo';
import { asyncHandleAssignment } from './handlers/assignment';
import { asyncHandleCourse } from './handlers/course';
import { asyncHandleAccount } from './handlers/account';
import {
  CREATE_S_SUBMISSION,
  REQUEST_S_SUBMISSION,
  REQUEST_T_SUBMISSION,
  UPDATE_SUBMISSION,
} from '../actions/submission';
import { asyncHandleSubmission } from './handlers/submission';
import { REQUEST_GOOGLE_USER_LOGIN, REQUEST_USER_LOGIN, REQUEST_USER_SIGNUP } from '../actions/account';

export function* watcherSaga() {
  yield takeLatest(actions.REQUEST_TODO_LIST, asyncHandleTodo);
  yield takeLatest(actions.REQUEST_ONE_TODO, asyncHandleTodo);
  yield takeLatest(actions.REQUEST_DEFAULT_TODO, asyncHandleTodo);
  yield takeLatest(actions.ASYNC_CREATE_COURSE, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_REQUEST_ROSTER_LIST, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_REQUEST_COURSELIST, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_UPDATE_COURSEDETAILS, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_CREATE_ASSIGNMENT, asyncHandleAssignment);
  yield takeLatest(actions.ASYNC_UPDATE_ASSIGNMENTDESC, asyncHandleAssignment);
  yield takeLatest(actions.ASYNC_REQUEST_COURSELIST, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_UPDATE_COURSEDETAILS, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_REQUEST_COURSE, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_UPDATE_ACCOUNT, asyncHandleAccount);
  yield takeLatest(REQUEST_S_SUBMISSION, asyncHandleSubmission);
  yield takeLatest(REQUEST_T_SUBMISSION, asyncHandleSubmission);
  yield takeLatest(CREATE_S_SUBMISSION, asyncHandleSubmission);
  yield takeLatest(UPDATE_SUBMISSION, asyncHandleSubmission);

  yield takeLatest(REQUEST_USER_LOGIN, asyncHandleAccount);
  yield takeLatest(REQUEST_GOOGLE_USER_LOGIN, asyncHandleAccount);
  yield takeLatest(REQUEST_USER_SIGNUP, asyncHandleAccount);

  yield takeLatest(actions.ASYNC_REQUEST_ASSIGNMENT, asyncHandleAssignment);
  yield takeLatest(actions.ASYNC_REQUEST_ASSIGNMENTLIST, asyncHandleAssignment);
  yield takeLatest(actions.ASYNC_REQUEST_ASSIGNMENTSTATISTIC, asyncHandleAssignment);
  yield takeLatest(actions.ASYNC_ADD_COURSE, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_CREATE_ANNOUNCEMENT, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_REQUEST_SUBMISSION_LIST, asyncHandleSubmission);
  yield takeLatest(actions.ASYNC_REQUEST_TEACHER_LIST, asyncHandleCourse);
  yield takeLatest(actions.ASYNC_ALLOCATE_SUBMISSION, asyncHandleSubmission);
}
