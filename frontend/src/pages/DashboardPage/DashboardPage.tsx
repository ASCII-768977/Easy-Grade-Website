import React from 'react';
import './DashboardPage.scss';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { useRouteMatch } from 'react-router-dom';
import SDashboardLayout from '../S_DashboardLayout/S_DashboardLayout';
import TDashboardLayout from '../T_DashboardLayout/T_DashboardLayout';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  courseCode: state.course.courseCode,
});

const DashboardPage: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const { role, courseCode } = props;

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Dashboard', path: url },
  ];

  return <Layout breadNavs={breadNavs}>{role === 'teacher' ? <TDashboardLayout /> : <SDashboardLayout />}</Layout>;
};

export default connect(mapStateToProps)(DashboardPage);
