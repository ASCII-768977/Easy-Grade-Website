import React from 'react';
import { connect } from 'react-redux';
import './AnnouncementPage.scss';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { useRouteMatch } from 'react-router-dom';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { Col, Row } from 'antd';
import AnnouncementCalendar from '../../components/AnnouncementCalendar/AnnouncementCalendar';
import Announcement from '../../components/Announcement/Announcement';

const mapStateToProps = (state: State) => ({
  courseCode: state.course.courseCode,
  announcementList: state.course.annoucements,
});

const AnnouncementPage: React.FC<any> = (props) => {
  const { courseCode } = props;
  const { url } = useRouteMatch();
  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Announcements', path: url },
  ];

  return (
    <Layout breadNavs={breadNavs}>
      <div className="announcement-page">
        <Row gutter={[24, 24]} align="top">
          <Col className="gutter-row" flex="4 1 600px">
            <div className="announcement-list">
              <Announcement />
            </div>
          </Col>
          <Col className="gutter-row" flex="1 0 300px">
            <div className="calendar-box">
              <h2>My Calendar</h2>
              <AnnouncementCalendar />
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps)(AnnouncementPage);
