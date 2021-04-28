import './AllocateStatus.scss';
import '../../assets/scss/font.scss';
import 'antd/dist/antd.css';
import { Progress } from 'antd';
import DefaultView from '../TeacherDashboardItem/DefaultView';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { getAssiUrl } from '../../assets/utils/courseUrl';

const mapStateToProps = (state: State) => ({
  assignmentStatistic: state.assignmentStatistic,
});

const AllocateStatus: React.FC<any> = (props: any) => {
  const { url } = useRouteMatch();
  const assignmentStatistic = props.assignmentStatistic;
  let messageArray = ['Assignment 2: Program in Python.', 'Assignment 1: Web Application.'];
  const title = 'Allocate Status';
  let defaultMessage = 'All the assignments have been allocated.';
  let numArray = ['0/302', '101/202'];
  let totalAllocated = 0;
  let totalAssignments = 0;
  let totalProportion = '101/504';
  let percentage = 0;
  let assignmentIdList: any = [];

  if (assignmentStatistic[0] !== undefined && assignmentStatistic[1] !== undefined) {
    messageArray = [
      'Assignment 2:' + assignmentStatistic[1].assignmentName,
      'Assignment 1:' + assignmentStatistic[0].assignmentName,
    ];
    numArray = [
      assignmentStatistic[1].allocatedNum + '/' + assignmentStatistic[1].submittedNum,
      assignmentStatistic[0].allocatedNum + '/' + assignmentStatistic[0].submittedNum,
    ];
    totalAllocated = assignmentStatistic[1].allocatedNum + assignmentStatistic[0].allocatedNum;
    totalAssignments = assignmentStatistic[1].submittedNum + assignmentStatistic[0].submittedNum;
    totalProportion = totalAllocated + '/' + totalAssignments;
    percentage = Math.floor((totalAllocated / totalAssignments) * 100);
    assignmentIdList = [assignmentStatistic[1].assignmentId, assignmentStatistic[0].assignmentId];
  } else if (assignmentStatistic[0] !== undefined && assignmentStatistic[1] === undefined) {
    messageArray = ['Assignment 1:' + assignmentStatistic[0].assignmentName];
    numArray = [assignmentStatistic[0].allocatedNum + '/' + assignmentStatistic[0].submittedNum];
    totalAllocated = assignmentStatistic[0].allocatedNum;
    totalAssignments = assignmentStatistic[0].submittedNum;
    totalProportion = totalAllocated + '/' + totalAssignments;
    percentage = Math.floor((totalAllocated / totalAssignments) * 100);
    assignmentIdList = [assignmentStatistic[0].assignmentId];
  }

  let messageList = messageArray.map((message: any, index: number) => {
    return (
      <div key={index}>
        <Link to={getAssiUrl(url) + '/' + assignmentIdList[index]}>
          <p className="clear-defaults txt-ellipsis text-color">{message}</p>
        </Link>
        <p className="clear-defaults number-settings">{numArray[index]}</p>
      </div>
    );
  });

  if (messageArray.length > 0) {
    return (
      <div className="allocate-layout">
        <h2 className="title-font-settings">{title}</h2>
        <div className="flex-layout-horizontal">
          <div className="icon-box">
            <div>
              <Progress width={86} strokeWidth={8} strokeLinecap="square" type="circle" percent={percentage} />
            </div>
            <div className="number-settings"> {totalProportion} </div>
          </div>
          <div className="detail-settings ">{messageList}</div>
        </div>
      </div>
    );
  } else {
    return <DefaultView title={title} message={defaultMessage} />;
  }
};

export default connect(mapStateToProps)(AllocateStatus);
