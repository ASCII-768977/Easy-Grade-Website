import React, { useEffect } from 'react';
import './AssignmentPage.scss';
import { connect, useDispatch } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { Link, useRouteMatch } from 'react-router-dom';
import { getAssiUrl, getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { Button, Tabs } from 'antd';
import AssignmentAllocate from '../../components/AssignmentAllocate/AssignmentAllocate';
import AssignmentStatistics from '../../components/AssignmentStatistics/AssignmentStatistics';
import AssignmentStatus from '../../components/AssignmentStatus/AssignmentStatus';
import AssignmentDescription from '../../components/AssignmentDescription/AssignmentDescription';
import { storeCurrentAssignment } from '../../store/actions/actionCreator';
import Divider from 'antd/es/divider';
import moment from 'moment-timezone';

const { TabPane } = Tabs;

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  courseCode: state.course.courseCode,
  assignment: state.assignment,
  assignmentList: state.assignmentList,
});

const AssignmentPage: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const { courseCode, assignmentList, assignment, role } = props;
  const { totalScore, assignmentName } = assignment;
  const dispatch = useDispatch();
  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Assignments', path: getAssiUrl(url) },
    { title: assignment.assignmentName, path: url },
  ];

  useEffect(() => {
    const assignmentId = url.split('/')[4];
    dispatch(storeCurrentAssignment(assignmentList[assignmentId]));
  }, [assignmentList, dispatch, url]);

  return (
    <>
      <Layout breadNavs={breadNavs}>
        {role === 'teacher' && (
          <div className="assignment-page">
            <div className="assignment-page__status">
              <AssignmentStatus />
            </div>
            <div className="assignment-page__tabs">
              <Tabs type="card">
                <TabPane className="assignment-page__allocate" tab="Allocate" key="1">
                  <AssignmentAllocate />
                </TabPane>
                <TabPane className="assignment-page__statistics" tab="Statistics" key="2">
                  <AssignmentStatistics />
                </TabPane>
                <TabPane className="assignment-page__descriptions" tab="Description" key="3">
                  <AssignmentDescription />
                </TabPane>
              </Tabs>
            </div>
          </div>
        )}
        {role === 'student' && (
          <div className="assignment-page assignment-page-s">
            <h2>{typeof assignmentName === 'string' ? assignmentName : ''}</h2>
            <div className="assignment-desc">
              <Divider />
              <p>
                <span className="assignment-desc__title">Points: </span>
                <span>{typeof totalScore === 'number' && totalScore.toFixed(1)}</span>
              </p>
              <p>
                <span className="assignment-desc__title">Due Date: </span>
                <span>{moment().format('lll')}</span>
              </p>
              <Divider />
              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: assignment.assignmentDesc }} />
              <Link to={`${url}/student/submission`}>
                <Button type="primary">All submissions</Button>
              </Link>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default connect(mapStateToProps)(AssignmentPage);
