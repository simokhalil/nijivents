import Animated, { Easing } from 'react-native-reanimated';
import PropTypes from 'prop-types';
import React from 'react';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { Text } from 'react-native';

const AnimatedButton = ({ onPress }) => {
  const onStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            onPress,
          )
        ])
    }
  ]);
  return (

      <Animated.View
        style={{
          ...styles.button,
          opacity: this.buttonOpacity,
          transform: [{ translateY: this.buttonY }, { perspective: 45 }]
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
      </Animated.View>
  )
}