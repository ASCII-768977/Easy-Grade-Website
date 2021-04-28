import React from 'react';
import { Row, Col } from 'antd';
import OngoingAssignmentList from '../../components/OngoingAssignmentList/OngoingAssignmentList';
import RequestStatus from '../../components/RequestStatus/RequestStatus';
import Announcement from '../../components/Announcement/Announcement';
import StudentCourseIntroduction from '../../components/CourseIntroduction/StudentCourseIntroduction';
import './S_DashboardLayout.scss';

const S_DashboardLayout: React.FC = () => {
  return (
    <div className="s-dashboard-layout">
      <Row gutter={[24, 24]} align="top">
        <Col className="gutter-row main-col" flex="3 1 600px">
          <StudentCourseIntroduction />
          <Announcement />
        </Col>
        <Col className="gutter-row aside-col" flex="1 0 250px">
          <RequestStatus />
          <OngoingAssignmentList />
        </Col>
      </Row>
    </div>
  );
};

export default S_DashboardLayout;
