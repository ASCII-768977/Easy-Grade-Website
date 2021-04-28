import React from 'react';
import { Progress } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import DurationDate from '../FormattedDate/DurationDate';
import './SingleStatus.scss';
import { SingleStatusProps } from '../../types';

const SingleStatus: React.FC<SingleStatusProps> = (props) => {
  const status = props.status;
  const dueDate = props.dueDate;
  const percentage = props.percentage;
  const currentNum = props.currentNum;
  const totalNum = props.totalNum;

  let isWaiting = false;
  let isAssignmentProgress = false;
  let isTimeProgress = false;
  let isFinished = false;

  if (status === 'waiting') {
    isWaiting = true;
  } else if (status === 'assignmentProgress') {
    isAssignmentProgress = true;
  } else if (status === 'timeProgress') {
    isTimeProgress = true;
  } else if (status === 'finished') {
    isFinished = true;
  }

  return (
    <>
      {isWaiting ? (
        <div className="flex align-center-column">
          <ClockCircleOutlined className="icon-item gray" />
          <br></br>
        </div>
      ) : isAssignmentProgress ? (
        <div className="flex align-center-column">
          <Progress percent={percentage} showInfo={false} strokeColor="#096DD9" />
          <p className="info">
            {currentNum} / {totalNum}
          </p>
        </div>
      ) : isTimeProgress ? (
        <div className="flex align-center-column">
          <Progress percent={percentage} showInfo={false} strokeColor="#096DD9" />
          <DurationDate dueDate={dueDate} />
        </div>
      ) : isFinished ? (
        <div className="flex align-center-column">
          <CheckCircleOutlined className="icon-item" />
          <br></br>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleStatus;
