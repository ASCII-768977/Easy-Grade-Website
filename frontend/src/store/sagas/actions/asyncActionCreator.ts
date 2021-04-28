import * as actions from './asyncActionTypes';
import { Action } from '../../../types';
import { Course } from '../../../types';
import { Account } from '../../../types';
import { Assignment } from '../../../types';

export const asyncRequestTodoList = (): Action => ({
  type: actions.REQUEST_TODO_LIST,
});

export const asyncRequestOneTodo = (todoId: number): Action<number> => ({
  type: actions.REQUEST_ONE_TODO,
  payload: todoId,
});

export const asyncRequestDefaultTodo = (): Action => ({
  type: actions.REQUEST_DEFAULT_TODO,
});

export const asyncRequestCourseList = (): Action => ({
  type: actions.ASYNC_REQUEST_COURSELIST,
});

export const asyncCreateCourse = (course: Course): Action<Course> => ({
  type: actions.ASYNC_CREATE_COURSE,
  payload: course,
});

export const asyncAddCourse = (enrollInfo: any): Action => ({
  type: actions.ASYNC_ADD_COURSE,
  payload: enrollInfo,
});

export const asyncRequestRosterList = (courseId: string, config: any): Action => ({
  type: actions.ASYNC_REQUEST_ROSTER_LIST,
  payload: { courseId, config },
});

export const asyncUpdateCourseDetails = (course: Course, courseIdFromUrl: string): Action => ({
  type: actions.ASYNC_UPDATE_COURSEDETAILS,
  payload: { course, courseIdFromUrl },
});

export const asyncRequestCourse = (courseId: string): Action => ({
  type: actions.ASYNC_REQUEST_COURSE,
  payload: courseId,
});

export const asyncUpdateAccount = (user: Account, _id: string): Action => ({
  type: actions.ASYNC_UPDATE_ACCOUNT,
  payload: { user, _id },
});

export const asyncCreateAssignment = (assignment: Assignment): Action<Assignment> => ({
  type: actions.ASYNC_CREATE_ASSIGNMENT,
  payload: assignment,
});

export const asyncRequestAssignment = (assignmentId: String): Action => ({
  type: actions.ASYNC_REQUEST_ASSIGNMENT,
  payload: assignmentId,
});

export const asyncRequestAssignmentList = (courseId: String): Action => ({
  type: actions.ASYNC_REQUEST_ASSIGNMENTLIST,
  payload: courseId,
});

export const asyncRequestAssignmentStatistic = (courseId: String): Action => ({
  type: actions.ASYNC_REQUEST_ASSIGNMENTSTATISTIC,
  payload: courseId,
});

export const asyncCreateAnnouncement = (course: any): Action => ({
  type: actions.ASYNC_CREATE_COURSE,
  payload: { course },
});

export const asyncRequestSubmissionList = (assignmentId: string, config: any): Action => ({
  type: actions.ASYNC_REQUEST_SUBMISSION_LIST,
  payload: { assignmentId, config },
});

export const asyncAllocateSubmssion = (allocatedDetails: Array<any>): Action => ({
  type: actions.ASYNC_ALLOCATE_SUBMISSION,
  payload: { allocatedDetails },
});
export const asyncRequestTeacherList = (courseId: string, config: any): Action => ({
  type: actions.ASYNC_REQUEST_TEACHER_LIST,
  payload: { courseId, config },
});
export const asyncUpdateAssignmentDesc = (assignment: Assignment): Action => ({
  type: actions.ASYNC_UPDATE_ASSIGNMENTDESC,
  payload: assignment,
});
