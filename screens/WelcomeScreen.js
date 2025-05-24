import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#CDEAFA','#F3DDFF', '#FFD6EE', '#FFE2E3', '#FFF2D7']}
      style={styles.container}
    >
      <Text style={styles.title}> Bienvenid@ a Combinarte </Text>
      <Text style={styles.text}>
        Descubre la belleza de ser tú. 
        Analizamos tu estilo, colores y rasgos únicos para guiarte con inspiración.
        Bienvenida a una nueva forma de conocerte.      
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  text: {
    fontSize: 16,
    color: '#5d4037',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    lineHeight: 24,
    maxWidth: 320,
  },
  button: {
    backgroundColor: '#f48fb1',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
