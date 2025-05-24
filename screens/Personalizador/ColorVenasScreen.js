import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const coloresPastel = {
  verde: '#CDE7B0',
  azul: '#A9CFF7',
  ambos: '#C4C6E7',
};

const coloresFuertes = {
  verde: '#88c070',
  azul: '#5a9bd4',
  ambos: '#6a6edc',
};

const coloresBotonPastel = {
  Cálido: '#FFD8A8',
  Frío: '#A8CFFD',
  Neutro: '#A8D5A2',
};

const coloresBotonFuerte = {
  Cálido: '#FFA500',
  Frío: '#4A90E2',
  Neutro: '#4CAF50',
};

export default function ColorVenasScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};
  const [venas, setVenas] = useState(datosUsuario.colorVenas || null);
  const [subtono, setSubtono] = useState(datosUsuario.subtonoPiel || null);

  const detectarSubtono = (color) => {
    if (color === 'verde') return 'Cálido';
    if (color === 'azul') return 'Frío';
    return 'Neutro';
  };

  const handleSeleccion = (color) => {
    setVenas(color);
    setSubtono(detectarSubtono(color));
  };

  useEffect(() => {
    if (venas) {
      setSubtono(detectarSubtono(venas));
    }
  }, [venas]);

  const handleSiguiente = () => {
    if (subtono) {
      navigation.navigate('Contraste', {
        datosUsuario: {
          ...datosUsuario,
          colorVenas: venas,
          subtonoPiel: subtono,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>¿De qué color son tus venas?</Text>
        <Text style={styles.subtitle}>(Observa tus muñecas con luz natural)</Text>

        <View style={styles.grid}>
          {Object.keys(coloresPastel).map((key) => {
            const seleccionado = venas === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: seleccionado ? coloresFuertes[key] : coloresPastel[key],
                    borderColor: seleccionado ? '#ff7eb9' : 'transparent',
                    borderWidth: seleccionado ? 3 : 2,
                  },
                ]}
                onPress={() => handleSeleccion(key)}
                activeOpacity={0.8}
              />
            );
          })}
        </View>

        {subtono && (
          <Text style={styles.resultText}>
            Tu subtono es: <Text style={styles.bold}>{subtono}</Text>
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            !venas && styles.buttonDisabled,
            venas && {
              backgroundColor: coloresBotonFuerte[subtono] || '#ccc',
              borderColor: coloresBotonPastel[subtono] || '#ccc',
            },
          ]}
          onPress={handleSiguiente}
          disabled={!venas}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const CIRCLE_SIZE = 70;

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
    marginBottom: 10,
    textAlign: 'center',
    color: '#ff4081',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  colorCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    marginHorizontal: 15,
    borderWidth: 2,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
    fontWeight: '600',
  },
  bold: {
    fontWeight: 'bold',
    color: '#ff7eb9',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    borderWidth: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
