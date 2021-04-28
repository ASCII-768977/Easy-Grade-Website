import React, { useState } from 'react';
import './TeacherCourseIntroduction.scss';
import { LinkOutlined, EditOutlined } from '@ant-design/icons';
import { State } from '../../types/state';
import { Row, Col } from 'antd';
import PopUpWindow from '../PopUpWindow/PopUpWindow';
import modalIcon from '../../assets/img/modal_icon.svg';
import EditSourceLinks from '../EditSourceLinks/EditSourceLinks';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Button } from 'antd';

const mapStateToProps = (state: State) => ({
  courseEntryCode: state.course.courseEntryCode,
  courseId: state.course.courseCode,
  courseName: state.course.courseName,
  courseInfo: state.course.courseDesc,
  startTerm: state.course.startTerm,
  startYear: state.course.startYear,
  resources: state.course.material,
});

const TeacherCourseIntroduction: React.FC<any> = (props: any) => {
  const { courseEntryCode, courseId, courseName, courseInfo, startTerm, startYear, resources } = props;

  const duration = startTerm + ', ' + startYear;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [copied, setCopied] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const title = 'Edit Source Links';
  const icon = modalIcon;

  return (
    <div className="teacher-course-introduction">
      <Row gutter={{ md: 16, lg: 20, xl: 24, xxl: 28 }}>
        <Col span={16}>
          <h3 className="course-introduction__title">
            {courseId} - {courseName}
          </h3>
          <p className="course-introduction__info">{courseInfo}</p>
        </Col>

        <Col span={8}>
          <div className="flex-start">
            <h3 className="resources-title">Resources</h3>
            <EditOutlined className="edit-outlined__icon" onClick={showModal} />
            <PopUpWindow
              title={title}
              modalIcon={icon}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
            >
              <EditSourceLinks handleCancel={handleCancel} />
            </PopUpWindow>
          </div>
          <ul>
            {resources.map((item: any, key: any) => {
              return (
                <li key={key}>
                  <a href={item.link} target="_blank" rel="noreferrer">
                    <LinkOutlined className="link-outlined" />
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>

      <Row>
        <Col span={16}>
          <div className="space-between">
            <div className="entry-code">
              <p className="entry-code__title">Entry Code: </p>
              <CopyToClipboard onCopy={() => setCopied(true)} text={courseEntryCode}>
                <Button
                  className="entry-code__code"
                  onClick={() => {
                    message.success('Successfully copied the course entry code!');
                  }}
                  type="text"
                >
                  {courseEntryCode}
                </Button>
              </CopyToClipboard>
            </div>

            <p className="duration"> {duration} </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps)(TeacherCourseIntroduction);
