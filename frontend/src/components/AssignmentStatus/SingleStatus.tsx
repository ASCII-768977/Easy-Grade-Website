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
  const title = props.title;

  let isWaiting = false;
  let isAssignmentProgress = false;
  let isTimeProgress = false;
  let isFinished = false;
  let isDue = false;

  if (status === 'waiting') {
    isWaiting = true;
  } else if (status === 'assignmentProgress') {
    isAssignmentProgress = true;
  } else if (status === 'timeProgress') {
    isTimeProgress = true;
  } else if (status === 'finished') {
    isFinished = true;
  } else if (status === 'overdue') {
    isDue = true;
  }
  return (
    <>
      {isWaiting ? (
        <div className="flex align-center-column">
          <p className="info margin-bottom">
            {currentNum} / {totalNum}
          </p>
          <div className="margin-bottom">
            <ClockCircleOutlined className="icon-item gray" />
          </div>
          <p className="bottom-tag">{title}</p>
        </div>
      ) : isAssignmentProgress ? (
        <div className="flex align-center-column">
          <p className="info margin-bottom">
            {currentNum} / {totalNum}
          </p>
          <div className="margin-bottom">
            <Progress type="circle" percent={percentage} strokeColor="#096DD9" width={80} />
          </div>
          <p className="bottom-tag">{title}</p>
        </div>
      ) : isTimeProgress ? (
        <div className="flex align-center-column">
          <div className="info margin-bottom">
            <DurationDate dueDate={dueDate} />
          </div>
          <div className="margin-bottom">
            <Progress type="circle" percent={percentage} strokeColor="#096DD9" width={80} />
          </div>
          <p className="bottom-tag">{title}</p>
        </div>
      ) : isFinished ? (
        <div className="flex align-center-column">
          <p className="info">
            {currentNum} / {totalNum}
          </p>
          <div className="margin-bottom">
            <CheckCircleOutlined className="icon-item" />
          </div>
          <p className="bottom-tag">{title}</p>
        </div>
      ) : isDue ? (
        <div className="flex align-center-column">
          <div className="info margin-bottom">
            <p>Over Due</p>
          </div>
          <div className="margin-bottom">
            <CheckCircleOutlined className="icon-item" />
          </div>
          <p className="bottom-tag">{title}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleStatus;
