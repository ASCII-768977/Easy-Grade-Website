import React, { useState } from 'react';
import { Button } from 'antd';
import './Announcement.scss';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import modalIcon from '../../assets/img/modal_icon.svg';
import AnnouncementDetails from './AnnouncementDetails';
import AnnouncementList from './AnnouncementList';
import { connect } from 'react-redux';
import { State } from '../../types/state';

const mapStateToProps = (state: State) => ({
  role: state.user.role,
  announcementList: state.course.annoucements,
});

const Announcement: React.FC<any> = (props) => {
  const { role, announcementList } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const title = 'Create A New Announcement';

  const icon = modalIcon;
  return (
    <div className="announcement">
      <div className="header-layout">
        <h3 className="announcement__title">Announcement</h3>
        {role === 'teacher' ? (
          <Button className="create-course-btn position-up-right" type="primary" onClick={showModal}>
            Create a New Announcement
          </Button>
        ) : (
          ''
        )}
      </div>
      <div>
        <PopUpWindow
          title={title}
          modalIcon={icon}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        >
          <AnnouncementDetails handleCancel={handleCancel} />
        </PopUpWindow>
      </div>
      <AnnouncementList data={announcementList} />
    </div>
  );
};

export default connect(mapStateToProps)(Announcement);
