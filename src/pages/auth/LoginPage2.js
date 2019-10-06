import Animated, { Easing } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Svg, { Circle, ClipPath } from 'react-native-svg';
import { Accelerometer } from 'expo-sensors';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button, Input } from 'galio-framework';
import {
  Button as RNButton,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SplashScreen } from 'expo';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
import LoginBg from '../../assets/images/login_bg2.jpg';
import LogoWhite from '../../assets/images/nijivents-logo_white.png';
import ParticlesView from '../../components/ParticlesBackground/ParticlesBackground';
import { auth } from '../../firebase';
import { runTiming } from '../../utils/animation';
import { translate } from '../../i18n/i18n';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#627EF7',
    backgroundColor: 'white',
  },
  background: {
    width: '100%',
    height: '50%',
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
  button: {
    backgroundColor: 'white',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
  },
  formContainer: {
    padding: 20,
  },
  formElement: {
    marginBottom: 20,
  },
  submit: {
    width: '100%',
  },
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  accelerometerData: { x: 0, y: 0, z: 0 },
};

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
      showLogin: false,
      showRegister: false,
    };

    SplashScreen.preventAutoHide();
  }

  componentDidMount() {
    this.subscribeToAccelerometer();
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

  componentWillUnmount() {
    this.unsubscribeFromAccelerometer();
  }

  subscribeToAccelerometer = () => {
    this.accelerometerSubscription = Accelerometer.addListener((accelerometerData) => this.setState({ accelerometerData }));
  };

  unsubscribeFromAccelerometer = () => {
    if (this.accelerometerSubscription) {
      this.accelerometerSubscription.remove();
      this.accelerometerSubscription = null;
    }
  };

  onInputValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  login = async () => {
    const { email, password } = this.state;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);

      Actions.tabbar({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error login in user', error);
    }
  };

  showLogin = () => {
    this.setState({
      showLogin: true,
      showRegister: false,
    });

    this.welcome.slideOutDown();
    this.bg.transitionTo({ transform: [{ translateY: -height / 3 }] }, 500);
  };

  hideLogin = async () => {
    await Promise.all([
      this.loginForm.slideOutDown(500),
      this.welcome.slideInUp(500),
      this.bg.transitionTo({ transform: [{ translateY: 0 }] }),
    ]);

    this.setState({
      showLogin: false,
      showRegister: false,
    });
  };

  render() {
    const {
      accelerometerData,
      email,
      password,
      error,
      showLogin,
      showRegister,
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

            <Animatable.View
              useNativeDriver
              animation="zoomIn"
              ref={(ref) => { this.welcome = ref; }}
            >
              <Button
                radius={50}
                size="large"
                color="white"
                textStyle={{ color: 'black' }}
                onPress={this.showLogin}
                style={styles.formElement}
                capitalize
              >
                {translate('auth.login')}
              </Button>

              <Button
                radius={50}
                size="large"
                color="white"
                textStyle={{ color: 'black' }}
                onPress={this.showLogin}
                style={styles.formElement}
                capitalize
              >
                {translate('auth.signup')}
              </Button>
            </Animatable.View>

            {showLogin && (
              <Animatable.View
                useNativeDriver
                animation="slideInUp"
                duration={500}
                ref={(ref) => { this.loginForm = ref; }}
                style={{
                  height: height / 3,
                  ...StyleSheet.absoluteFill,
                  top: null,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              >

                <Animatable.View animation="bounceIn" delay={400} style={styles.closeButton}>
                  <Button
                    onPress={this.hideLogin}
                    iconFamily="AntDesign"
                    icon="close"
                    iconColor="#ffffff"
                    onlyIcon
                    color="primary"
                    iconSize={20}
                    hitSlop={{
                      top: 20, left: 20, bottom: 20, right: 20,
                    }}
                    style={{ width: 30, height: 30 }}
                  />
                </Animatable.View>

                <Input
                  placeholder={translate('auth.email')}
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => this.onInputValueChange('email', text)}
                  style={styles.formElement}
                  type="email-address"
                  rounded
                />

                <Input
                  placeholder={translate('auth.password')}
                  value={password}
                  onChangeText={(text) => this.onInputValueChange('password', text)}
                  style={styles.formElement}
                  rounded
                  password
                  viewPass
                  autoCapitalize="none"
                />

                <Animatable.View animation="bounceIn" delay={300} useNativeDriver>
                  <Button
                    radius={50}
                    size="large"
                    onPress={this.login}
                  >
                    {translate('auth.login')}
                  </Button>
                </Animatable.View>
              </Animatable.View>
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
