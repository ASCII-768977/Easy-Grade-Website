import CreateCourseUI from './CreateCourseUI';
import React from 'react';
import { Row, Col } from 'antd';
import { CourseWrapperProps } from '../../types';
import './CourseWrapper.scss';
import CollapseWindow from '../Collapse/CollapseWindow';

const CourseWrapper: React.FC<CourseWrapperProps> = (props) => {
  const { courseList } = props;

  const { role } = props;

  return (
    <div className="course-wrapper">
      <Row justify="space-between">
        <Col span={6} className="course-wrapper-header">
          My Courses
        </Col>
        <Col span={12} className="create-course-btn" id="create-course-btn">
          <CreateCourseUI role={role} />
        </Col>
      </Row>
      <div className="course-wrapper-body">
        <CollapseWindow role={role} courseList={courseList} />
      </div>
    </div>
  );
};

export default CourseWrapper;
