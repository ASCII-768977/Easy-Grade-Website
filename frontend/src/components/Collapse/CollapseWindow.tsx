import { Collapse } from 'antd';
import React from 'react';
import './CollapseWindow.scss';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CollapseWindowProps } from '../../types';
import { useDispatch } from 'react-redux';
import { storeCurrentCourse } from '../../store/actions/actionCreator';
import addCreateCourseIcon from '../../assets/img/add_createNewCourse_icon.svg';

const { Panel } = Collapse;

const CollapseWindow: React.FC<CollapseWindowProps> = (props) => {
  const dispatch = useDispatch();

  const handleCourse = (course: any) => {
    dispatch(storeCurrentCourse(course));
  };

  const { courseList, role } = props;

  const PanelItem = courseList.map((item, key) => (
    <Panel header={item.semesterInfo.startTerm + ', ' + item.semesterInfo.startYear} key={`${key}`}>
      <Row justify="start" gutter={[24, 24]}>
        {item.courses.map((values, key) => (
          <Col key={key} lg={{ span: '8' }} xl={{ span: '6' }}>
            <Link
              onClick={() => {
                handleCourse(values);
              }}
              to={`/course/${values._id}`}
              key={values.courseName}
              className="course-container"
            >
              <div className="course-container-wrapper">
                <div className="course-container-body">
                  <h2>{values.courseName}</h2>
                </div>
                <div className="course-container-footer">{values.courseCode}</div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Panel>
  ));
  return (
    <>
      {courseList.length === 0 ? (
        <div className="action-container">
          <div className={'action-container-figure'}>
            <img src={addCreateCourseIcon} alt="logo" />
          </div>
          {role === 'teacher' ? (
            <h2 className={'action-container-title'}>Create Your Course Now</h2>
          ) : (
            <h2 className={'action-container-title'}>Add Your Course Now</h2>
          )}
        </div>
      ) : (
        <Collapse defaultActiveKey={['0']}>{PanelItem}</Collapse>
      )}
    </>
  );
};

export default CollapseWindow;
