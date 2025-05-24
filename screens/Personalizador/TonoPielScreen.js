import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const tonosPiel = [
  '#FBE8EB', // Muy claro
  '#F7DAD9',
  '#F1C6A9',
  '#E1B07E',
  '#C68642', // Medio
  '#8D5524', // Moreno
  '#6B4423',
  '#4B3621', // Muy oscuro
];

export default function TonoPielScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};
  const [tonoSeleccionado, setTonoSeleccionado] = useState(datosUsuario.tonoPiel || null);

  const handleSiguiente = () => {
    if (tonoSeleccionado) {
      const datosActualizados = {
        ...datosUsuario,
        tonoPiel: tonoSeleccionado,
      };
      navigation.navigate('SubtonoPiel', { datosUsuario: datosActualizados });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Cuál es tu tono de piel?</Text>

        <View style={styles.grid}>
          {tonosPiel.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                tonoSeleccionado === color && styles.selected,
              ]}
              onPress={() => setTonoSeleccionado(color)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !tonoSeleccionado && styles.buttonDisabled]}
          onPress={handleSiguiente}
          disabled={!tonoSeleccionado}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const CIRCLE_SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
    paddingHorizontal: 20,
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
  backText: {
    fontSize: 16,
    color: '#ff4081',
    fontWeight: '600',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff4081',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  colorCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    margin: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#ff7eb9',
    borderWidth: 3,
  },
  button: {
    backgroundColor: '#ff7eb9',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
