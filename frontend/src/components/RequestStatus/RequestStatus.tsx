import React from 'react';
import RequestStatusItem from './RequestStatusItem';
import EmptyIcon from '../../assets/img/requests_status_empty.svg';
import './RequestStatus.scss';

const RequestStatus: React.FC = () => {
  let requestList = [
    {
      title: 'Assignment 2 Rescore#3',
      status: 'pending',
    },
    {
      title: 'Assignment 1 Rescore#2',
      status: 'resolved',
    },
    {
      title: 'Assignment 1 Extension#1',
      status: 'resolved',
    },
  ];

  return (
    <div className="request-status">
      <h3 className="request-status__title">Request Status</h3>
      {requestList.length !== 0 && (
        <ul className="request-status__list">
          {requestList.map((item, key) => {
            return <RequestStatusItem key={key} request={item} />;
          })}
        </ul>
      )}
      {requestList.length === 0 && (
        <div className="request-status__list--empty">
          <img src={EmptyIcon} alt="You have not applied any request yet" />
          <p>You have not applied any request here.</p>
        </div>
      )}
    </div>
  );
};

export default RequestStatus;
