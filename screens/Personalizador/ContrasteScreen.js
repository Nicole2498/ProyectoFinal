import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';

export default function ContrasteScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};
  const [contraste, setContraste] = useState(datosUsuario.contraste || null);

  const handleSeleccion = (nivel) => {
    setContraste(nivel);
  };

  const handleSiguiente = () => {
    if (contraste) {
      navigation.navigate('Resumen', {
        datosUsuario: {
          ...datosUsuario,
          contraste,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>¿Cuál es tu nivel de contraste?</Text>
        <Text style={styles.subtitle}>
          El contraste es la diferencia entre el color de tu piel, ojos y cabello.
        </Text>

        <View style={styles.guiaContainer}>
          <Text style={styles.guiaTitle}>Guía rápida:</Text>
          <View style={styles.separator} />
          <Text style={styles.guiaText}>• Bajo: tonos similares (piel clara + cabello claro).</Text>
          <View style={styles.separator} />
          <Text style={styles.guiaText}>• Medio: algo de diferencia (piel clara + cabello castaño).</Text>
          <View style={styles.separator} />
          <Text style={styles.guiaText}>• Alto: gran diferencia (piel clara + cabello oscuro).</Text>
        </View>

        <View style={styles.opcionesContainer}>
          {['Bajo', 'Medio', 'Alto'].map((nivel) => (
            <Pressable
              key={nivel}
              style={({ pressed }) => [
                styles.opcion,
                contraste === nivel && styles.opcionSeleccionada,
                pressed && styles.opcionPressed,
              ]}
              onPress={() => handleSeleccion(nivel)}
              android_ripple={{ color: '#ff7eb9' }}
            >
              <Text style={[styles.opcionTexto, contraste === nivel && styles.opcionTextoSeleccionado]}>
                {nivel}
              </Text>
            </Pressable>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, !contraste && styles.buttonDisabled]}
          onPress={handleSiguiente}
          disabled={!contraste}
          activeOpacity={0.85}
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 10,
    shadowColor: '#ff7eb9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  backText: {
    fontSize: 17,
    color: '#ff4081',
    fontWeight: '700',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
    color: '#ff4081',
    textShadowColor: 'rgba(255,64,129,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#7d7d7d',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  guiaContainer: {
    width: '100%',
    backgroundColor: '#fff4f9',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 40,
    shadowColor: '#ffb7d1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  guiaTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
    color: '#d93b7c',
    textAlign: 'center',
  },
  guiaText: {
    fontSize: 15,
    color: '#5c5c5c',
    marginVertical: 8,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#ffcae1',
    marginVertical: 4,
    borderRadius: 1,
  },
  opcionesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 50,
  },
  opcion: {
    borderWidth: 2,
    borderColor: '#e8c9db',
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 18,
    backgroundColor: '#fff',
    shadowColor: '#f9c4db',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionSeleccionada: {
    borderColor: '#ff7eb9',
    backgroundColor: '#ffe2ef',
    shadowColor: '#ff7eb9',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  opcionPressed: {
    opacity: 0.7,
  },
  opcionTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6a6a6a',
  },
  opcionTextoSeleccionado: {
    color: '#ff4081',
  },
  button: {
    backgroundColor: '#ff7eb9',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 24,
    alignSelf: 'center',
    shadowColor: '#ff7eb9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.75,
    shadowRadius: 14,
    elevation: 12,
  },
  buttonDisabled: {
    backgroundColor: '#d6d6d6',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
  },
});
