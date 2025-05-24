// screens/Personalizador/SeleccionarRostroScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const tiposDeRostro = [
  'Ovalado',
  'Redondo',
  'Cuadrado',
  'Rectangular',
  'Diamante',
  'Triángulo',
  'Corazón',
  'Trapecio',
];

export default function SeleccionarRostroScreen({ navigation }) {
  const [seleccionado, setSeleccionado] = useState(null);

  const handleSiguiente = () => {
    if (seleccionado) {
      navigation.navigate('ColorOjos', { tipoRostro: seleccionado });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu tipo de rostro</Text>
      <FlatList
        data={tiposDeRostro}
        keyExtractor={(item) => item}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.item,
              seleccionado === item && styles.itemSeleccionado,
            ]}
            onPress={() => setSeleccionado(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, !seleccionado && styles.buttonDisabled]}
          onPress={handleSiguiente}
          disabled={!seleccionado}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  list: { justifyContent: 'center' },
  item: {
    flex: 1,
    margin: 8,
    paddingVertical: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemSeleccionado: {
    backgroundColor: '#ff7eb9',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ff7eb9',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 15,
  },
  backText: {
    fontSize: 16,
    color: '#555',
  },
});
