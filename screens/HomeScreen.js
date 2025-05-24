import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const circleColors = [
  { start: '#FF50A2', end: '#FF50A2', icon: 'face', label: 'Hair', screen: 'Hair' },
  { start: '#50CEFA', end: '#50CEFA', icon: 'brush', label: 'Makeup', screen: 'Makeup' },
  { start: '#FFB06A', end: '#FFB06A', icon: 'tshirt-crew', label: 'Clothes', screen: 'Clothes' },
  { start: '#FFD87A', end: '#FFD87A', icon: 'palette', label: 'Colors', screen: 'Colors' },
  { start: '#B450F0', end: '#B450F0', icon: 'heart', label: 'Style', screen: 'Style' },
  { start: '#FF576A', end: '#FF576A', icon: 'star', label: 'Tips', screen: 'Tips' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header minimal */}
      <View style={styles.header}>
        <Text style={styles.title}>Combinarte</Text>
      </View>

      {/* Circles */}
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
              <MaterialCommunityIcons name={icon} size={36} color="#fff" style={styles.icon} />
              <Text style={styles.circleText}>{label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
    paddingHorizontal: 12,
    paddingTop: 20,
    justifyContent: 'center', // centrado vertical
    alignItems: 'center',     // centrado horizontal
  },
  header: {
    marginBottom: 40, // más espacio abajo
  },
  title: {
    fontSize: 20,    // un poco más grande
    fontWeight: '600',
    color: '#a8689d',
    letterSpacing: 1.2,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  circlesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8, // usa margin si tu versión RN no soporta gap
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginHorizontal: 6,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 6,
  },
  circleText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
});
