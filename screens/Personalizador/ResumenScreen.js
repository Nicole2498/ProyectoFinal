import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const colorMapOjos = {
  Azul: '#3b82f6',
  Verde: '#22c55e',
  'Cafe claro': '#c19a6b',
  'Cafe oscuro': '#5c4033',
  Negro: '#000000',
  Miel: '#d2996e',
  Turqueza: '#40e0d0',
};

const colorMapCabello = {
  Negro: '#000000',
  Castaño: '#654321',
  Rubio: '#f3e5ab',
  Rojo: '#b22222',
  Gris: '#b0b0b0',
  Azul: '#0000ff',
  Verde: '#008000',
  Rosa: '#ff69b4',
};

const colorMapPiel = {
  Claro: '#f7e7ce',
  Medio: '#c68642',
  Oscuro: '#603813',
};

const colorMapSubtono = {
  Cálido: '#ffb347',
  Frío: '#89cff0',
  Neutro: '#d3d3d3',
};

const colorMapContraste = {
  Bajo: '#a0aec0',
  Medio: '#718096',
  Alto: '#2d3748',
};

export default function ResumenScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};

  const {
    tipoRostro,
    colorOjos,
    colorCabello,
    tonoPiel,
    subtonoPiel,
    contraste,
  } = datosUsuario;

  const CirculoColor = ({ color }) => (
    <View style={[styles.circulo, { backgroundColor: color }]} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Resumen de tu personalización</Text>

      <View style={styles.fila}>
        <Text style={styles.label}>Tipo de rostro:</Text>
        <Text style={styles.valor}>{tipoRostro || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Color de ojos:</Text>
        <CirculoColor color={colorMapOjos[colorOjos] || '#ccc'} />
        <Text style={styles.valorColor}>{colorOjos || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Color de cabello:</Text>
        <CirculoColor color={colorMapCabello[colorCabello] || '#ccc'} />
        <Text style={styles.valorColor}>{colorCabello || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Tono de piel:</Text>
        <CirculoColor color={colorMapPiel[tonoPiel] || '#ccc'} />
        <Text style={styles.valorColor}>{tonoPiel || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Subtono de piel:</Text>
        <CirculoColor color={colorMapSubtono[subtonoPiel] || '#ccc'} />
        <Text style={styles.valorColor}>{subtonoPiel || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Contraste:</Text>
        <CirculoColor color={colorMapContraste[contraste] || '#ccc'} />
        <Text style={styles.valorColor}>{contraste || 'No especificado'}</Text>
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={styles.botonTexto}>Terminar y volver al inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 50,
    backgroundColor: '#fff0f6',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 35,
    textAlign: 'center',
    color: '#ff4081',
    textShadowColor: 'rgba(255,64,129,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: '#ffb7d1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#d6336c',
  },
  valor: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a4a4a',
    maxWidth: 130,
    textAlign: 'right',
  },
  valorColor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
    maxWidth: 100,
    textAlign: 'left',
  },
  circulo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d6336c',
  },
  boton: {
    marginTop: 50,
    backgroundColor: '#ff7eb9',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#ff7eb9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
    elevation: 12,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
});
