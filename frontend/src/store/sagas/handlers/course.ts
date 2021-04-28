import { call, put } from 'redux-saga/effects';

import {
  ASYNC_ADD_COURSE,
  ASYNC_CREATE_COURSE,
  ASYNC_REQUEST_COURSE,
  ASYNC_REQUEST_COURSELIST,
  ASYNC_UPDATE_COURSEDETAILS,
  ASYNC_REQUEST_ROSTER_LIST,
  ASYNC_REQUEST_TEACHER_LIST,
} from '../actions/asyncActionTypes';
import {
  asyncRequestCourse,
  asyncRequestCourseList,
  asyncCreateCourse,
  asyncUpdateCourseDetails,
  asyncAddCourse,
  asyncRequestRosterList,
} from '../requests/courseList';

import { Action } from '../../../types';
import {
  storeCurrentCourse,
  storeCourse,
  updateCourseList,
  storeRosterList,
  storeTeacherList,
  storeRosterTableConfig,
} from '../../actions/actionCreator';

export function* asyncHandleCourse(action: Action): any {
  switch (action.type) {
    case ASYNC_CREATE_COURSE: {
      try {
        const courseRes = yield call(asyncCreateCourse, action.payload);
        const courseList = courseRes.data;
        yield put(updateCourseList(courseList));
      } catch (error) {
        console.log(error);
      }
      break;
    }

    case ASYNC_REQUEST_COURSELIST: {
      try {
        const courseListRes = yield call(asyncRequestCourseList);
        const courseList = courseListRes.data;
        yield put(storeCourse(courseList));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_REQUEST_COURSE: {
      try {
        const courseRes = yield call(asyncRequestCourse, action.payload);
        yield put(storeCurrentCourse(courseRes.data));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_UPDATE_COURSEDETAILS: {
      try {
        yield call(asyncUpdateCourseDetails, action.payload.course, action.payload.courseIdFromUrl);
        const updatedCourse = { ...action.payload.course };
        yield put(storeCurrentCourse(updatedCourse));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_ADD_COURSE: {
      try {
        yield call(asyncAddCourse, action.payload);
        const courseListRes = yield call(asyncRequestCourseList);
        const courseList = courseListRes.data;
        yield put(storeCourse(courseList));
      } catch (error) {
        console.log(error);
      }
      break;
    }
    case ASYNC_REQUEST_ROSTER_LIST: {
      try {
        const rosterListRes = yield call(asyncRequestRosterList, action.payload.courseId, action.payload.config);
        yield put(storeRosterList(rosterListRes.data.allRosters));

        let config = {
          ...action.payload.config,
          pagination: { ...action.payload.config.pagination, ...rosterListRes.data.pagination },
        };
        config.pagination.total = config.pagination.totalCount;
        delete config.pagination['totalCount'];
        config.pagination.current = config.pagination.pageNum;
        delete config.pagination['pageNum'];

        yield put(storeRosterTableConfig(config));
      } catch (err) {
        yield put(storeRosterList([]));
        console.log(err);
      }
      break;
    }
    case ASYNC_REQUEST_TEACHER_LIST: {
      try {
        const rosterListRes = yield call(asyncRequestRosterList, action.payload.courseId, action.payload.config);
        yield put(storeTeacherList(rosterListRes.data.allRosters));
      } catch (err) {
        yield put(storeTeacherList([]));
        console.log(err);
      }
      break;
    }
    default:
      return;
  }
}
