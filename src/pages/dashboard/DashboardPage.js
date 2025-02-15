import PropTypes from 'prop-types';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Block, Button, Card, withGalio,
} from 'galio-framework';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppTheme from '../../app/app.theme';
import HeaderWavy from '../../components/header/HeaderWavy';

const { width } = Dimensions.get('screen');

const styles = {
  container: {
    backgroundColor: AppTheme.COLORS.WHITE,
  },
  cards: {
    width,
    backgroundColor: AppTheme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    width: width - AppTheme.SIZES.BASE * 2,
    marginVertical: AppTheme.SIZES.BASE * 0.875,
  },
  card: {
    backgroundColor: AppTheme.COLORS.WHITE,
    width: width - AppTheme.SIZES.BASE * 2,
    marginVertical: AppTheme.SIZES.BASE * 0.875,
    elevation: AppTheme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: AppTheme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: AppTheme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: AppTheme.SIZES.BASE * 0.5,
  },
};

const cards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?&w=1200&h=1600&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490049350474-498de43bc885?&w=1600&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    padded: true,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1493612216891-65cbf3b5c420?&w=1500&h=900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=1500&h=1900&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
  },
];

const DashboardPage = ({ theme }) => (
  <Block flex style={styles.container}>
    <HeaderWavy title="Dashboard">
      <Button
        onPress={() => {}}
        iconFamily="AntDesign"
        icon="filter"
        iconColor="#ffffff"
        onlyIcon
        color="transparent"
        iconSize={30}
        hitSlop={{
          top: 5, left: 5, bottom: 5, right: 5,
        }}
        style={{ alignSelf: 'flex-start', marginTop: 20 }}
      />
    </HeaderWavy>

    <ScrollView contentContainerStyle={styles.cards}>
      <Block flex space="between">
        {cards.map((card, id) => (
          <TouchableOpacity style={styles.cardContainer} onPress={() => Actions.eventDetails({ event: card })}>
            <Card
              key={`card-${card.image}`}
              flex
              borderless
              shadowColor={theme.COLORS.BLACK}
              titleColor={card.full ? theme.COLORS.WHITE : null}
              style={styles.card}
              title={card.title}
              caption={card.caption}
              location={card.location}
              avatar={`${card.avatar}?${id}`}
              image={card.image}
              imageStyle={[card.padded ? styles.rounded : null]}
              imageBlockStyle={[
                card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
                card.full ? null : styles.noRadius,
              ]}
              footerStyle={card.full ? styles.full : null}
            >
              {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
            </Card>
          </TouchableOpacity>
        ))}
      </Block>
    </ScrollView>
  </Block>
);

DashboardPage.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withGalio(DashboardPage);
