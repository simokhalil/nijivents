import PropTypes from 'prop-types';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { Button, withGalio } from 'galio-framework';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
import { translate } from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  button: {
    width: '70%',
    marginVertical: 20,
  },
});

const HomePage = ({ theme }) => {
  const goToLogin = () => {
    Actions[AppConstants.ROUTES.login].call();
  };

  const goToSignup = () => {
    Actions[AppConstants.ROUTES.signup].call();
  };

  return (
    <>
      <HeaderWavy isLarge withPolygons withLogo />

      <View style={styles.container}>

        <Button
          onPress={goToLogin}
          style={styles.button}
          radius={50}
        >
          {translate('auth.login').toUpperCase()}
        </Button>

        <Button
          onPress={goToSignup}
          style={styles.button}
          radius={50}
          shadowless
          color="transparent"
          textStyle={{ color: theme.COLORS.PRIMARY }}
        >
          {translate('auth.noAccount')}
        </Button>
      </View>
    </>
  );
};

HomePage.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withGalio(HomePage);
