import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, withGalio } from 'galio-framework';

import AppConstants from '../../../app/app.constants';
import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import Radio from '../../form/Radio';
import { translate } from '../../../i18n/i18n';

const CategorySlide = ({
  style, theme, titleStyle, value, onChange, onValidate, onPrevious, step,
}) => (
  <ScrollView contentContainerStyle={style}>
    <Text h4 style={titleStyle}>{translate('event.whichCategory')}</Text>

    <View style={{ width: '100%' }}>
      {AppConstants.CATEGORIES.map((categoryObject) => (
        <Radio
          key={categoryObject.id}
          label={categoryObject.label}
          color={theme.COLORS.PRIMARY}
          checked={categoryObject.id === value}
          onChange={onChange}
          value={categoryObject.id}
          containerStyle={{ marginBottom: 20 }}
        />
      ))}
    </View>

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

CategorySlide.propTypes = {
  onChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  style: PropTypes.object,
  theme: PropTypes.object.isRequired,
  titleStyle: PropTypes.object,
  value: PropTypes.any.isRequired,
};

CategorySlide.defaultProps = {
  style: {},
  titleStyle: {},
};

export default withGalio(CategorySlide);
