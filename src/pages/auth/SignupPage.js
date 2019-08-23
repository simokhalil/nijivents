import React, { Component } from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button, Input } from 'galio-framework';
import { ScrollView, StyleSheet, View } from 'react-native';

import AppConstants from '../../app/app.constants';
import { auth, userDB } from '../../firebase';
import { translate } from '../../i18n/i18n';

import HeaderWavy from '../../components/header/HeaderWavy';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
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
  name: '',
  password: '',
  errors: {},
};

class SignupPage extends Component {
  state = {
    ...INITIAL_STATE,
  };

  onInputValueChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  isFormValid = () => {
    const { email, name, password } = this.state;

    const errors = {};

    if (name.length <= 2) {
      errors.name = 'Invalid name';
    }

    if (email.length < 8 || !this.validateEmail(email)) {
      errors.email = 'Invalid email';
    }

    if (password.length < 8) {
      errors.password = 'Must be 8 chars min';
    }

    console.log('errors', errors);

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signup = async () => {
    const { email, name, password } = this.state;

    if (!this.isFormValid()) {
      return;
    }

    try {
      const authUser = await auth.doCreateUserWithEmailAndPassword(email, password);

      try {
        await userDB.doCreateUser(authUser.user.uid, name, email);
        this.setState(() => ({ ...INITIAL_STATE }));
        Actions[AppConstants.ROUTES.login].call({
          type: ActionConst.RESET,
        });
      } catch (error) {
        console.log('error creatin db user', error);
        // this.setStateByProp('error', error);
      }
    } catch (error) {
      console.log('error creatin auth user', error);
      // this.setStateByProp('error', error);
    }
  };

  render() {
    const {
      email, name, password, errors,
    } = this.state;

    return (
      <>
        <HeaderWavy />

        <ScrollView style={styles.container}>
          <View style={styles.formContainer}>
            <Input
              placeholder={translate('auth.name')}
              value={name}
              onChangeText={(text) => this.onInputValueChange('name', text)}
              style={styles.formElement}
              rounded
            />

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
              size="small"
              onPress={this.signup}
            >
              {translate('auth.login')}
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default SignupPage;
