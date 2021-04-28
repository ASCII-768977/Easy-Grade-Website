import { call, put, fork, select } from 'redux-saga/effects';

import {
  asyncCreateAssignment,
  asyncRequestAssignmentList,
  asyncRequestAssignment,
  asyncRequestAssignmentStatistic,
  asyncUpdateAssignmentDesc,
} from '../requests/assignment';
import {
  ASYNC_CREATE_ASSIGNMENT,
  ASYNC_REQUEST_ASSIGNMENT,
  ASYNC_REQUEST_ASSIGNMENTLIST,
  ASYNC_REQUEST_ASSIGNMENTSTATISTIC,
  ASYNC_UPDATE_ASSIGNMENTDESC,
} from '../actions/asyncActionTypes';
import { storeAssignmentList, storeCurrentAssignment, storeAssignmentStatistic } from '../../actions/actionCreator';

import { Action } from '../../../types';
import { State } from '../../../types/state';

export function* asyncHandleAssignment(action: Action): any {
  switch (action.type) {
    case ASYNC_CREATE_ASSIGNMENT: {
      try {
        yield call(asyncCreateAssignment, action.payload);
        const courseId = yield select(selectCourseId);
        yield fork(asyncHandleAssignment, { type: ASYNC_REQUEST_ASSIGNMENTLIST, payload: courseId });
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_REQUEST_ASSIGNMENTLIST: {
      try {
        const assignmentListRes = yield call(asyncRequestAssignmentList, action.payload);
        const assignmentList = assignmentListRes.data.assignments;
        yield put(storeAssignmentList(assignmentList));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_REQUEST_ASSIGNMENT: {
      try {
        const assignmentRes = yield call(asyncRequestAssignment, action.payload);
        const assignment = assignmentRes.data;
        yield put(storeCurrentAssignment(assignment));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_REQUEST_ASSIGNMENTSTATISTIC: {
      try {
        const assignmentStatisticRES = yield call(asyncRequestAssignmentStatistic, action.payload);
        const statistic = assignmentStatisticRES.data;
        yield put(storeAssignmentStatistic(statistic));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_UPDATE_ASSIGNMENTDESC: {
      try {
        yield call(asyncUpdateAssignmentDesc, action.payload);
      } catch (error) {
        console.log(error);
      }
      break;
    }
    default:
      return;
  }
}

const selectCourseId = (state: State) => state.course._id;
