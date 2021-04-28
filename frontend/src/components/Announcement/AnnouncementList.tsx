import React from 'react';
import { Collapse } from 'antd';
import AbbvDate from '../FormattedDate/AbbvDate';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import AnnouncementIcon from '../../assets/img/announcement_icon.svg';
import './Announcement.scss';
const { Panel } = Collapse;

const isEditable = false;

const AnnouncementList: React.FC<any> = (props) => {
  const { data: announcementList } = props;

  return (
    <>
      {announcementList.length !== 0 ? (
        <Collapse className="announcement__list" defaultActiveKey={['0']} accordion={false}>
          {announcementList.map((item: any, key: number) => {
            const { title, content, createdDate } = item;
            return (
              <Panel header={title} key={key} extra={<AbbvDate date={createdDate} />}>
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }}></div>
              </Panel>
            );
          })}
        </Collapse>
      ) : (
        <div className="announcement__list--empty">
          <img src={AnnouncementIcon} alt="There is no announcement now" />
          <p>There is no announcement now</p>
        </div>
      )}
    </>
  );
};

export default AnnouncementList;
