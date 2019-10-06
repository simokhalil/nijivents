import PropTypes from 'prop-types';
import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { SplashScreen } from 'expo';
import { Image, StyleSheet, View } from 'react-native';
import { Button, withGalio } from 'galio-framework';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
import { translate } from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  splashImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: undefined,
    height: undefined,
  },
  button: {
    width: '70%',
    marginVertical: 20,
  },
});

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentUser) {
      Actions.tabbar({
        type: ActionConst.RESET,
      });

      SplashScreen.hide();

      return false;
    }

    SplashScreen.hide();

    return true;
  }

  goToLogin = () => {
    Actions[AppConstants.ROUTES.login].call();
  };

  goToSignup = () => {
    Actions[AppConstants.ROUTES.signup].call();
  };

  render() {
    const { isUserFetchFinished, theme } = this.props;

    if (!isUserFetchFinished) {
      return (
        <Image
          style={styles.splashImage}
          source={require('../../../assets/splash2.png')}
        />
      );
    }

    return (
      <>
        <HeaderWavy isLarge withPolygons withLogo />

        <View style={styles.container}>

          <Button
            onPress={this.goToLogin}
            style={styles.button}
            radius={50}
          >
            {translate('auth.login').toUpperCase()}
          </Button>

          <Button
            onPress={this.goToSignup}
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
  }
}

WelcomePage.propTypes = {
  currentUser: PropTypes.object,
  isUserFetchFinished: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

WelcomePage.defaultProps = {
  currentUser: null,
};

const mapStateToProps = (state) => ({
  currentUser: state.users.authUser,
  isUserFetchFinished: state.users.isUserFetchFinished,
});

export default withGalio(
  connect(mapStateToProps)(
    WelcomePage,
  ),
);
