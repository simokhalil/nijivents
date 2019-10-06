import Animated, { Easing } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Svg, { Circle, ClipPath } from 'react-native-svg';
import { Accelerometer } from 'expo-sensors';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button, Input } from 'galio-framework';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SplashScreen } from 'expo';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
import LoginBg from '../../assets/images/login_bg2.jpg';
import LogoWhite from '../../assets/images/nijivents-logo_white.png';
import ParticlesView from '../../components/ParticlesBackground/ParticlesBackground';
import { auth } from '../../firebase';
import { runTiming } from '../../utils/animation';
import { translate } from '../../i18n/i18n';

const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  formContainer: {
    padding: 20,
  },
  formElement: {
    marginBottom: 0,
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
    };

    SplashScreen.preventAutoHide();

    this.buttonOpacity = new Value(1);

    this.boxWidth = width / 10.0;

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) => block([
          cond(
            eq(state, State.END),
            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
          ),
        ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) => block([
          cond(
            eq(state, State.END),
            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
          ),
        ]),
      },
    ]);
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

  animateForm = () => {
    block([
      cond(
        true,
        set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
      ),
    ]);
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

  render() {
    const {
      accelerometerData,
      email,
      password,
      error,
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">

        <Animated.ScrollView contentContainerStyle={styles.container}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{ translateY: this.bgY }],
            }}
          >
            <Svg
              height={height + 125}
              width={width * 2}
              style={{
                position: 'absolute',
                top: (-50 + (height * (accelerometerData.y / 20 + 2.0))) / (2.0 - height),
                left: (((width * (accelerometerData.x / 5) + 2.0)) / 2.0) - (width / 2),
              }}
            >
              <ClipPath id="clip">
                <Circle r={height + 125} cx={width} />
              </ClipPath>
              <Image
                href={LoginBg}
                width={width * 2}
                height={height + 125}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>

          </Animated.View>

          <Animated.View
            style={{ ...styles.headerContent, transform: [{ translateY: this.bgY }], }}
          >
            <Image source={LogoWhite} style={{ width: 100, height: 100 }} />
            <Text style={styles.logoText}>Nijivents</Text>
          </Animated.View>

          <View style={{ height: height / 3, justifyContent: 'center' }}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
              <Animated.View
                style={{
                  ...styles.button,
                  opacity: this.buttonOpacity,
                  transform: [{ translateY: this.buttonY }, { perspective: 45 }]
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{translate('auth.login')}</Text>
              </Animated.View>
            </TapGestureHandler>

            <Animated.View
              style={{
                zIndex: this.textInputZIndex,
                opacity: this.textInputOpacity,
                transform: [{ translateY: this.textInputY }],
                height: height / 3,
                ...StyleSheet.absoluteFill,
                top: null,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                <Animated.View style={styles.closeButton}>
                  <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                    X
                  </Animated.Text>
                </Animated.View>
              </TapGestureHandler>

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

              <Button
                radius={50}
                size="large"
                onPress={this.login}
              >
                {translate('auth.login')}
              </Button>
            </Animated.View>
          </View>

        </Animated.ScrollView>
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
