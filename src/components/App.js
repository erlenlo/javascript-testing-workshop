import Header from './Header';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router';
import Article from '../components/Article';
import Editor from '../components/Editor';
import Home from '../components/Home';

const mapStateToProps = (state) => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) =>
    dispatch({ type: APP_LOAD, payload, skipTracking: true }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

const App = (props) => {
  useEffect(() => {
    props.onLoad(null);
  }, []);

  useEffect(() => {
    if (props.redirectTo) {
      props.history.push(props.redirectTo);
      props.onRedirect();
    }
  }, [props.redirectTo]);

  if (props.appLoaded) {
    return (
      <div>
        <Header appName={props.appName} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/editor/:id" component={Editor} />
          <Route exact path="/editor" component={Editor} />
          <Route exact path="/article/:id" component={Article} />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <Header appName={props.appName} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
