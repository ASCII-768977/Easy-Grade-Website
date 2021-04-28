import React, { useState } from 'react';
import modalIcon from '../../assets/img/modal_icon.svg';
import { Button } from 'antd';

import '../CourseCard/CourseWrapper.scss';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import NewAnnouncement from './NewAnnouncement';
const CreateAnnouncement: React.FC<any> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const title = 'Create an Announcement';
  const icon = modalIcon;
  return (
    <div className="announcement__create">
      <Button className="create-course-btn" type="primary" onClick={showModal}>
        Create a New Announcement
      </Button>

      <PopUpWindow title={title} modalIcon={icon} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        {<NewAnnouncement handleCancel={handleCancel} />}
      </PopUpWindow>
    </div>
  );
};

export default CreateAnnouncement;
