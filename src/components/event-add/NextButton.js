import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'galio-framework';

const NextButton = ({ label, onPress }) => (
  <Button
    onPress={onPress}
    style={{ marginTop: 50 }}
  >
    {label}
  </Button>
);

NextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NextButton;
