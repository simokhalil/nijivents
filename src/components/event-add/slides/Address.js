import PropTypes from 'prop-types';
import React from 'react';
import {
  Block, Card, Text, withGalio,
} from 'galio-framework';
import {
  Dimensions, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import AddressAutocomplete from '../AddressAutocomplete';
import AppConstants from '../../../app/app.constants';
import NextButton from '../NextButton';
import PreviousButton from '../PreviousButton';
import { translate } from '../../../i18n/i18n';

const { width } = Dimensions.get('window');

class AddressSlide extends React.Component {
  state = {
    isAddressSearchModalVisible: false,
    userLocation: null,
    errorMessage: null,
    location: null,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    console.log('location', userLocation);
    this.setState({ userLocation });
  };

  showAddressSearchModal = () => {
    this.setState({ isAddressSearchModalVisible: true });
  };

  hideAddressSearchModal = () => {
    this.setState({ isAddressSearchModalVisible: false });
  };

  onLocationSelected = (location) => {
    console.log('selected', location);
    this.hideAddressSearchModal();
    this.setState({ location });
  };

  render() {
    const { isAddressSearchModalVisible, userLocation, location } = this.state;
    const {
      style, styles, theme, titleStyle, onChange, onValidate, onPrevious, step,
    } = this.props;

    return (
      <ScrollView contentContainerStyle={style}>
        <Text h4 style={titleStyle}>{translate('event.whichAddress')}</Text>

        {!location && (
          <TouchableOpacity style={styles.searchButton} onPress={this.showAddressSearchModal}>
            <Text style={styles.searchButtonText}>{translate('event.search.location')}</Text>
          </TouchableOpacity>
        )}

        {location && (
          <Block>
            <Card
              borderless
              shadowColor={theme.COLORS.BLACK}
              titleColor={theme.COLORS.WHITE}
              style={styles.card}
              title={location.details.name}
              caption={location.details.formatted_address}
              avatar={location.details.icon}
              image={`https://maps.googleapis.com/maps/api/place/photo?key=${AppConstants.KEYS.google}&maxwidth=${Math.floor(width)}&photoreference=${location.details.photos[0].photo_reference}`}
              footerStyle={styles.full}
            >
              <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} />
            </Card>

            <Text>{`Type: ${location.data.types[0]}`}</Text>
            <Text>{`Latitude: ${location.details.geometry.location.lat}`}</Text>
            <Text>{`Longitude: ${location.details.geometry.location.lng}`}</Text>


          </Block>
        )}

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

        {isAddressSearchModalVisible && (
          <AddressAutocomplete
            isVisible={isAddressSearchModalVisible}
            location={userLocation}
            onClose={this.hideAddressSearchModal}
            onSelect={this.onLocationSelected}
          />
        )}

      </ScrollView>
    );
  }
}

AddressSlide.propTypes = {
  onChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onValidate: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  style: PropTypes.object,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  titleStyle: PropTypes.object,
};

AddressSlide.defaultProps = {
  style: {},
  titleStyle: {},
};

const styles = (theme) => StyleSheet.create({
  searchButton: {
    justifyContent: 'center',
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: theme.SIZES.INPUT_BORDER_RADIUS,
    borderWidth: theme.SIZES.INPUT_BORDER_WIDTH,
    borderColor: theme.COLORS.INPUT,
    height: theme.SIZES.INPUT_HEIGHT,
    paddingHorizontal: theme.SIZES.INPUT_HORIZONTAL,
    width: '100%',
  },
  searchButtonText: {
    color: theme.COLORS.INPUT,
    fontSize: theme.SIZES.INPUT_TEXT,
    textDecorationColor: 'transparent',
    textShadowColor: 'transparent',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
    position: 'relative',
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
    overflow: 'hidden',
    borderTopRightRadius: theme.SIZES.BASE * 0.5,
    borderTopLeftRadius: theme.SIZES.BASE * 0.5,
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default withGalio(AddressSlide, styles);
