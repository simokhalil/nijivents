import PropTypes from 'prop-types';
import React from 'react';
import { Text, withGalio } from 'galio-framework';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const spaceAround = (direction) => {
  switch (direction) {
    case 'row-reverse':
      return { marginRight: 10 };
    case 'column':
      return { marginTop: 10 };
    case 'column-reverse':
      return { marginBottom: 10 };
    default:
      return { marginLeft: 10 };
  }
}

class Radio extends React.Component {

  renderLabel = () => {
    const {
      label, disabled, flexDirection, labelStyle, styles,
    } = this.props;

    const labelStyles = [
      styles.textStyles,
      disabled && styles.disabledLabel,
      labelStyle,
      flexDirection && spaceAround(flexDirection),
    ];

    if (label) {
      return <Text style={labelStyles}>{label}</Text>;
    }

    return null;
  }

  radioPressHandler = (value) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      color,
      checked,
      styles,
      disabled,
      flexDirection,
      containerStyle,
      radioOuterStyle,
      radioInnerStyle,
      theme,
      value,
    } = this.props;

    const containerStyles = [styles.container, flexDirection && { flexDirection }, containerStyle];

    const whichColor = color && theme.COLORS[color.toUpperCase()] ? theme.COLORS[color.toUpperCase()] : color;

    const radioButtonOuterStyles = [
      styles.radioOuterStyles,
      { borderColor: whichColor },
      disabled && styles.disabledRadioOuter,
      radioOuterStyle,
    ];

    const radioButtonInnerStyles = [
      styles.radioInnerStyles,
      { backgroundColor: whichColor },
      disabled && styles.disabledRadioInner,
      radioInnerStyle,
    ];

    return (
      <TouchableOpacity
        onPress={() => this.radioPressHandler(value)}
        style={containerStyles}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={radioButtonOuterStyles}>
          {checked ? <View style={radioButtonInnerStyles} /> : null}
        </View>
        {this.renderLabel()}
      </TouchableOpacity>
    );
  }
}

const styles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radioOuterStyles: {
    height: theme.SIZES.RADIO_HEIGHT,
    width: theme.SIZES.RADIO_WIDTH,
    borderRadius: theme.SIZES.RADIO_HEIGHT * 0.5,
    borderWidth: theme.SIZES.RADIO_THICKNESS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInnerStyles: {
    height: theme.SIZES.RADIO_HEIGHT * 0.5,
    width: theme.SIZES.RADIO_WIDTH * 0.5,
    borderRadius: theme.SIZES.RADIO_HEIGHT * 0.25,
  },
  disabledRadioOuter: {
    borderColor: theme.COLORS.MUTED,
  },
  disabledRadioInner: {
    backgroundColor: theme.COLORS.MUTED,
  },
  textStyles: {
    color: theme.COLORS.BLACK,
  },
  disabledLabel: {
    color: theme.COLORS.MUTED,
    opacity: theme.SIZES.OPACITY,
  },
});

Radio.defaultProps = {
  color: 'primary',
  checked: false,
  containerStyle: null,
  radioOuterStyle: null,
  radioInnerStyle: null,
  disabled: false,
  flexDirection: 'row',
  initialValue: false,
  labelStyle: null,
  onChange: () => { },
  styles: {},
};

Radio.propTypes = {
  color: PropTypes.string,
  checked: PropTypes.bool,
  containerStyle: PropTypes.any,
  radioOuterStyle: PropTypes.any,
  radioInnerStyle: PropTypes.any,
  disabled: PropTypes.bool,
  flexDirection: PropTypes.oneOfType([
    PropTypes.oneOf(['row', 'row-reverse', 'column', 'column-reverse']),
    PropTypes.string,
  ]),
  initialValue: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.any,
  onChange: PropTypes.func,
  styles: PropTypes.any,
  theme: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default withGalio(Radio, styles);
