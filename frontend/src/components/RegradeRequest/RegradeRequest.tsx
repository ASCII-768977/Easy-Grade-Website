import React from 'react';
import TeacherDashboardItem from '../TeacherDashboardItem/TeacherDashboardItem';
import DefaultView from '../TeacherDashboardItem/DefaultView';
import regradeIcon from '../../assets/img/regrade_icon.svg';

const RegradeRequest: React.FC<any> = () => {
  let numValue = 0;
  let title = 'Regrade Requests';
  let message = `You have ${numValue} regrade requests:`;
  let defaultMessage = 'All the regrade requests have been handled.';
  let nameList = ['Jackie Li (00001)', 'Tom Liu (00002)', 'Park Lee (00003)'];

  return (
    <>
      {numValue > 0 ? (
        <TeacherDashboardItem
          numValue={numValue}
          title={title}
          message={message}
          icon={regradeIcon}
          nameList={nameList}
        />
      ) : (
        <DefaultView title={title} message={defaultMessage} />
      )}
    </>
  );
};

export default RegradeRequest;
