import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-native-swiper';
import {
  Block, Input, withGalio,
} from 'galio-framework';
import { Dimensions, View } from 'react-native';

import AddressSlide from '../../components/event-add/slides/Address';
import AppTheme from '../../app/app.theme';
import CategorySlide from '../../components/event-add/slides/Category';
import HeaderWavy from '../../components/header/HeaderWavy';
import PlanificationSlide from '../../components/event-add/slides/Planification';
import { translate } from '../../i18n/i18n';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: AppTheme.COLORS.WHITE,
  },
  slide: {
    width,
    flex: 1,
    backgroundColor: AppTheme.COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  slideTitle: {
    marginBottom: 30,
  },
};

const EventAddPage = ({ theme }) => {
  const swiper = React.createRef();

  const [category, setCategory] = React.useState(1);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  const next = () => {
    swiper.current.scrollBy(1);
  };

  return (
    <Block flex style={styles.container}>
      <HeaderWavy title={translate('event.addAnEvent')} />

      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        scrollEnabled={false}
        ref={swiper}
      >
        <CategorySlide
          value={category}
          onChange={setCategory}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
        />

        <PlanificationSlide
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
        />

        <AddressSlide
          value={address}
          onChange={setAddress}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
        />

        <View style={styles.slide2}>
          <Input
            placeholder={translate('event.title')}
          />

          <Input
            placeholder={translate('event.price')}
          />

          <Input
            placeholder={translate('event.limit')}
          />

          <Input
            placeholder={translate('event.description')}
            multiline
          />
        </View>
      </Swiper>
    </Block>
  );
};

EventAddPage.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withGalio(EventAddPage);
