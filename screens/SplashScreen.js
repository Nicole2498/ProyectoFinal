import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen({ navigation }) {
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#FFE5EC', '#FFD1DC', '#FFCCBC', '#FFF0E1']}
      style={styles.container}
    >
      <Animated.Text style={[styles.logo, { transform: [{ scale }] }]}>
        Combinarte
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // centrado visual
  },
  logo: {
    fontSize: 34,
    fontWeight: '300',
    color: '#d81b60',
    textAlign: 'center',
    letterSpacing: 1.5, // menos interletrado
    fontFamily: 'sans-serif-light',
  },
});
