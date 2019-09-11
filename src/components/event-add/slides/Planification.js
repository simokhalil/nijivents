import DateTimePicker from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Text } from 'galio-framework';
import { ScrollView, View } from 'react-native';
import { format } from 'date-fns';

import NextButton from '../NextButton';
import { translate } from '../../../i18n/i18n';

const DATE_TYPES = {
  START: 'start',
  END: 'end',
};

const PlanificationSlide = ({
  endDate,
  onEndDateChange,
  onStartDateChange,
  onValidate,
  startDate,
  style,
  titleStyle,
}) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = React.useState(false);
  const [dateType, setDateType] = React.useState(DATE_TYPES.START);

  const showDateTimePicker = async (type) => {
    setDateType(type);
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    if (dateType === DATE_TYPES.START) {
      onStartDateChange(date);
    } else {
      onEndDateChange(date);
    }

    hideDateTimePicker();
  };

  return (
    <ScrollView contentContainerStyle={style}>
      <Text h4 style={titleStyle}>{translate('event.whichDates')}</Text>

      <Text>Mon évèvement commence le...</Text>

      <Button
        onPress={() => showDateTimePicker(DATE_TYPES.START)}
        radius={50}
      >
        {startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : translate('event.startDate')}
      </Button>

      <View style={{ height: 30 }} />

      {startDate && (
        <>
          <Text>...et prend fin le</Text>

          <Button
            onPress={() => showDateTimePicker(DATE_TYPES.END)}
            radius={50}
          >
            {endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : translate('event.endDate')}
          </Button>
        </>
      )}

      {startDate && endDate && (
        <NextButton
          label={translate('common.next')}
          onPress={onValidate}
        />
      )}

      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="datetime"
      />
    </ScrollView>
  );
};

PlanificationSlide.propTypes = {
  endDate: PropTypes.any,
  onEndDateChange: PropTypes.func.isRequired,
  onStartDateChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  startDate: PropTypes.any,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
};

PlanificationSlide.defaultProps = {
  endDate: null,
  startDate: null,
  style: {},
  titleStyle: {},
};

export default PlanificationSlide;
