import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  withDecay,
  Easing,
} from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const initialIndicator = useSharedValue(1);
  const moonScale = useSharedValue(-120);
  const screenHeight = Dimensions.get('screen').height;
  const screenWidth = Dimensions.get('screen').width;
  const [isLightMode, setLightMode] = useState(true);

  const indicatorStyle = useAnimatedStyle(() => {
    const opacity = interpolate(initialIndicator.value, [0, 85], [1, 0.3]);
    return { left: initialIndicator.value, opacity };
  });

  const moonScaleStyle = useAnimatedStyle(() => {
    const topValue = interpolate(moonScale.value, [-120, -10], [-50, 0]);
    return {
      top: topValue,
      right: moonScale.value,
    };
  });

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: isLightMode ? '#f7f7f7' : 'black',
        },
      ]}>
      <View
        style={[
          styles.mainContent,
          {
            height: screenHeight * 0.85,
          },
        ]}>
        <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={isLightMode ? ["#f03e3e", "#e64980"] : ['#4c669f', '#3b5998', '#192f6a']} style={styles.sunStyle}>
          <Animated.View
            style={[
              moonScaleStyle,
              {
                backgroundColor: isLightMode ? '#f7f7f7' : 'black',
              },
              styles.moonStyle,
            ]}></Animated.View>
        </LinearGradient>
        {/**
         * ////normal popup text
         */}
        <Text style={{ marginTop: 50, fontSize: 20, fontWeight: 'bold', color: isLightMode ? 'black' : 'white' }} >Choose a Style</Text>
        <View style={{ marginVertical: 30 }}>
          <Text style={{ color: `${isLightMode ? 'black' : 'white'}` }}>
            Pop or Subtle. Day or night.
          </Text>
          <Text style={{ color: `${isLightMode ? 'black' : 'white'}` }}>
            Customize your interface.
          </Text>
        </View>

        {/**
         * ////sliding content
         */}
        <View
          style={[
            {
              backgroundColor: isLightMode ? 'gray' : 'black',
              width: screenWidth * 0.5,
              shadowColor: "#000",
              elevation: 2,
              shadowOffset: {
                height: 2,
                width: -2
              }
            },
            styles.slider,
          ]}>
          <Animated.View
            style={[
              indicatorStyle,
              styles.animatedSliderContainer,
            ]}></Animated.View>
          <View
            onTouchEnd={() => {
              setLightMode(true);
              initialIndicator.value = withTiming(0);
              moonScale.value = withTiming(-120, {
                duration: 400,
              });
            }}
            style={styles.sliderContent}>
            <Text
              style={{
                textAlign: 'center',
                color: isLightMode ? 'black' : 'white',
              }}>
              Light
            </Text>
          </View>
          <View
            onTouchEnd={() => {
              setLightMode(false);
              initialIndicator.value = withTiming(85);
              moonScale.value = withTiming(-10, {
                duration: 400
              });
            }}
            style={styles.sliderContent}>
            <Text style={{ textAlign: 'center', color: 'white' }}>Dark</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ color: isLightMode ? 'black' : 'white' }} >Skip</Text>
      </View>
      <StatusBar
        backgroundColor={isLightMode ? 'white' : 'black'}
        barStyle={isLightMode ? 'dark-content' : 'light-content'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  mainContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunStyle: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  moonStyle: {
    height: 130,
    width: 130,
    position: 'absolute',
    zIndex: 1500,
    borderRadius: 100,
  },
  slider: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
  },
  animatedSliderContainer: {
    position: 'absolute',
    height: 42,
    width: 100,
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 1000,
  },
  sliderContent: {
    zIndex: 1500,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});

export default App;
