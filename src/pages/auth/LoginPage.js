import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button, Input } from 'galio-framework';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';

import AppConstants from '../../app/app.constants';
import HeaderWavy from '../../components/header/HeaderWavy';
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

      Actions[AppConstants.ROUTES.home]({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error login in user', error);
    }
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <>
        <HeaderWavy isLarge withLogo />

        <ScrollView style={styles.container}>
          <View style={styles.formContainer}>
            <Input
              placeholder={translate('auth.email')}
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
            />

            <Button
              radius={50}
              size="large"
              onPress={this.login}
            >
              {translate('auth.login')}
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default LoginPage;
