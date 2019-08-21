import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions, Image, ImageBackground, StyleSheet, Text, View,
} from 'react-native';

import PolygonsImage from '../../assets/images/polygons.png';
import WaveImage from '../../assets/images/wave5.png';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
});

const HeaderWavy = ({ children, title, isLarge }) => (

  <View style={{ height: isLarge ? height * 0.75 : 200 }}>
    <ImageBackground source={WaveImage} style={styles.background} imageStyle={{ resizeMode: 'stretch' }}>
      <Image source={PolygonsImage} style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', top: 0, left: 0 }} />

      <View style={[styles.headerbar]}>
        <Text>{title}</Text>
      </View>

      <View style={styles.headerContent}>
        {children}
      </View>
    </ImageBackground>
  </View>

);

HeaderWavy.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  isLarge: PropTypes.bool,
};

HeaderWavy.defaultProps = {
  children: null,
  title: '',
  isLarge: false,
};

export default HeaderWavy;
