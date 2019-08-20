import PropTypes from 'prop-types';
import React from 'react';
import {
  Reducer, Router, Scene, Stack,
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import TestPage from '../pages/TestPage';

const AppRoutes = ({ dispatch }) => {
  const reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      dispatch(action);
      return defaultReducer(state, action);
    };
  };

  return (
    <Router createReducer={reducerCreate}>
      <Stack key="root">
        <Scene key="home" component={HomePage} hideNavBar initial />
        <Scene key="login" component={LoginPage} />
        <Scene key="test" component={TestPage} />
      </Stack>
    </Router>
  );
};

AppRoutes.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(
  AppRoutes,
);
