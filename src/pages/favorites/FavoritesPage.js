import React from 'react';
import { Text, View } from 'react-native';

import AppStyles from '../../app/app.styles';
import Header from '../../components/header/Header';

const FavoritesPage = () => (
  <View>
    <Header transparent />

    <Text style={AppStyles.pageTitle}>
      Favoris
    </Text>

    <Text>Favorites page</Text>
  </View>
);

export default FavoritesPage;
