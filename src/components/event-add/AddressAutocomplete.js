import PropTypes from 'prop-types';
import React from 'react';
import {
  Block, Button, Icon, withGalio,
} from 'galio-framework';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Modal, Text, StyleSheet, TouchableOpacity, View,
} from 'react-native';

import AppConstants from '../../app/app.constants';
import { translate } from '../../i18n/i18n';

const AddressAutocomplete = ({
  isVisible, location, onClose, onSelect, styles, theme,
}) => {
  const onItemSlected = (data, details = null) => {
    onSelect({ data, details });
  };

  const renderRow = (rowData) => (
    <>
      <View style={styles.itemLeftCol}>
        <Text>{rowData.structured_formatting.main_text}</Text>
        <Text style={styles.itemSecondaryText}>{rowData.structured_formatting.secondary_text}</Text>
      </View>
      <View style={styles.itemRightCol}>
        <Text style={styles.itemSecondaryText}>{`${(rowData.distance_meters / 1000).toFixed(2)}km`}</Text>
      </View>
    </>
  );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Block style={styles.container}>
        <Block row>
          <TouchableOpacity>
            <Button
              onPress={onClose}
              iconFamily="Entypo"
              icon="chevron-with-circle-left"
              iconColor={theme.COLORS.BLACK}
              onlyIcon
              color="transparent"
              iconSize={30}
              hitSlop={{
                top: 10, left: 10, bottom: 10, right: 10,
              }}
            />
          </TouchableOpacity>
        </Block>

        <GooglePlacesAutocomplete
          placeholder={translate('event.search.location')}
          minLength={2} // minimum length of text to search
          autoFocus
          returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails
          // renderDescription={(row) => row.description} // custom description render
          onPress={onItemSlected}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: AppConstants.KEYS.google,
            language: 'fr', // language of the results
            types: 'establishment', // default: 'geocode'
            origin: location && location.coords ? `${location.coords.latitude},${location.coords.longitude}` : null,
            components: 'country:fr',
          }}

          styles={{
            textInputContainer: {
              width: '100%',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              backgroundColor: theme.COLORS.WHITE,
              padding: 5,
            },
            textInput: {
              height: 44,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              borderWidth: 1,
            },
            listView: {
              marginTop: 20,
            },
            row: {
              height: 80,
              alignItems: 'center',
            },
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: theme.COLORS.PRIMARY,
            },
          }}

          renderRow={renderRow}

          enablePoweredByContainer={false}

          // currentLocation // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Ma position"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'cafe',
          }}

          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => <Icon name="pin-3" family="Galio" color="#000" size={10} />}
        />
      </Block>
    </Modal>
  );
};

AddressAutocomplete.propTypes = {
  isVisible: PropTypes.bool,
  location: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

AddressAutocomplete.defaultProps = {
  isVisible: false,
  location: null,
};

const styles = (theme) => StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
  },
  itemLeftCol: {
    flex: 1,
    justifyContent: 'center',
  },
  itemRightCol: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  itemSecondaryText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: theme.COLORS.MUTED,
  },
});

export default withGalio(AddressAutocomplete, styles);
