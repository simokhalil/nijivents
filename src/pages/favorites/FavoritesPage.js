import React from 'react';
import { Text, View } from 'react-native';

import AppColors from '../../app/app.colors';
import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';

const FavoritesPage = () => (
  <View>
    <HeaderWavy title="Favoris" transparent style={{ backgroundColor: AppColors.tabs[AppConstants.ROUTES.favoritesTab] }} />
    <Text>Favorites page</Text>
  </View>
);

export default FavoritesPage;
