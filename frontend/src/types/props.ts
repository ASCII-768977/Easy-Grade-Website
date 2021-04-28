import { todo, todoList } from './data';
import React from 'react';

import { BreadNavs, NavLink, Role } from './common';
import { AssSample, Course, ResponseCourseList } from './course';
import { Assignment, AssignmentList, AssignmentStatistic } from './assignment';

export interface demoPageProps {
  todoList: todoList;
  pageTodoList: todoList;
  todoListLength: number;
  oneTodo: todo;
  defaultQueryId: number;
  defaultTodo: todo;
}

export interface RouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  isAuthenticated: boolean;
  path: string;
  to?: string;
}

export interface MainNavProps {
  collapsed: boolean;
  title: string;
  description: string;
  navLinks: Array<NavLink>;
}

export interface LayoutProps {
  collapsed: boolean;
  breadNavs: BreadNavs;
  children?: any;
}

export interface PopUpWindowProps {
  title: string;
  isModalVisible: boolean;
  setIsModalVisible: Function;
  modalIcon: any;
  children?: any;
  customOncancel?: any;
}

export interface CourseDetailsProps {
  courseList: ResponseCourseList;
  handleCancel: Function;
  role: string;
  createdBy: string;
  isCreateCourse: boolean;
}

export interface AllocatingAssDetailsProps {
  handleCancel: Function;
  assSample: AssSample;
  assignmentStatistic: any;
  teacherList: Array<any>;
  assignmentId: any;
}
export interface CourseWrapperProps {
  courseList: ResponseCourseList;
  role: string;
  children?: any;
}

export interface CollapseWindowProps {
  courseList: ResponseCourseList;
  role: string;
}

export interface CreatCourseUIProps {
  role: string;
}

export interface CreateAssignmentDetailsProps {
  handleCancel: Function;
}

export interface StudentOngoingAssignmentItemProps {}

export interface AssignmentProps {
  assignment: Assignment;
  isCreated?: Boolean;
}

export interface AssignmentStatisticProps {
  assignmentStatistic: AssignmentStatistic;
  assNum?: any;
}

export interface AssignmentListProps {
  assignmentList: AssignmentList;
  children?: any;
}

export interface CreateAnnouncementDetailsProps {
  handleCancel: Function;
  accountEmail: string;
  courseName: any;
  courseCode: any;
  course: Course;
  createdBy: string;
}

export interface SingleStatusProps {
  status: string;
  dueDate?: object;
  percentage?: number;
  currentNum?: number;
  totalNum?: number;
  title?: string;
}
