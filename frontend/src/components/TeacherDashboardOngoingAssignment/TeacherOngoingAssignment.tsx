import './TeacherOngoingAssignment.scss';
import React from 'react';
import { Row, Col } from 'antd';
import { State } from '../../types/state';
import { Button } from 'antd';
import TeacherAssignmentCard from './TeacherAssignmentCard';
import { Link, useRouteMatch } from 'react-router-dom';
import { getCoursePageUrl } from '../../assets/utils/courseUrl';
import { connect } from 'react-redux';
import { AssignmentListProps } from '../../types';

const mapStateToProps = (state: State) => ({
  assignmentList: state.assignmentList,
  assignmentStatistic: state.assignmentStatistic,
});

const TeacherOngoingAssignment: React.FC<AssignmentListProps> = (props: any) => {
  const { url } = useRouteMatch();
  const { assignmentStatistic } = props;

  return (
    <div className="t-ongoing-assignment">
      <Row className="title">
        <Col>
          <h3>Ongoing Assignment</h3>
        </Col>
        <Col>
          <Link to={getCoursePageUrl(url) + '/assignment'}>
            <Button className="ant-btn--theme-gray" type="primary">
              Show All
            </Button>
          </Link>
        </Col>
      </Row>

      <Row gutter={[24, 24]} wrap={true}>
        {assignmentStatistic.map((assignment: any, key: any) => (
          <Col key={key} md={24} lg={24} xl={12}>
            <TeacherAssignmentCard assignmentStatistic={assignment} assNum={key} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(TeacherOngoingAssignment);
