import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { UserContext } from '../../context/UserContext'; // ajusta la ruta

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
  const { datosUsuario, setDatosUsuario } = useContext(UserContext);
  const [seleccionado, setSeleccionado] = useState(datosUsuario.tipoRostro || null);

  const handleSiguiente = () => {
    if (seleccionado) {
      // Actualizar el contexto global
      setDatosUsuario({ ...datosUsuario, tipoRostro: seleccionado });
      navigation.navigate('ColorOjos'); // sin params
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
  container: { flex: 1, padding: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 60 ,marginBottom: 30, textAlign: 'center' },
  list: { justifyContent: 'center' },
  item: {
    flex: 1,
    margin: 8,
    paddingVertical:30,
    backgroundColor: '#eee',
    borderRadius: 50,
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
