import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { Button, Input } from 'galio-framework';
import { Dimensions, StyleSheet } from 'react-native';

import { translate } from '../../i18n/i18n';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  closeButton: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
  },
  formElement: {
    marginBottom: 20,
  },
});

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  };

  onInputValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  hide = async () => Promise.all([
    this.closeButtonRef.zoomOut(200),
    this.submitButtonRef.zoomOut(200),
    this.formRef.slideOutDown(500),
  ]);

  render() {
    const { email, password, error } = this.state;
    const { isLoading, onCloseForm, onLogin } = this.props;

    return (
      <Animatable.View
        useNativeDriver
        animation="slideInUp"
        duration={300}
        ref={(ref) => { this.formRef = ref; }}
        style={{
          height: height / 3,
          ...StyleSheet.absoluteFill,
          top: null,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >

        <Animatable.View
          animation="bounceIn"
          delay={400}
          useNativeDriver
          ref={(ref) => { this.closeButtonRef = ref; }}
          style={styles.closeButton}
        >
          <Button
            onPress={onCloseForm}
            iconFamily="AntDesign"
            icon="close"
            iconColor="#ffffff"
            onlyIcon
            color="error"
            iconSize={30}
            hitSlop={{
              top: 20, left: 20, bottom: 20, right: 20,
            }}
            style={{ width: 40, height: 40 }}
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

        <Animatable.View
          animation="bounceIn"
          delay={300}
          useNativeDriver
          ref={(ref) => { this.submitButtonRef = ref; }}
        >
          <Button
            radius={50}
            size="large"
            onPress={() => onLogin(email, password)}
            loading={isLoading}
            color="error"
          >
            {translate('auth.login')}
          </Button>
        </Animatable.View>
      </Animatable.View>
    );
  }
}

LoginForm.propTypes = {
  onCloseForm: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
