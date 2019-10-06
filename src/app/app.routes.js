import PropTypes from 'prop-types';
import React from 'react';
import {
  Reducer, Router, Scene, Stack, Tabs,
} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import AppConfig from './app.config';
import AppConstants from './app.constants';
import CustomTabBar from '../components/tabs/CustomTabBar';
import EventAddPage from '../pages/events/EventAddPage';
import EventDetailsPage from '../pages/events/EventDetailsPage';
import FavoritesPage from '../pages/favorites/FavoritesPage';
import HomePage from '../pages/homepage/HomePage';
import LoginPage from '../pages/auth/LoginPage2';
import SettingsPage from '../pages/settings/SettingsPage';
import SignupPage from '../pages/auth/SignupPage';
import WelcomePage from '../pages/welcome/WelcomPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

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
        <Scene key={AppConstants.ROUTES.welcome} component={WelcomePage} hideNavBar />
        <Scene key={AppConstants.ROUTES.login} component={LoginPage} initial />
        <Scene key={AppConstants.ROUTES.signup} component={SignupPage} />

        <Tabs
          key="tabbar"
          backToInitial
          onTabOnPress={() => {
            console.log('Back to initial and also print this');
          }}
          swipeEnabled
          tabBarStyle={styles.tabBarStyle}
          activeBackgroundColor="white"
          inactiveBackgroundColor="rgba(255, 0, 0, 0.5)"
          tabBarComponent={CustomTabBar}
        >
          <Stack key={AppConstants.ROUTES.homeTab} title="Accueil" {...AppConfig.navbarProps}>
            <Scene key={AppConstants.ROUTES.home} component={HomePage} />

            <Scene key={AppConstants.ROUTES.eventDetails} component={EventDetailsPage} />
            <Scene key={AppConstants.ROUTES.eventAdd} component={EventAddPage} />
          </Stack>

          <Stack key={AppConstants.ROUTES.favoritesTab} title="Favoris" {...AppConfig.navbarProps}>
            <Scene key={AppConstants.ROUTES.favorites} component={FavoritesPage} />
          </Stack>

          <Stack key={AppConstants.ROUTES.settingsTab} title="Paramètres" {...AppConfig.navbarProps}>
            <Scene key={AppConstants.ROUTES.settings} component={SettingsPage} />
          </Stack>
        </Tabs>

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
