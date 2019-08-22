import PropTypes from 'prop-types';
import React from 'react';
import {
  Reducer, Router, Scene, Stack,
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import AppConfig from './app.config';
import AppConstants from './app.constants';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';


const AppRoutes = ({ dispatch }) => {
  const reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      dispatch(action);
      state && dispatch({ type: 'ROUTER_STATE_CHANGED', payload: state });
      return defaultReducer(state, action);
    };
  };

  return (
    <Router createReducer={reducerCreate}>
      <Stack key="root" {...AppConfig.navbarProps}>
        <Scene key={AppConstants.ROUTES.home} component={HomePage} hideNavBar initial />
        <Scene key={AppConstants.ROUTES.login} component={LoginPage} />
        <Scene key={AppConstants.ROUTES.signup} component={SignupPage} />
        <Scene key={AppConstants.ROUTES.dashboard} component={SignupPage} />

        <Scene key={AppConstants.ROUTES.test} component={DashboardPage} />
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
