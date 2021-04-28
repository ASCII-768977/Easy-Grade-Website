import React from 'react';
import './AssignmentStatistics.scss';
import { Row, Col, Divider } from 'antd';
import AssignmentStatisticsTable1 from './AssignmentStatisticsTable1';
import AssignmentStatisticsTable2 from './AssignmentStatisticsTable2';

const AssignmentStatistics: React.FC<any> = () => {
  return (
    <div className="assignmentStatistics-tab">
      <Row justify="space-between" gutter={[24, 24]} align="top">
        <Col className="gutter-row m-col-min-width">
          <h2>Assignment Statistics</h2>
        </Col>
        <Col className="gutter-row sm-col-min-width">
          <h2>Score/100.00</h2>
        </Col>
      </Row>

      <Divider />

      <Col className="gutter-row m-col-min-width">
        <AssignmentStatisticsTable1 />
      </Col>

      <Col className="gutter-row m-col-min-width">
        <h2>Scores Trend for student numbers</h2>
      </Col>

      <Divider />

      <Col className="gutter-row m-col-min-width">
        <AssignmentStatisticsTable2 />
      </Col>
    </div>
  );
};

export default AssignmentStatistics;
