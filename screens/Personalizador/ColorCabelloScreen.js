import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from '../../context/UserContext'; // ajusta ruta según tu estructura

const coloresCabello = [
  '#000000', '#4B3621', '#A97C50', '#D2B48C', 
  '#D8A45C', '#FFF5B7', '#808080', '#C0C0C0',
  '#A52A2A', '#FF6347', '#FFD700', '#37D617',
  '#8A2BE2', '#DFB6ED', '#ED1E9B', '#F5A9B8', 
  '#3214D6', '#1E99D6', '#30D5C8', '#5F9EA0'  
];

export default function ColorCabelloScreen({ navigation }) {
  const { datosUsuario, setDatosUsuario } = useContext(UserContext);
  const [colorSeleccionado, setColorSeleccionado] = useState(datosUsuario.colorCabello || null);

  const handleSiguiente = () => {
    if (colorSeleccionado) {
      setDatosUsuario({ ...datosUsuario, colorCabello: colorSeleccionado });
      navigation.navigate('TonoPiel'); // sin params
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Cuál es el color de tu cabello?</Text>

        <View style={styles.grid}>
          {coloresCabello.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                colorSeleccionado === color && styles.selected,
              ]}
              onPress={() => setColorSeleccionado(color)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !colorSeleccionado && styles.buttonDisabled]}
          onPress={handleSiguiente}
          disabled={!colorSeleccionado}
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
