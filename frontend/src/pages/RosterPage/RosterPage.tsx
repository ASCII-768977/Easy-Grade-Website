import React from 'react';
import './RosterPage.scss';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';
import { Row, Col } from 'antd';
import { useRouteMatch } from 'react-router-dom';
import SearchBox from '../../components/Roster/SearchBox';
import RosterTable from '../../components/Roster/RosterTable';
import FilterTabs from '../../components/Roster/FilterTabs';

const mapStateToProps = (state: State) => ({
  courseCode: state.course.courseCode,
});

const RosterPage: React.FC<any> = (props) => {
  const { courseCode } = props;
  const { url } = useRouteMatch();

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Rosters', path: url },
  ];
  return (
    <Layout breadNavs={breadNavs}>
      <div className="roster-page">
        <div className="roster-page__header">
          <h2>Course Rosters</h2>
        </div>
        <Row justify="space-between">
          <Col>
            <FilterTabs />
          </Col>
          <Col className="float-right">
            <SearchBox></SearchBox>
          </Col>
        </Row>
        <RosterTable />
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps)(RosterPage);
