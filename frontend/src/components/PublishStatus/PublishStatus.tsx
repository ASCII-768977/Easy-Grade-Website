import React from 'react';
import TeacherDashboardItem from '../TeacherDashboardItem/TeacherDashboardItem';
import DefaultView from '../TeacherDashboardItem/DefaultView';
import publishIcon from '../../assets/img/publish_icon.svg';

const PublishStatus: React.FC<any> = () => {
  const numValue: number = 3;
  const title = 'Publish Status';
  const message = `You have ${numValue} assignments waiting to be published:`;
  const defaultMessage = `All assignments results have been published`;
  const nameList = [
    'Assignment 1: Information Technology and Systems',
    'Assignment 2: Modern Web Technologies',
    'Assignment 3: TCP/IP Network',
  ];

  return (
    <>
      {numValue > 0 ? (
        <TeacherDashboardItem
          numValue={numValue}
          title={title}
          message={message}
          icon={publishIcon}
          nameList={nameList}
        />
      ) : (
        <DefaultView title={title} message={defaultMessage} />
      )}
    </>
  );
};

export default PublishStatus;
