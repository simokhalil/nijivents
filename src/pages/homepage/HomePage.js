import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-ui-kitten';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
import { translate } from '../../i18n/i18n';

import LogoWhite from '../../assets/images/nijivents-logo_white.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  text: {
    marginVertical: 30,
  },
  button: {
    width: '70%',
    marginVertical: 20,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '100',
    marginTop: 30,
  },
});

const HomePage = () => {
  const goToLogin = () => {
    Actions[AppConstants.ROUTES.login].call();
  };

  const goToSignup = () => {
    Actions[AppConstants.ROUTES.signup].call();
  };

  return (
    <>
      <HeaderWavy isLarge>
        <Image source={LogoWhite} style={{ width: 100, height: 100 }} />
        <Text style={styles.logoText}>Nijivents</Text>
      </HeaderWavy>

      <View style={styles.container}>

        <Text category="h4" style={styles.text}>{`${translate('auth.welcome')}`}</Text>

        <Button onPress={goToLogin} appearance="filled" style={styles.button}>
          {translate('auth.login').toUpperCase()}
        </Button>

        <Button onPress={goToSignup} appearance="ghost" style={styles.button}>
          {translate('auth.noAccount')}
        </Button>
      </View>
    </>
  );
};

export default HomePage;
