import React from 'react';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
interface RequestItem {
  request: {
    title: String;
    status: String;
  };
}

const RequestStatusItem: React.FC<RequestItem> = (props) => {
  const { title, status } = props.request;
  return (
    <li className="request-status__item">
      <h4 className="request-status__name">{title}</h4>
      {status === 'pending' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
    </li>
  );
};

export default RequestStatusItem;
