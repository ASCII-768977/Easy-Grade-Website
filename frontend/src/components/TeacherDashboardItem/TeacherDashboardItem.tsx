import './TeacherDashboardItem.scss';
import '../../assets/scss/font.scss';
import React from 'react';

const TeacherDashboardItem: React.FC<any> = (props: any) => {
  let listItems = props.nameList.map((name: any, index: number) => (
    <li key={index} className=" txt-ellipsis list-settings">
      {name}
    </li>
  ));
  return (
    <div className="dashboard-small-card-layout">
      <h2 className="title-font-settings">{props.title}</h2>
      <div className="flex-layout-horizontal">
        <div className="icon-box">
          <div className="logo-content">{props.numValue}</div>
          <div className="image">
            {' '}
            <img src={props.icon} alt="dashboard small items with" />{' '}
          </div>
        </div>
        <div className="detail-settings">
          <p className="message-settings">{props.message}</p>
          <ul> {listItems} </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardItem;
