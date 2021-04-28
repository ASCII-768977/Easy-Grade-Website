import React from 'react';
import './ExtensionPage.scss';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import Layout from '../../components/Layout/Layout';
import { useRouteMatch } from 'react-router-dom';
import { getCourseDashboardUrl } from '../../assets/utils/courseUrl';

const mapStateToProps = (state: State) => ({
  courseCode: state.course.courseCode,
});

const ExtensionPage: React.FC<any> = (props) => {
  const { courseCode } = props;
  const { url } = useRouteMatch();

  const breadNavs = [
    { title: 'Home', path: '/' },
    { title: courseCode, path: getCourseDashboardUrl(url) },
    { title: 'Extensions', path: url },
  ];

  return (
    <Layout breadNavs={breadNavs}>
      <div className="extension-page">
        <h2>ExtensionPage</h2>
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps)(ExtensionPage);
