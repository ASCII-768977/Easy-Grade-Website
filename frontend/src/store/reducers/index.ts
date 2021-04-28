import { combineReducers } from 'redux';

import todo from './todo';
import layout from './layout';
import courseList from './courseList';
import roster from './roster';
import assSample from './assSample';
import account from './account';
import submission from './submission';
import assignment from './assignment';
import assignmentList from './assignmentList';
import assignmentStatistic from './assignmentStatistic';
import submissionList from './submissionList';
import teacherList from './teacherList';
import course from './course';
const reducers = combineReducers({
  todo,
  layout,
  courseList,
  course,
  roster,
  assSample,
  user: account,
  submission,
  submissionList,
  teacherList,
  assignment,
  assignmentList,
  assignmentStatistic,
});

export default reducers;
