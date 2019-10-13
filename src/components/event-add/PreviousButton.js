import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet, Text, TouchableHighlight, View,
} from 'react-native';

import AppTheme from '../../app/app.theme';

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    borderTopRightRadius: 35,
    height: 70,
    width: 130,
    backgroundColor: AppTheme.COLORS.GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'museo-bold',
    fontSize: 18,
    color: AppTheme.COLORS.WHITE,
  },
});

const NextButton = ({ label, onPress }) => (
  <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
    <TouchableHighlight
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableHighlight>
  </View>
);

NextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NextButton;
