import PropTypes from 'prop-types';
import React from 'react';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Button } from 'galio-framework';
import {
  Dimensions, Image, ImageBackground, StyleSheet, Text, View,
} from 'react-native';
import { connect } from 'react-redux';

import AppColors from '../../app/app.colors';
import AppConstants from '../../app/app.constants';
import HeaderBg from '../../assets/images/header-bg.png';
import LogoWhite from '../../assets/images/nijivents-logo_white.png';
import PolygonsImage from '../../assets/images/polygons.png';
import WaveImage from '../../assets/images/wave5.png';
import { auth } from '../../firebase';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerbar: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  background: {
    height: 130,
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'contain',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  title: {
    flex: 1,
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
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
  currentUser,
  title,
  isLarge,
  style,
  transparent,
  withLogo,
  withPolygons,
  withGreeting,
}) => {
  const logout = () => {
    try {
      auth.doSignOut();
      Actions[AppConstants.ROUTES.login]({
        type: ActionConst.RESET,
      });
    } catch (error) {
      console.log('error loging out user', error);
    }
  };

  return (
    <View style={{ height: isLarge ? height * 0.75 : 150, ...style }}>
      {!transparent && (
        <Image source={HeaderBg} style={[styles.background]} />
      )}

      <View style={[styles.headerbar]}>
        {
          currentRouteIndex > 0
            ? (
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
            )
            : <View style={{ width: 40 }} />
        }

        <Text style={styles.title}>{title}</Text>

        {
          currentUser
            ? (
              <Button
                onPress={logout}
                iconFamily="AntDesign"
                icon="setting"
                iconColor="#ffffff"
                onlyIcon
                color="transparent"
                iconSize={30}
                hitSlop={{
                  top: 10, left: 10, bottom: 10, right: 10,
                }}
              />
            )
            : <View style={{ width: 40 }} />
        }

      </View>

      <View style={styles.headerContent}>
        {withGreeting && !!currentUser && (
          <Text style={{ fontFamily: 'museo-bold', fontSize: 30 }}>
            Bonjour {currentUser.name},
          </Text>
        )}
      </View>

    </View>

  );
};

HeaderWavy.propTypes = {
  children: PropTypes.any,
  currentRouteIndex: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  title: PropTypes.string,
  isLarge: PropTypes.bool,
  style: PropTypes.object,
  transparent: PropTypes.bool,
  withLogo: PropTypes.bool,
  withPolygons: PropTypes.bool,
  withGreeting: PropTypes.bool,
};

HeaderWavy.defaultProps = {
  children: null,
  currentUser: null,
  title: '',
  isLarge: false,
  style: {},
  transparent: false,
  withLogo: false,
  withPolygons: false,
  withGreeting: false,
};

const mapStateToProps = (state) => ({
  currentRouteIndex: state.router.currentSceneIndex,
  currentUser: state.users.authUser,
});

export default connect(mapStateToProps)(
  HeaderWavy,
);
