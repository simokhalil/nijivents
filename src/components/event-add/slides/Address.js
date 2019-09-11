import PropTypes from 'prop-types';
import React from 'react';
import { Input, Text, withGalio } from 'galio-framework';
import { ScrollView } from 'react-native';

import NextButton from '../NextButton';
import { translate } from '../../../i18n/i18n';

const AddressSlide = ({
  style, titleStyle, value, onChange, onValidate,
}) => (
  <ScrollView contentContainerStyle={style}>
    <Text h4 style={titleStyle}>{translate('event.whichAddress')}</Text>

    <Input placeholder="Lieu, adresse, ..." />

    <NextButton
      label={translate('common.next')}
      onPress={onValidate}
    />
  </ScrollView>
);

AddressSlide.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  value: PropTypes.any.isRequired,
};

AddressSlide.defaultProps = {
  style: {},
  titleStyle: {},
};

export default withGalio(AddressSlide);
