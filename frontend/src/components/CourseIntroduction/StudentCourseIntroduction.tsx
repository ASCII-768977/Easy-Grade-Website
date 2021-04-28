import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { State } from '../../types/state';
import { connect } from 'react-redux';
import './StudentCourseIntroduction.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message, Button } from 'antd';

const mapStateToProps = (state: State) => ({
  courseEntryCode: state.course.courseEntryCode,
  courseId: state.course.courseCode,
  courseName: state.course.courseName,
  startTerm: state.course.startTerm,
  startYear: state.course.startYear,
  courseInfo: state.course.courseDesc,
  resources: state.course.material,
});

const StudentCourseIntroduction: React.FC<any> = (props: any) => {
  const { courseEntryCode, courseId, courseName, startTerm, startYear, courseInfo, resources } = props;

  const duration = startTerm + ', ' + startYear;

  const [copied, setCopied] = useState(false);

  return (
    <div className="student-course-introduction">
      <Row gutter={{ md: 16, lg: 20, xl: 24, xxl: 28 }}>
        <Col span={16}>
          <h3 className="course-introduction__title">
            {courseId} - {courseName}
          </h3>
          <p className="course-introduction__info">{courseInfo}</p>
        </Col>

        <Col span={8}>
          <h3 className="resources-title">Resources</h3>
          <ul>
            {resources.map((item: any, key: any) => {
              return (
                <li key={key}>
                  <a href={item.link}>
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

export default connect(mapStateToProps)(StudentCourseIntroduction);
