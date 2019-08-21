import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button, Input, Layout } from 'react-native-ui-kitten';
import { Image, StyleSheet, View } from 'react-native';

import AppConstants from '../../app/app.constants';
import LoginImage from '../../assets/images/undraw_authentication_fsn5.png';
import { auth } from '../../firebase';
import { translate } from '../../i18n/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '50%',
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

  login = async () => {
    const { email, password } = this.state;

    try {
      await auth.doSignInWithEmailAndPassword(email, password);

      Actions[AppConstants.ROUTES.test].call({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error login in user', error);
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <Layout style={styles.container}>
        <Image source={LoginImage} style={styles.background} />

        <View style={styles.formContainer}>
          <Input
            label={translate('auth.email')}
            value={email}
            onChangeText={(text) => this.onInputValueChange('email', text)}
            style={styles.formElement}
          />

          <Input
            label={translate('auth.password')}
            value={password}
            onChangeText={(text) => this.onInputValueChange('password', text)}
            style={styles.formElement}
            secureTextEntry
          />

          <Button
            appearance="filled"
            onPress={this.login}
            style={styles.submit}
          >
            {translate('auth.login')}
          </Button>
        </View>
      </Layout>
    );
  }
}

export default LoginPage;
