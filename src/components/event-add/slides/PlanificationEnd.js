import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'galio-framework';
import { ScrollView } from 'react-native';

import DatePicker from '../../datetime/DatePicker';
import NextButton from '../NextButton';
import { translate } from '../../../i18n/i18n';

const PlanificationSlide = ({
  onDateChanged,
  onValidate,
  style,
  titleStyle,
}) => (
  <ScrollView contentContainerStyle={style}>
    <Text h4 style={titleStyle}>{translate('event.whichDates')}</Text>

    <Text>Et se le...</Text>

    <DatePicker
      onDateChanged={onDateChanged}
    />

    <NextButton
      label={translate('common.next')}
      onPress={onValidate}
    />
  </ScrollView>
);

PlanificationSlide.propTypes = {
  onDateChanged: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
};

PlanificationSlide.defaultProps = {
  style: {},
  titleStyle: {},
};

export default PlanificationSlide;
