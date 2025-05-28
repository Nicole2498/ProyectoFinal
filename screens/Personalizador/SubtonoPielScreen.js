import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from '../../context/UserContext'; // Ajusta la ruta según tu estructura

export default function SubtonoPielScreen({ navigation }) {
  const { datosUsuario, setDatosUsuario } = useContext(UserContext);
  const [subtono, setSubtono] = useState(datosUsuario.subtonoPiel || null);

  const handleSiguiente = () => {
    if (subtono) {
      setDatosUsuario({ ...datosUsuario, subtonoPiel: subtono });
      
      if (subtono === 'No sé') {
        navigation.navigate('ColorVenas');
      } else if (subtono) {
        navigation.navigate('Contraste');
      }
    }
  };

  

  const opciones = ['Cálido', 'Frío', 'Neutro', 'No sé'];

  // Colores pastel (sin selección)
  const coloresPastel = {
    Cálido: '#FFE5B4',
    Frío: '#B3D9FF',
    Neutro: '#C8E6C9',
    'No sé': '#E0E0E0',
  };

  // Colores fuertes (seleccionado)
  const coloresFuertes = {
    Cálido: '#FFA500',
    Frío: '#4A90E2',
    Neutro: '#4CAF50',
    'No sé': '#999999',
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿Cuál es tu subtono de piel?</Text>

        <View style={styles.optionsContainer}>
          {opciones.map((opcion, index) => {
            const seleccionado = subtono === opcion;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  {
                    backgroundColor: seleccionado
                      ? coloresFuertes[opcion]
                      : coloresPastel[opcion],
                  },
                ]}
                onPress={() => setSubtono(opcion)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: seleccionado ? '#fff' : '#333' },
                  ]}
                >
                  {opcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: subtono ? coloresFuertes[subtono] : '#ccc' },
          ]}
          onPress={handleSiguiente}
          disabled={!subtono}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#ff4081',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
