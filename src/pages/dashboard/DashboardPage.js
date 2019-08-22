import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button } from 'galio-framework';
import { View, Text } from 'react-native';

import AppConstants from '../../app/app.constants';
import { auth } from '../../firebase';

const DashboardPage = () => {
  const logout = () => {
    try {
      auth.doSignOut();
      Actions[AppConstants.ROUTES.home].call({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error loging out user', error);
    }
  };

  return (
    <View>
      <Text>Dashboard Page</Text>

      <Button onPress={logout}>
        LOGOUT
      </Button>
    </View>
  );
}

export default DashboardPage;
