import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet } from 'react-native';
import {
  Button,
  Layout,
  Text,
} from 'react-native-ui-kitten';

import AppConstants from '../../app/app.constants';
import WelcomImage from '../../assets/images/undraw_having_fun_iais.png';
import { translate } from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
      <Layout style={styles.container}>
        <Image source={WelcomImage} style={styles.image} />

        <Text category="h4" style={styles.text}>{`${translate('auth.welcome')}`}</Text>

        <Button onPress={goToLogin} appearance="fill" style={styles.button}>
          {translate('auth.login').toUpperCase()}
        </Button>

        <Button onPress={goToSignup} appearance="ghost" style={styles.button}>
          {translate('auth.noAccount')}
        </Button>
      </Layout>
    </>
  );
};

export default HomePage;
