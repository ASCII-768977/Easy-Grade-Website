import React from 'react';
import { Row, Col, Progress } from 'antd';
import './AssignmentStatus.scss';
import { State } from '../../types/state';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';
import SingleStatus from './SingleStatus';

const mapStateToProps = (state: State) => ({
  assignmentStatistic: state.assignmentStatistic,
});

const AssignmentStatus: React.FC<any> = (props) => {
  const { url } = useRouteMatch();
  const assignmentIdFromUrl = url.split('/')[4];
  const { assignmentStatistic } = props;
  let currentAssignment: any = {};
  assignmentStatistic.forEach((assignment: any, key: any) => {
    if (assignment.assignmentId === assignmentIdFromUrl) {
      currentAssignment = assignment;
      return currentAssignment;
    }
  });
  const AssignmentTitle = currentAssignment.assignmentName;

  let isAllSubmitted: Boolean = false;
  let isDue: Boolean = false;
  let isAllAllocated: Boolean = false;
  let isAllGraded: Boolean = false;

  const allocatedAssignments = currentAssignment.allocatedNum;
  const gradedAssignments = currentAssignment.gradedNum;
  const submittedAssignments = currentAssignment.submittedNum;
  const allAssignments = currentAssignment.totalNum;

  const submittedPercentage = Math.floor((submittedAssignments / allAssignments) * 100);
  const allocatedPercentage = Math.floor((allocatedAssignments / submittedAssignments) * 100);
  const gradedPercentage = Math.floor((gradedAssignments / submittedAssignments) * 100);

  const releaseDate = new Date(+currentAssignment.releaseDate);
  const dueDate = new Date(+currentAssignment.dueDate);
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
    <div className="assignment-status">
      <Row className="title margin-bottom">
        <Col span={24}>
          <h2>{AssignmentTitle}</h2>
        </Col>
      </Row>

      <Row className="row" justify="space-around" align="middle" wrap={false}>
        <Col span={3.75}>
          {isAllSubmitted ? (
            <SingleStatus
              status="finished"
              percentage={submittedPercentage}
              currentNum={submittedAssignments}
              totalNum={allAssignments}
              title="Submitted"
            />
          ) : isDue ? (
            <SingleStatus
              status="finished"
              percentage={submittedPercentage}
              currentNum={submittedAssignments}
              totalNum={allAssignments}
              title="Submitted"
            />
          ) : (
            <SingleStatus
              status="assignmentProgress"
              percentage={submittedPercentage}
              currentNum={submittedAssignments}
              totalNum={allAssignments}
              title="Submitted"
            />
          )}
        </Col>

        <Col span={3}>
          {isAllSubmitted ? (
            <Progress percent={100} showInfo={false} strokeColor="#096DD9" />
          ) : isDue ? (
            <Progress percent={100} showInfo={false} strokeColor="#096DD9" />
          ) : (
            <Progress percent={0} showInfo={false} strokeColor="#096DD9" />
          )}
        </Col>

        <Col span={3.75}>
          {isDue ? (
            <SingleStatus status="overdue" title="Due" />
          ) : (
            <SingleStatus status="timeProgress" percentage={timePercentage} dueDate={dueDate} title="Due" />
          )}
        </Col>

        <Col span={3}>
          {isDue ? (
            <Progress percent={100} showInfo={false} strokeColor="#096DD9" />
          ) : (
            <Progress percent={0} showInfo={false} strokeColor="#096DD9" />
          )}
        </Col>

        <Col span={3.75}>
          {isAllAllocated && isDue ? (
            <SingleStatus
              status="finished"
              percentage={allocatedPercentage}
              currentNum={allocatedAssignments}
              totalNum={submittedAssignments}
              title="Allocated"
            />
          ) : isDue ? (
            <SingleStatus
              status="assignmentProgress"
              percentage={allocatedPercentage}
              currentNum={allocatedAssignments}
              totalNum={submittedAssignments}
              title="Allocated"
            />
          ) : (
            <SingleStatus
              status="waiting"
              percentage={allocatedPercentage}
              currentNum={allocatedAssignments}
              totalNum={submittedAssignments}
              title="Allocated"
            />
          )}
        </Col>

        <Col span={3}>
          {isAllAllocated ? (
            <Progress percent={100} showInfo={false} strokeColor="#096DD9" />
          ) : (
            <Progress percent={0} showInfo={false} strokeColor="#096DD9" />
          )}
        </Col>

        <Col span={3.75}>
          {isAllGraded && isDue ? (
            <SingleStatus
              status="finished"
              percentage={gradedPercentage}
              currentNum={gradedAssignments}
              totalNum={submittedAssignments}
              title="Graded"
            />
          ) : isDue ? (
            <SingleStatus
              status="assignmentProgress"
              percentage={gradedPercentage}
              currentNum={gradedAssignments}
              totalNum={submittedAssignments}
              title="Graded"
            />
          ) : (
            <SingleStatus
              status="waiting"
              percentage={gradedPercentage}
              currentNum={gradedAssignments}
              totalNum={submittedAssignments}
              title="Graded"
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(AssignmentStatus);
