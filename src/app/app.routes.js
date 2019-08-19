import React from 'react';
import { Actions, Router, Scene, Stack } from 'react-native-router-flux';

import AppConstants from '../app/app.constants';

import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import TestPage from '../pages/TestPage';

const AppRoutes = Actions.create(
  <Stack key="root">
    <Scene key="home" component={HomePage} hideNavBar initial />
    <Scene key="login" component={LoginPage} />
    <Scene key="test" component={TestPage} />
  </Stack>
);

export default AppRoutes;
