import { todo, todoList } from './data';
import { Role } from './common';
import { Course, ResponseCourseList, AssSample } from './course';
import { Account } from './account';
import { Assignment, AssignmentList, AssignmentStatistic } from './assignment';
import { Submission } from './submission';
import { SubmissionStatus } from '../store/actions/submission';

export interface State {
  todo: {
    todoList: todoList;
    pageTodoList: todoList;
    todoListLength: number;
    oneTodo: todo;
    defaultQueryId: number;
    defaultTodo: todo;
  };
  user: Account;
  layout: {
    navCollapsed: boolean;
  };
  course: Course;
  submission: {
    isEmpty: boolean;
    currentSubmission: Submission;
    multiSubmission: Array<Submission>;
    submissionNum: number;
    submissionStatus: SubmissionStatus;
  };
  courseList: ResponseCourseList;

  assSample: AssSample;

  roster: {
    courseId: string;
    config: {
      pagination: {
        total: number;
        current: number;
        pageSize: number;
        showQuickJumper: boolean;
        showSizeChanger: boolean;
      };
      isLoading: boolean;
      filters: any;
      sorter: any;
    };
    data: Array<any>;
  };

  submissionList: {
    config: {
      pagination: {
        total: number;
        current: number;
        pageSize: number;
        showQuickJumper: boolean;
        showSizeChanger: boolean;
      };
      isLoading: boolean;
      filters: any;
      sorter: any;
    };
    data: Array<any>;
  };
  teacherList: {
    data: Array<any>;
  };
  assignment: Assignment;

  assignmentList: AssignmentList;

  assignmentStatistic: AssignmentStatistic;
}
