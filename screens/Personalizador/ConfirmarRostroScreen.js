import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ConfirmarRostroScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};
  const tipoRostro = datosUsuario.tipoRostro || 'Ovalado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Confirmas tu tipo de rostro?</Text>
      <Text style={styles.tipoRostro}>{tipoRostro}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ColorOjos', { datosUsuario })
          }
        >
          <Text style={styles.buttonText}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() =>
            navigation.navigate('CambiarRostro', { datosUsuario })
          }
        >
          <Text style={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    paddingTop: 100,
    backgroundColor: '#fff0f6', // fondo suave rosa pastel
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#ff4081',
  },
  tipoRostro: { 
    fontSize: 22, 
    color: '#ff7eb9', 
    marginBottom: 40,
    fontWeight: '600',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    gap: 20,
  },
  button: {
    backgroundColor: '#ff7eb9',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    shadowColor: '#ff7eb9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#ffc2d1',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
