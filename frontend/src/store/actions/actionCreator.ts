import * as actions from './actionTypes';
import { Action, todo, todoList } from '../../types';
import { Course, ResponseCourseList, AssSample } from '../../types';

// ------------------------------- User -----------------------------------------
export const storeIsAuthenticated = (isAuthenticated: boolean): Action<boolean> => ({
  type: actions.STORE_IS_AUTHENTICATED,
  payload: isAuthenticated,
});

// ------------------------------- Layout ----------------------------------------
export const storeNavCollapsed = (navCollapsed: boolean): Action<boolean> => ({
  type: actions.STORE_NAV_COLLAPSED,
  payload: navCollapsed,
});

// ------------------------------- demo -----------------------------------------
export const storeTodoList = (todoListData: todoList): Action<todoList> => ({
  type: actions.STORE_TODO_LIST,
  payload: todoListData,
});

export const storePageTodoList = (todoListData: todoList): Action<todoList> => ({
  type: actions.STORE_PAGE_TODO_LIST,
  payload: todoListData,
});

export const clearTodoList = (): Action => ({
  type: actions.CLEAR_TODO_LIST,
});

export const storeTodoListLength = (listLength: number): Action<number> => ({
  type: actions.STORE_TODO_LIST_LENGTH,
  payload: listLength,
});

export const clearOneTodo = (): Action => ({
  type: actions.CLEAR_ONE_TODO,
});

export const storeOneTodo = (todo: todo): Action<todo> => ({
  type: actions.STORE_ONE_TODO,
  payload: todo,
});

export const storeDefaultTodo = (todo: todo): Action<todo> => ({
  type: actions.STORE_DEFAULT_TODO,
  payload: todo,
});
// ------------------------------- CourseList -----------------------------------------
export const storeCourse = (courseList: ResponseCourseList): Action<ResponseCourseList> => ({
  type: actions.STORE_COURSE_LIST,
  payload: courseList,
});

export const updateCourseList = (course: Course) => ({
  type: actions.UPDATE_COURSE_LIST,
  payload: course,
});
// ------------------------------- GetRosterList -----------------------------------------
export const storeRosterList = (rosterList: any) => ({
  type: actions.STORE_ROSTER_LIST,
  payload: rosterList,
});
export const storeRosterTableConfig = (updated: any) => ({
  type: actions.STORE_ROSTER_TABLE_CONFIG,
  payload: updated,
});
// ------------------------------- GetCourse -----------------------------------------
export const storeCurrentCourse = (course: any) => ({
  type: actions.STORE_CURRENT_COURSE,
  payload: course,
});
// ------------------------------- GetAssignment -----------------------------------------
export const storeCurrentAssignment = (assignment: any) => ({
  type: actions.STORE_CURRENT_ASSIGNMENT,
  payload: assignment,
});
export const storeAssignmentList = (assignmentList: any) => ({
  type: actions.STORE_ASSIGNMENT_LIST,
  payload: assignmentList,
});
export const storeAssignmentStatistic = (statistic: any) => ({
  type: actions.STORE_ASSIGNMENT_STATISTIC,
  payload: statistic,
});
// ------------------------------- UpdateAllocatedStatus/Sample -----------------------------------------
export const getAllocatedStatus = () => ({
  type: actions.GET_ALLOCATED_STATUS,
});
export const updateAllocatedStatus = (assSample: AssSample[]) => ({
  type: actions.UPDATE_ALLOCATED_STATUS,
  payload: assSample,
});
export const updateAllocatedValue = (value: any) => ({
  type: actions.UPDATE_ALLOCATED_VALUE,
  payload: value,
});
// ------------------------------- GetSubmissionTable -----------------------------------------
export const storeSubmissionTableConfig = (config: any) => ({
  type: actions.STORE_SUBMISSION_TABLE_CONFIG,
  payload: config,
});
export const storeSubmissionList = (data: any) => ({
  type: actions.STORE_SUBMISSION_LIST,
  payload: data,
});

export const storeTeacherList = (teacherList: any) => ({
  type: actions.STORE_TEACHER_LIST,
  payload: teacherList,
});
