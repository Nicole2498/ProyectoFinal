import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function IntroHairScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💇‍♀️</Text>
      <Text style={styles.title}>¡Bienvenida a tu asesoría de cabello!</Text>
      <Text style={styles.description}>
        Sabemos lo importante que es elegir el peinado ideal. Por eso, analizamos tus rasgos y preparamos estilos que te favorecerán seguro.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hair')}>
        <Text style={styles.buttonText}>✨ Ver mis estilos sugeridos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff4081',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#ff4081',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
