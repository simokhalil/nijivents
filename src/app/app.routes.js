import PropTypes from 'prop-types';
import React from 'react';
import {
  Reducer, Router, Scene, Stack,
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import AppConfig from './app.config';
import AppConstants from './app.constants';
import EventAddPage from '../pages/events/EventAddPage';
import EventDetailsPage from '../pages/events/EventDetailsPage';
import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import WelcomePage from '../pages/welcome/WelcomPage';


const AppRoutes = ({ dispatch }) => {
  const reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      dispatch(action);

      if (state) {
        dispatch({ type: 'ROUTER_STATE_CHANGED', payload: state });
      }

      return defaultReducer(state, action);
    };
  };

  return (
    <Router createReducer={reducerCreate}>
      <Stack key="root" {...AppConfig.navbarProps}>
        <Scene key={AppConstants.ROUTES.welcome} component={WelcomePage} hideNavBar initial />
        <Scene key={AppConstants.ROUTES.login} component={LoginPage} />
        <Scene key={AppConstants.ROUTES.signup} component={SignupPage} />
        <Scene key={AppConstants.ROUTES.home} component={HomePage} />

        <Scene key={AppConstants.ROUTES.eventDetails} component={EventDetailsPage} />
        <Scene key={AppConstants.ROUTES.eventAdd} component={EventAddPage} />

        <Scene key={AppConstants.ROUTES.test} component={HomePage} />
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
