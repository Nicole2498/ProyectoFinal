import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Colors({ navigation, route }) {
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    if (route.params?.newColor) {
      const newColor = route.params.newColor;
      setSelectedColors(prev => [...prev, newColor]);
      navigation.setParams({ newColor: null });
    }
  }, [route.params?.newColor]);

  const goToPalette = () => {
    navigation.navigate('Paleta');
  };

  const goToCombination = () => {
    navigation.navigate('CombinacionColor', { baseColors: selectedColors });
  };

  return (
    <LinearGradient
      colors={['#FFF0F5', '#FFE3EC', '#FFD6EB', '#FBE0E6']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Combinar colores</Text>

        <Text style={styles.subtitle}>Selecciona qué color quieres combinar</Text>

        <View style={styles.circlesRow}>
          {selectedColors.map((color, index) => (
            <View key={index} style={[styles.colorCircle, { backgroundColor: color }]} />
          ))}

          <TouchableOpacity style={[styles.colorCircle, styles.addCircle]} onPress={goToPalette}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>

        {selectedColors.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={goToCombination}>
            <Text style={styles.buttonText}>Generar combinaciones</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialCommunityIcons name="home-outline" size={30} color="#8A417B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <MaterialCommunityIcons name="account-circle-outline" size={30} color="#8A417B" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8A417B',
    fontFamily: 'Ubuntu Sans Mono',
    marginTop: 60,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#8A417B',
    textAlign: 'center',
    marginBottom: 25,
  },
  circlesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  colorCircle: {
    width: 100,
    height: 100,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  addCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A417B',
  },
  addText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#8A417B',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 26,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: '#E3B4D0',
    backgroundColor: '#FFF0F5',
  },
});
