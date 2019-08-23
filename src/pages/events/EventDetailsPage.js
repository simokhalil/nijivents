import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Block,
  Card,
  Text,
  Icon,
} from 'galio-framework';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import AppTheme from '../../app/app.theme';
import HeaderWavy from '../../components/header/HeaderWavy';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppTheme.COLORS.WHITE,
    borderTopLeftRadius: AppTheme.SIZES.BASE * 2,
    borderTopRightRadius: AppTheme.SIZES.BASE * 2,
    paddingVertical: AppTheme.SIZES.BASE * 2,
    paddingHorizontal: AppTheme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: Constants.statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - AppTheme.SIZES.BASE * 2,
    height: AppTheme.SIZES.BASE * 4,
    marginVertical: AppTheme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: AppTheme.SIZES.BASE / 2,
  },
  avatar: {
    width: AppTheme.SIZES.BASE * 2.5,
    height: AppTheme.SIZES.BASE * 2.5,
    borderRadius: AppTheme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: AppTheme.SIZES.FONT * 0.875,
    lineHeight: AppTheme.SIZES.FONT * 1.25,
  },
});

const EventDetails = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <>
      <ImageBackground
        source={{ uri: event.image }}
        style={{
          width,
          height: height * 0.55,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <HeaderWavy transparent />

      <ScrollView style={{ flex: 1, marginTop: -AppTheme.SIZES.BASE * 2, borderRadius: AppTheme.SIZES.BASE * 1.25 }}>
        <StatusBar barStyle="light-content" />

        <Block flex style={{ paddingTop: (height * 0.55) - 200 }}>
          <Block flex style={styles.header}>
            <Block>
              <Text size={AppTheme.SIZES.BASE * 1.875}>{event.title}</Text>
              <Text muted t size={AppTheme.SIZES.BASE * 0.875} style={{ marginTop: AppTheme.SIZES.BASE, fontWeight: '500' }}>
                {event.caption}
              </Text>
            </Block>

            <Block center>
              <Card
                borderless
                style={styles.stats}
                title={event.title}
                caption={event.caption}
                avatar={event.avatar}
                location={(
                  <Block row right>
                    <Block row middle style={{ marginHorizontal: AppTheme.SIZES.BASE }}>
                      <Icon name="eye" family="font-awesome" color={AppTheme.COLORS.MUTED} size={AppTheme.SIZES.FONT * 0.875} />
                      <Text
                        p
                        color={AppTheme.COLORS.MUTED}
                        size={AppTheme.SIZES.FONT * 0.875}
                        style={{ marginLeft: AppTheme.SIZES.BASE * 0.25 }}
                      >
                        25.6k
                      </Text>
                    </Block>
                    <Block row middle>
                      <Icon name="heart" family="font-awesome" color={AppTheme.COLORS.MUTED} size={AppTheme.SIZES.FONT * 0.875} />
                      <Text
                        p
                        color={AppTheme.COLORS.MUTED}
                        size={AppTheme.SIZES.FONT * 0.875}
                        style={{ marginLeft: AppTheme.SIZES.BASE * 0.25 }}
                      >
                        936
                      </Text>
                    </Block>
                  </Block>
                )}
              />
            </Block>

            <Block>
              <Text style={styles.text}>
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.

                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
                You should totally like check this out, ok? Why would you use another UI
                library when you have so many components written by Creative Tim and the
                whole React Native community. Galio was created by developers for
                developers.
              </Text>

              <Text style={styles.text}>
                {"A lot of Bacon. I'd really like to eat like a LOT of Bacon :(."}
              </Text>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </>
  );
};

EventDetails.propTypes = {
  event: PropTypes.object,
};

EventDetails.defaultProps = {
  event: null,
};

export default EventDetails;
