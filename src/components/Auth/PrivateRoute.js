import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component, currentUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (currentUser) {
          return <Route {...rest} component={component} />;
        } else {
          return <Redirect to="/register" />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.common.currentUser,
});

export default connect(mapStateToProps, {})(PrivateRoute);
