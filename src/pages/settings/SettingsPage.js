import React from 'react';
import { Text, View } from 'react-native';

import AppStyles from '../../app/app.styles';
import Header from '../../components/header/Header';

const SettingsPage = () => (
  <View>
    <Header transparent />

    <Text style={AppStyles.pageTitle}>
      Paramètres
    </Text>
  </View>
);

export default SettingsPage;
