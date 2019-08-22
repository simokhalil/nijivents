import PropTypes from 'prop-types';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Button } from 'galio-framework';
import {
  Dimensions, Image, ImageBackground, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';

import LogoWhite from '../../assets/images/nijivents-logo_white.png';
import PolygonsImage from '../../assets/images/polygons.png';
import WaveImage from '../../assets/images/wave5.png';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 40,
    paddingHorizontal: 20,
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
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '100',
    marginTop: 30,
  },
});

const HeaderWavy = ({
  children,
  currentRouteIndex,
  title,
  isLarge,
  withLogo,
  withPolygons,
}) => (

  <View style={{ height: isLarge ? height * 0.75 : 200 }}>
    <ImageBackground source={WaveImage} style={styles.background} imageStyle={{ resizeMode: 'stretch' }}>
      {withPolygons && (
        <Image source={PolygonsImage} style={{ width: '100%', height: '100%', resizeMode: 'contain', position: 'absolute', top: 0, left: 0 }} />
      )}

      <View style={[styles.headerbar]}>
        {currentRouteIndex > 0 && (
          <Button
            onPress={Actions.pop}
            iconFamily="Entypo"
            icon="chevron-with-circle-left"
            iconColor="#ffffff"
            onlyIcon
            color="transparent"
            iconSize={40}
            hitSlop={{
              top: 10, left: 10, bottom: 10, right: 10,
            }}
          />
        )}
        <Text>{title}</Text>
      </View>

      <View style={styles.headerContent}>
        {withLogo && (
          <>
            <Image source={LogoWhite} style={{ width: 100, height: 100 }} />
            <Text style={styles.logoText}>Nijivents</Text>
          </>
        )}
        {children}
      </View>
    </ImageBackground>
  </View>

);

HeaderWavy.propTypes = {
  children: PropTypes.any,
  currentRouteIndex: PropTypes.number.isRequired,
  title: PropTypes.string,
  isLarge: PropTypes.bool,
  withLogo: PropTypes.bool,
  withPolygons: PropTypes.bool,
};

HeaderWavy.defaultProps = {
  children: null,
  title: '',
  isLarge: false,
  withLogo: false,
  withPolygons: false,
};

const mapStateToProps = (state) => ({
  currentRouteIndex: state.router.currentSceneIndex,
});

export default connect(mapStateToProps)(
  HeaderWavy,
);
