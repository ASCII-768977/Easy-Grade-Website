import React, { useState } from 'react';
import modalIcon from '../../assets/img/modal_icon.svg';
import { Button } from 'antd';
import './CreateCourseUI.scss';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import CourseDetails from './CourseDetails';
import { CreatCourseUIProps } from '../../types';

const CreateCourseUI: React.FC<CreatCourseUIProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { role } = props;
  const [isCreateCourse, setIsCreateCourse] = useState(true);
  const showModal = () => {
    setIsModalVisible(true);
    setIsCreateCourse(true);
  };
  const showModal_add = () => {
    setIsModalVisible(true);
    setIsCreateCourse(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const title: string = isCreateCourse === true ? 'Create Your Course' : 'Add A New Course';

  const icon = modalIcon;

  return (
    <>
      {role === 'teacher' ? (
        <div className={'button-group-course'}>
          <Button className="create-course-btn" type="primary" onClick={showModal}>
            Create a New Course
          </Button>
          <Button className="add-course-btn" type="primary" onClick={showModal_add}>
            Add a course
          </Button>
        </div>
      ) : (
        <Button className="create-course-btn" type="primary" onClick={showModal_add}>
          Add a course
        </Button>
      )}
      <PopUpWindow title={title} modalIcon={icon} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        <CourseDetails handleCancel={handleCancel} role={role} isCreateCourse={isCreateCourse} />
      </PopUpWindow>
    </>
  );
};

export default CreateCourseUI;
