import { Row, Col } from 'antd';
import React from 'react';
import './TeacherAssignmentCard.scss';
import { AssignmentStatisticProps } from '../../types';
import SingleStatus from './SingleStatus';
import { Link, useRouteMatch } from 'react-router-dom';
import { getAssiUrl } from '../../assets/utils/courseUrl';

const TeacherAssignmentCard: React.FC<AssignmentStatisticProps> = (props: any) => {
  const { assignmentStatistic, assNum } = props;
  const { url } = useRouteMatch();
  const assignmentTitle = assignmentStatistic.assignmentName;

  let isAllSubmitted: Boolean = false;
  let isDue: Boolean = false;
  let isAllAllocated: Boolean = false;
  let isAllGraded: Boolean = false;

  const allocatedAssignments = assignmentStatistic.allocatedNum;
  const gradedAssignments = assignmentStatistic.gradedNum;
  const submittedAssignments = assignmentStatistic.submittedNum;
  const allAssignments = assignmentStatistic.totalNum;
  const submittedPercentage = Math.floor((submittedAssignments / allAssignments) * 100);
  const allocatedPercentage = Math.floor((allocatedAssignments / submittedAssignments) * 100);
  const gradedPercentage = Math.floor((gradedAssignments / submittedAssignments) * 100);

  const releaseDate = new Date(+assignmentStatistic.releaseDate);
  const dueDate = new Date(+assignmentStatistic.dueDate);
  const now = new Date();
  const totalTime = dueDate.getTime() - releaseDate.getTime();
  const pastTime = now.getTime() - releaseDate.getTime();
  const timePercentage = Math.floor((pastTime / totalTime) * 100);

  allocatedAssignments === submittedAssignments ? (isAllAllocated = true) : (isAllAllocated = false);
  gradedAssignments === submittedAssignments ? (isAllGraded = true) : (isAllGraded = false);
  submittedAssignments === allAssignments ? (isAllSubmitted = true) : (isAllSubmitted = false);
  now.getTime() === dueDate.getTime()
    ? (isDue = true)
    : now.getTime() > dueDate.getTime()
    ? (isDue = true)
    : (isDue = false);

  return (
    <div className="t-ongoing-assignment__card">
      <Row className="title">
        <Link to={getAssiUrl(url) + '/' + assignmentStatistic.assignmentId}>
          <h2 className="hover-color">
            Assignment {assNum + 1}: {assignmentTitle}
          </h2>
        </Link>
      </Row>

      <Row className="published-row" gutter={{ md: 10, lg: 20, xl: 30, xxl: 40 }}>
        <Col span={6}>
          {isDue ? (
            <SingleStatus status="finished" />
          ) : isAllSubmitted ? (
            <SingleStatus status="finished" />
          ) : (
            <SingleStatus
              status="assignmentProgress"
              percentage={submittedPercentage}
              currentNum={submittedAssignments}
              totalNum={allAssignments}
            />
          )}
        </Col>

        <Col span={6}>
          {isDue ? (
            <SingleStatus status="finished" />
          ) : (
            <SingleStatus status="timeProgress" percentage={timePercentage} dueDate={dueDate} />
          )}
        </Col>

        <Col span={6}>
          {isAllAllocated && isDue ? (
            <SingleStatus status="finished" />
          ) : isDue ? (
            <SingleStatus
              status="assignmentProgress"
              percentage={allocatedPercentage}
              currentNum={allocatedAssignments}
              totalNum={submittedAssignments}
            />
          ) : (
            <SingleStatus status="waiting" />
          )}
        </Col>

        <Col span={6}>
          {isAllGraded && isDue ? (
            <SingleStatus status="finished" />
          ) : isDue ? (
            <SingleStatus
              status="assignmentProgress"
              percentage={gradedPercentage}
              currentNum={gradedAssignments}
              totalNum={submittedAssignments}
            />
          ) : (
            <SingleStatus status="waiting" />
          )}
        </Col>
      </Row>

      <Row gutter={{ md: 10, lg: 20, xl: 30, xxl: 40 }}>
        <Col className="flex justify-center" span={6}>
          <p className="bottom-tag">Submitted</p>
        </Col>
        <Col className="flex justify-center" span={6}>
          <p className="bottom-tag">Due</p>
        </Col>
        <Col className="flex justify-center" span={6}>
          <p className="bottom-tag">Allocated</p>
        </Col>
        <Col className="flex justify-center" span={6}>
          <p className="bottom-tag">Graded</p>
        </Col>
      </Row>
    </div>
  );
};

export default TeacherAssignmentCard;
