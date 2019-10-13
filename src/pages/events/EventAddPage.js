import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-native-swiper';
import {
  Block, Input, withGalio,
} from 'galio-framework';
import { Dimensions, Text, View } from 'react-native';

import AddressSlide from '../../components/event-add/slides/Address';
import AppStyles from '../../app/app.styles';
import AppTheme from '../../app/app.theme';
import CategorySlide from '../../components/event-add/slides/Category';
import Header from '../../components/header/Header';
import HeaderWavy from '../../components/header/HeaderWavy';
import PlanificationStartSlide from '../../components/event-add/slides/PlanificationStart';
import PlanificationEndSlide from '../../components/event-add/slides/PlanificationEnd';
import { translate } from '../../i18n/i18n';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    backgroundColor: AppTheme.COLORS.WHITE,
  },
  title: {
    ...AppStyles.pageTitle,
  },
  slide: {
    width,
    flex: 1,
    backgroundColor: AppTheme.COLORS.WHITE,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
  },
  slideTitle: {
    fontFamily: 'museo-bold',
    marginBottom: 30,
  },
};

const EventAddPage = ({ theme }) => {
  const swiper = React.createRef();

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const [category, setCategory] = React.useState(1);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [address, setAddress] = React.useState(null);

  const step = {
    index: currentStepIndex,
    isFirst: currentStepIndex === 0,
    isLast: swiper.current ? currentStepIndex === swiper.current.props.children.length - 1 : false,
  };

  const next = () => {
    swiper.current.scrollBy(1);
  };

  const previous = () => {
    swiper.current.scrollBy(-1);
  };

  console.log('swiper.current', swiper.current);
  console.log('step', step);

  return (
    <Block flex style={styles.container}>
      <Header />

      <Text style={styles.title}>{translate('event.addAnEvent')}</Text>

      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        loop={false}
        scrollEnabled={false}
        ref={swiper}
        onIndexChanged={setCurrentStepIndex}
      >
        <CategorySlide
          value={category}
          onChange={setCategory}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
          step={step}
          onPrevious={previous}
        />

        <PlanificationStartSlide
          onDateChanged={setStartDate}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
          step={step}
          onPrevious={previous}
        />

        <PlanificationEndSlide
          onDateChanged={setEndDate}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
          step={step}
          onPrevious={previous}
        />

        <AddressSlide
          value={address}
          onChange={setAddress}
          onValidate={next}
          style={styles.slide}
          titleStyle={styles.slideTitle}
          step={step}
          onPrevious={previous}
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
