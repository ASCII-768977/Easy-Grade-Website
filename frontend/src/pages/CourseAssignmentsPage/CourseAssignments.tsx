import React from 'react';
import './CourseAssignments.scss';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { useRouteMatch } from 'react-router-dom';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import CreateAssignment from '../../components/AssignmentCreate/CreateAssignment';
import FinishedAssignment from '../../components/AssignmentCreate/FinishedAssignment';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  courseCode: state.course.courseCode,
});

const CourseAssignments: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const { courseCode } = props;

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Assignments', path: url },
  ];

  return (
    <Layout breadNavs={breadNavs}>
      <div className="assignment-wrapper">
        <CreateAssignment />
        <FinishedAssignment />
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps)(CourseAssignments);
