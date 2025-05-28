import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from '../../context/UserContext'; 

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
  const { datosUsuario, setDatosUsuario } = useContext(UserContext);
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
      setDatosUsuario({ ...datosUsuario, subtonoPiel: subtono });
      navigation.navigate('Contraste');
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
          <TouchableOpacity
            style={styles.circleGroup}
            onPress={() => handleSeleccion('azul')}
            activeOpacity={0.8}
          >
            <View style={[
              styles.colorCircle,
              {
                backgroundColor: '#B093C1', 
                borderColor: venas === 'azul' ? '#ff7eb9' : 'transparent',
                borderWidth: 2,
                marginRight: -10,
                zIndex: 2,
              }
            ]}/>
            <View style={[
              styles.colorCircle,
              {
                backgroundColor: '#4878A9', 
                borderColor: venas === 'azul' ? '#ff7eb9' : 'transparent',
                borderWidth: 2,
                zIndex: 1,
              }
            ]}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleGroup}
            onPress={() => handleSeleccion('ambos')}
            activeOpacity={0.8}
          >
            {['#4878A9', '#5D99B1', '#759789'].map((color, i) => (
              <View
                key={i}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderColor: venas === 'ambos' ? '#ff7eb9' : 'transparent',
                    borderWidth: 2,
                    marginLeft: i > 0 ? -20 : 0,
                    zIndex: 3 - i,
                  },
                ]}
              />
            ))}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleGroup}
            onPress={() => handleSeleccion('verde')}
            activeOpacity={0.8}
          >
            {['#759789', '#A59B80'].map((color, i) => (
              <View
                key={i}
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: color,
                    borderColor: venas === 'verde' ? '#ff7eb9' : 'transparent',
                    borderWidth: 2,
                    marginLeft: i > 0 ? -20 : 0,
                    zIndex: 2 - i,
                  },
                ]}
              />
            ))}
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  circleGroup: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
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
