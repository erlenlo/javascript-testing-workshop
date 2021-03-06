import Header from './Header';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';
import { Register } from './Auth/Register';
import PrivateRoute from './Auth/PrivateRoute';

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
    currentUser: state.common.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) =>
    dispatch({ type: APP_LOAD, payload, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

const App = ({
  onLoad,
  redirectTo,
  onRedirect,
  history,
  appLoaded,
  appName,
}) => {
  useEffect(() => {
    onLoad(null);
  }, [onLoad]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      onRedirect();
    }
  }, [redirectTo, history, onRedirect]);

  if (appLoaded) {
    return (
      <React.Fragment>
        <Header appName={appName} />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/editor/:id" component={Editor} />
          <PrivateRoute exact path="/editor" component={Editor} />
          <PrivateRoute exact path="/article/:id" component={Article} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Header appName={appName} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
