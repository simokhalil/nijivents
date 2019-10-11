import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Svg, { Circle, ClipPath } from 'react-native-svg';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SplashScreen } from 'expo';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import LoginForm from '../../components/auth/LoginForm';
import LogoWhite from '../../assets/images/nijivents-logo_white.png';
import Opening from '../../components/auth/Opening';
import ParticlesView from '../../components/ParticlesBackground/ParticlesBackground';
import { auth } from '../../firebase';

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#627EF7',
    backgroundColor: 'white',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 150,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '100',
    marginTop: 30,
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleForm: null, // Can be: null | SIGNUP | LOGIN
    };

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

  login = async (email, password) => {
    try {
      await auth.doSignInWithEmailAndPassword(email, password);

      Actions.tabbar({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error login in user', error);
    }
  };

  showLogin = async () => {
    await this.openingRef.hide();
    this.bg.transitionTo({ transform: [{ translateY: -height / 3 }] }, 500);

    this.setState({
      visibleForm: 'LOGIN',
    });
  };

  hideLogin = async () => {
    this.setState({
      visibleForm: null,
    });

    await Promise.all([
      this.formRef.hide(),
      this.openingRef.show(),
      this.bg.transitionTo({ transform: [{ translateY: 0 }] }),
    ]);
  };

  render() {
    const {
      visibleForm,
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">

        <ScrollView contentContainerStyle={styles.container}>
          <Animatable.View
            useNativeDriver
            ref={(ref) => { this.bg = ref; }}
            style={{
              ...StyleSheet.absoluteFill,
              zIndex: -1,
            }}
          >
            <ParticlesView style={{ flex: 1 }} />

            {/* <Svg
              height={125}
              width={width}
            >
              <Circle r={125} cx={width} />
            </Svg> */}

          </Animatable.View>

          <Animatable.View
            useNativeDriver
            animation="pulse"
            duration={1000}
            easing="ease-out"
            iterationCount="infinite"
            style={{ ...styles.headerContent }}
          >
            <Image source={LogoWhite} style={{ width: 100, height: 100 }} />
            <Text style={styles.logoText}>Nijivents</Text>
          </Animatable.View>

          <View style={{ height: height / 3, justifyContent: 'center', alignItems: 'center' }}>

            <Opening
              ref={(ref) => { this.openingRef = ref; }}
              onLoginPress={this.showLogin}
              onRegisterPress={this.showLogin}
            />

            {visibleForm === 'LOGIN' && (
              <LoginForm
                ref={(ref) => { this.formRef = ref; }}
                onLogin={this.login}
                onCloseForm={this.hideLogin}
              />
            )}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

LoginPage.propTypes = {
  currentUser: PropTypes.object,
};

LoginPage.defaultProps = {
  currentUser: null,
};

const mapStateToProps = (state) => ({
  currentUser: state.users.authUser,
  isUserFetchFinished: state.users.isUserFetchFinished,
});

export default connect(mapStateToProps)(
  LoginPage,
);
