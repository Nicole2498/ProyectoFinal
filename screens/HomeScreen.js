import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const circleColors = [
  { start: '#FFC0CB', end: '#FFC0CB', icon: 'crown', label: 'Hair', screen: 'IntroHair' },
  { start: '#FFD1DC', end: '#FFD1DC', icon: 'brush', label: 'Makeup', screen: 'Makeup' },
  { start: '#FFCCE5', end: '#FFCCE5', icon: 'tshirt-crew', label: 'Style', screen: 'Clothes' },
  { start: '#FFCAE9', end: '#FFCAE9', icon: 'palette', label: 'Colors', screen: 'Colors' },
];

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#F3DDFF', '#F3DDFF', '#FFD6EE', '#FFE2E3', '#FFE2E3']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Combinarte</Text>
      </View>

      <View style={styles.circlesContainer}>
        {circleColors.map(({ label, screen, icon, start, end }) => (
          <TouchableOpacity
            key={label}
            style={[styles.circle, { backgroundColor: start }]}
            onPress={() => navigation.navigate(screen)}
            accessibilityLabel={`Ir a ${label}`}
            activeOpacity={0.85}
          >
            <View style={[styles.innerCircle, { backgroundColor: end }]}>
              <MaterialCommunityIcons name={icon} size={36} color="#FFF6FE" style={styles.icon} />
              <Text style={styles.circleText}>{label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 23,
    fontWeight: '600',
    color: '#8A417B',
    letterSpacing: 1.2,
    fontFamily: 'Ubuntu Sans Mono',
    textAlign: 'center',
  },
  circlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginHorizontal: 6,
    marginVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 132,
    height: 132,
    borderRadius: 66,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 6,
  },
  circleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF6FE',
  },
});
