import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as Animatable from 'react-native-animatable';
import { Button } from 'galio-framework';
import { StyleSheet } from 'react-native';

import { translate } from '../../i18n/i18n';

const styles = StyleSheet.create({
  formElement: {
    marginBottom: 20,
  },
});

class Opening extends Component {
  show = async () => {
    await this.openingRef.slideInUp(500);
  };

  hide = async () => {
    await this.openingRef.slideOutDown(200);
  };

  render() {
    const { onLoginPress, onRegisterPress } = this.props;

    return (
      <Animatable.View
        useNativeDriver
        animation="zoomIn"
        ref={(ref) => { this.openingRef = ref; }}
      >
        <Button
          radius={50}
          size="large"
          color="white"
          textStyle={{ color: 'black' }}
          onPress={onLoginPress}
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
          onPress={onRegisterPress}
          style={styles.formElement}
          capitalize
        >
          {translate('auth.signup')}
        </Button>
      </Animatable.View>
    );
  }
}

Opening.propTypes = {
  onLoginPress: PropTypes.func.isRequired,
  onRegisterPress: PropTypes.func.isRequired,
};

export default Opening;
