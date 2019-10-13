import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'galio-framework';
import { ScrollView } from 'react-native';

import DatePicker from '../../datetime/DatePicker';
import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import { translate } from '../../../i18n/i18n';

const PlanificationSlide = ({
  onDateChanged,
  onValidate,
  style,
  titleStyle,
  onPrevious,
  step,
}) => (
  <ScrollView contentContainerStyle={style}>
    <Text h4 style={titleStyle}>{translate('event.whichDates')}</Text>

    <Text>Et se termine le...</Text>

    <DatePicker
      onDateChanged={onDateChanged}
    />

    {!step.isFirst && (
      <PreviousButton
        label={translate('common.previous')}
        onPress={onPrevious}
      />
    )}

    <NextButton
      label={translate('common.next')}
      onPress={onValidate}
    />
  </ScrollView>
);

PlanificationSlide.propTypes = {
  onDateChanged: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
};

PlanificationSlide.defaultProps = {
  style: {},
  titleStyle: {},
};

export default PlanificationSlide;
