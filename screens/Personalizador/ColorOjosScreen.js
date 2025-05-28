import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/UserContext'; 

const coloresOjos = [
  '#1396A6', '#2E4C6E', '#6C7191', '#9B9DAA',
  '#BCB587', '#7A7E65', '#6A6045', '#5E941C',
  '#948418', '#524124', '#7F3E14', '#120E08'
];

export default function ColorOjosScreen({ navigation }) {
  const { datosUsuario, setDatosUsuario } = useContext(UserContext);
  const [colorSeleccionado, setColorSeleccionado] = useState(datosUsuario.colorOjos || null);

  const handleSiguiente = () => {
    if (colorSeleccionado) {
      setDatosUsuario({ ...datosUsuario, colorOjos: colorSeleccionado });
      navigation.navigate('ColorCabello'); // sin params
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

      <View style={styles.content}>
        <Text style={styles.title}>¿Cuál es el color de tus ojos?</Text>

        <View style={styles.grid}>
          {coloresOjos.map((color, index) => (
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
      </View>
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
    top: 70,
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
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
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
