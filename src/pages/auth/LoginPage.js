import React, { Component } from 'react';
import { Button, Input } from 'react-native-ui-kitten';
import { ImageBackground, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
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
};

class LoginPage extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onInputValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onLogin = () => {
    const { email, password } = this.state;
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <ImageBackground style={styles.background} source={require('../../assets/images/login_bg.jpg')}>
        <View style={styles.container}>
          <Input
            label="Email"
            value={email}
            onChangeText={(text) => this.onInputValueChange('email', text)}
            style={styles.formElement}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => this.onInputValueChange('password', text)}
            style={styles.formElement}
            secureTextEntry
          />

          <Button
            onPress={this.onLogin}
            style={styles.submit}
          >
            LOGIN
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default LoginPage;
