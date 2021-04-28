import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import TeacherCourseIntroduction from '../../components/CourseIntroduction/TeacherCourseIntroduction';
import AllocateStatus from '../../components/AllocationStatus/AllocateStatus';
import RegradeRequest from '../../components/RegradeRequest/RegradeRequest';
import PublishStatus from '../../components/PublishStatus/PublishStatus';
import ExtensionRequest from '../../components/ExtensionRequest/ExtensionRequest';
import TeacherOngoingAssignment from '../../components/TeacherDashboardOngoingAssignment/TeacherOngoingAssignment';

import './T_DashboardLayout.scss';

import { State } from '../../types/state';
import { connect } from 'react-redux';

const mapStateToProps = (state: State) => ({
  courseId: state.course._id,
});

const T_DashboardLayout: React.FC<any> = (props) => {
  return (
    <div className="t-dashboard-layout">
      <Row gutter={[24, 24]} align="top">
        <Col className="gutter-row m-col-min-width" xs={24} sm={24} md={24} lg={24} xl={16}>
          <TeacherCourseIntroduction />
        </Col>
        <Col className="gutter-row sm-col-min-width" xs={12} sm={12} md={12} lg={12} xl={8}>
          <AllocateStatus />
        </Col>
        <Col className="gutter-row sm-col-min-width" xs={12} sm={12} md={12} lg={12} xl={8}>
          <PublishStatus />
        </Col>
        <Col className="gutter-row sm-col-min-width" xs={12} sm={12} md={12} lg={12} xl={8}>
          <ExtensionRequest />
        </Col>
        <Col className="gutter-row sm-col-min-width" xs={12} sm={12} md={12} lg={12} xl={8}>
          <RegradeRequest />
        </Col>
        <Col className="gutter-row m-col-min-width" xs={24} sm={24} md={24} lg={24} xl={24}>
          <TeacherOngoingAssignment />
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(T_DashboardLayout);
