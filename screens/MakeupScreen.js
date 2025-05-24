import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MakeupScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.screenCentered}>
        <Text style={styles.screenText}>Makeup</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff0f6',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ffe3ec',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#ff4081',
    fontWeight: '600',
  },
  screenCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff7eb9',
  },
});
