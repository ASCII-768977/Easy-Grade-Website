import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import DemoSage from './pages/DemoSaga/DemoSage';
import { State } from './types/state';
import { connect } from 'react-redux';
import HomePage from './pages/HomePage/HomePage';
import ProtectedRoute from './routes/ProtectedRoute';

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const App: React.FC = (props: any) => {
  const { isAuthenticated } = props;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/sign-up" component={SignUpPage} />
        <Route exact path="/saga-demo" component={DemoSage} />
        {isAuthenticated ? (
          <ProtectedRoute exact={false} component={HomePage} isAuthenticated={isAuthenticated} path="/" />
        ) : (
          <Route path="/" component={LandingPage} />
        )}
      </Switch>
    </div>
  );
};

export default connect(mapStateToProps)(App);
