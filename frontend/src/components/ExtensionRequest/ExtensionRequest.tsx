import React from 'react';
import TeacherDashboardItem from '../TeacherDashboardItem/TeacherDashboardItem';
import DefaultView from '../TeacherDashboardItem/DefaultView';
import extensionIcon from '../../assets/img/extension_icon.svg';

const ExtensionRequest: React.FC<any> = (props: any) => {
  let numValue = 4;
  let title = 'Extension Requests';
  let message = `You have ${numValue} extension requests:`;
  let defaultMessage = 'All the extension requests have been handled.';
  let nameList = ['Jackie Li (00001)', 'Tom Liu (00002)', 'Park Lee (00003)', 'Lucy Wu (00004)'];

  return (
    <>
      {numValue > 0 ? (
        <TeacherDashboardItem
          numValue={numValue}
          title={title}
          message={message}
          icon={extensionIcon}
          nameList={nameList}
        />
      ) : (
        <DefaultView title={title} message={defaultMessage} />
      )}
    </>
  );
};

export default ExtensionRequest;
