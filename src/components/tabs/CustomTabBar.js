import PropTypes from 'prop-types';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Foundation } from '@expo/vector-icons';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import AppColors from '../../app/app.colors';
import AppConstants from '../../app/app.constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 70,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    height: 50,
  },
  tabText: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

const iconKeys = {
  [AppConstants.ROUTES.homeTab]: 'home',
  [AppConstants.ROUTES.favoritesTab]: 'heart',
  [AppConstants.ROUTES.settingsTab]: 'widget',
};

class CustomTabBar extends React.Component {
  renderIcon = (key, isActive) => (
    <Foundation name={iconKeys[key]} size={28} color={isActive ? AppColors.tabs[key].color : 'black'} />
  );

  onTabPress = (key) => {
    Actions[key]();
  }

  render() {
    const { navigation: { state } } = this.props;
    const activeTabIndex = state.index;

    console.log('state.routes', state.routes);

    return (
      <View style={styles.container}>
        {
          state.routes.map((element, index) => (
            <TouchableOpacity
              key={element.key}
              onPress={() => this.onTabPress(element.key, activeTabIndex)}
            >
              <Animatable.View
                transition="backgroundColor"
                style={[
                  styles.tab,
                  {
                    alignSelf: 'flex-start',
                    backgroundColor: index === activeTabIndex ? AppColors.tabs[element.key].highlight : 'transparent',
                  },
                ]}
              >
                {this.renderIcon(element.key, index === activeTabIndex)}

                <Animatable.Text
                  numberOfLines={1}
                  // animation="zoomIn"
                  transition={['width', 'opacity']}
                  duration={500}
                  style={[
                    styles.tabText,
                    {
                      opacity: index === activeTabIndex ? 1 : 0,
                      width: index === activeTabIndex ? 100 : 0,
                      color: index === activeTabIndex ? AppColors.tabs[element.key].color : 'black',
                    },
                  ]}
                >
                  {element.params.title || element.key}
                </Animatable.Text>

              </Animatable.View>
            </TouchableOpacity>
          ))
        }
      </View>
    );
  }
}

CustomTabBar.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default CustomTabBar;
