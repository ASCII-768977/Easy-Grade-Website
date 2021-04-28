import React, { useEffect } from 'react';
import './CourseAssignmentsPage.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import AssignmentPage from '../AssignmentPage/AssignmentPage';
import S_SubmissionPage from '../SubmissionPage/S_SubmissionPage';
import { asyncRequest_S_submission } from '../../store/actions/submission';
import T_SubmissionPage from '../SubmissionPage/T_SubmissionPage';

const mapStateToProps = (state: State) => ({
  courseCode: state.course.courseCode,
  role: state.user.role,
});

const CourseAssignmentsPage: React.FC<any> = (props: any) => {
  const { role } = props;
  const { url, params } = useRouteMatch();
  // @ts-ignore
  const assignmentId = params.assignmentId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (role === 'student' && assignmentId) {
      dispatch(asyncRequest_S_submission(assignmentId));
    }
  }, [dispatch, assignmentId]);
  return (
    <Switch>
      <Route path={`${url}/submission/:submissionId`} component={T_SubmissionPage} />
      <Route path={`${url}/student/submission`} component={S_SubmissionPage} />
      <Route path={`${url}`} component={AssignmentPage} />
      <Redirect to={url} />
    </Switch>
  );
};

export default connect(mapStateToProps)(CourseAssignmentsPage);
