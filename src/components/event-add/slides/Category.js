import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, withGalio } from 'galio-framework';

import NextButton from '../NextButton';
import Radio from '../../form/Radio';
import { translate } from '../../../i18n/i18n';

const categories = [
  { id: 1, label: 'Déjeuner' },
  { id: 2, label: 'Diner' },
  { id: 3, label: 'Sortie Bar' },
  { id: 4, label: 'Sortie Cinéma' },
  { id: 5, label: 'Weekend voyage' },
];

const CategorySlide = ({
  style, theme, titleStyle, value, onChange, onValidate,
}) => (
  <ScrollView contentContainerStyle={style}>
    <Text h4 style={titleStyle}>{translate('event.whichCategory')}</Text>

    <View style={{ width: '100%' }}>
      {categories.map((categoryObject) => (
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

    <NextButton
      label={translate('common.next')}
      onPress={onValidate}
    />
  </ScrollView>
);

CategorySlide.propTypes = {
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
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
