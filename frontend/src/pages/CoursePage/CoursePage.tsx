import React, { useEffect } from 'react';
import './CoursePage.scss';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import {
  BarsOutlined,
  FieldTimeOutlined,
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import MainNav from '../../components/MainNav/MainNav';
import RosterPage from '../RosterPage/RosterPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import CourseAssignmentsPage from '../CourseAssignmentsPage/CourseAssignmentsPage';
import ExtensionPage from '../ExtensionPage/ExtensionPage';
import CourseSettingPage from '../CourseSettingPage/CourseSettingPage';
import AnnouncementPage from '../AnnouncementPage/AnnouncementPage';
import { State } from '../../types/state';
import { connect, useDispatch } from 'react-redux';
import { Role, NavLinks, Course } from '../../types';
import {
  asyncRequestCourse,
  asyncRequestAssignmentList,
  asyncRequestAssignmentStatistic,
} from '../../store/sagas/actions/asyncActionCreator';
import CourseAssignments from '../CourseAssignmentsPage/CourseAssignments';

const T_NavLinks: NavLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <BarsOutlined />,
  },
  {
    title: 'Announcement',
    path: '/announcement',
    icon: <ProfileOutlined />,
  },
  {
    title: 'Assignments',
    path: '/assignment',
    icon: <FileTextOutlined />,
  },
  {
    title: 'Rosters',
    path: '/roster',
    icon: <TeamOutlined />,
  },
  {
    title: 'Course Setting',
    path: '/setting',
    icon: <SettingOutlined />,
  },
];

const S_NavLinks: NavLinks = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <BarsOutlined />,
  },
  {
    title: 'Assignments',
    path: '/assignment',
    icon: <FileTextOutlined />,
  },
  {
    title: 'Coming Dues',
    path: '/due',
    icon: <FieldTimeOutlined />,
  },
];

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  course: state.course,
});

const CoursePage: React.FC<{ role: Role; course: Course }> = (props) => {
  const { url } = useRouteMatch();
  const { role } = props;
  const { _id, courseCode, courseName } = props.course;
  const dispatch = useDispatch();
  const courseId = url.split('/')[2];

  useEffect(() => {
    if (!_id) dispatch(asyncRequestCourse(courseId));
    dispatch(asyncRequestAssignmentList(courseId));
    dispatch(asyncRequestAssignmentStatistic(courseId));
  }, [dispatch, courseId, _id]);

  return (
    <div className="course-page">
      <MainNav title={courseCode} description={courseName} navLinks={role === 'teacher' ? T_NavLinks : S_NavLinks} />
      <Switch>
        <Route exact path={`${url}/dashboard`} component={DashboardPage} />
        <Route exact path={`${url}/assignment`} component={CourseAssignments} />
        <Route path={`${url}/assignment/:assignmentId`} component={CourseAssignmentsPage} />
        <Route exact path={`${url}/roster`} component={RosterPage} />
        <Route exact path={`${url}/extension`} component={ExtensionPage} />
        <Route exact path={`${url}/setting`} component={CourseSettingPage} />
        <Route exact path={`${url}/announcement`} component={AnnouncementPage} />
        <Redirect path={`${url}`} to={`${url}/dashboard`} />
      </Switch>
    </div>
  );
};

export default connect(mapStateToProps)(CoursePage);
