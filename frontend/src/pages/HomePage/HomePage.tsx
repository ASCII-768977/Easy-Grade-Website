import React from 'react';
import './HomePage.scss';
import { connect } from 'react-redux';
import { State } from '../../types/state';
import { Switch, Route, Redirect } from 'react-router-dom';
import CoursePage from '../CoursePage/CoursePage';
import MainNav from '../../components/MainNav/MainNav';
import Layout from '../../components/Layout/Layout';
import AccountPage from '../AccountPage/AccountPage';
import ProtectedRoute from '../../routes/ProtectedRoute';
import SkeltonWindow from '../../components/CourseCard/SkeltonWindow';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const HomePage: React.FC<{ isAuthenticated: boolean }> = (props) => {
  const { isAuthenticated } = props;

  return (
    <div className="home-page">
      <MainNav
        title="Your Courses"
        description="Welcome to easy grade! Click on one of your courses to the right, or on the Account menu below."
        navLinks={[]}
      />

      <Switch>
        <Route exact path="/" component={HomePageCourses} />
        <Route exact path="/account" component={AccountPage} />
        <ProtectedRoute path="/course/:courseId" component={CoursePage} isAuthenticated={isAuthenticated} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

const breadNavs = [{ title: '', path: '/' }];

const HomePageCourses: React.FC = () => {
  return (
    <Layout breadNavs={breadNavs}>
      <SkeltonWindow />
    </Layout>
  );
};

export default connect(mapStateToProps)(HomePage);
