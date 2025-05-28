import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UserContext } from '../../context/UserContext'; 
 
const colorMapOjos = [
  '#1396A6', '#2E4C6E', '#6C7191', '#9B9DAA',
  '#BCB587', '#7A7E65', '#6A6045', '#5E941C',
  '#948418', '#524124', '#7F3E14', '#2E130C', 
];

const colorMapCabello = [
  '#000000', '#4B3621', '#A97C50', '#D2B48C', 
  '#D8A45C', '#FFF5B7', '#808080', '#C0C0C0',
  '#A52A2A', '#FF6347', '#FFD700', '#37D617',
  '#8A2BE2', '#DFB6ED', '#ED1E9B', '#F5A9B8', 
  '#3214D6', '#1E99D6', '#30D5C8', '#5F9EA0'
];

const colorMapPiel = [
  '#FBE8EB', '#F7DAD9', '#F1C6A9', '#DEA789', '#E1B07E', '#C68642',
  '#B88A72', '#785A4A', '#8D5524', '#6B4423', '#66513D', '#4B3621',
  '#4F4336', '#261D15',
];

const colorMapSubtono = {
  Cálido: '#FFA500',
  Frío: '#4A90E2',
  Neutro: '#4CAF50',
};

const colorMapContraste = {
  Bajo: '#a0aec0',
  Medio: '#718096',
  Alto: '#2d3748',
};

export default function ResumenScreen({ navigation }) {
  const { datosUsuario } = useContext(UserContext);

  const {
    tipoRostro,
    colorOjos,
    colorCabello,
    tonoPiel,
    subtonoPiel,
    contraste,
  } = datosUsuario || {};

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
        <CirculoColor color={colorOjos || '#ccc'} />
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Color de cabello:</Text>
        <CirculoColor color={colorCabello || '#ccc'} />
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Tono de piel:</Text>
        <CirculoColor color={tonoPiel || '#ccc'} />
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Subtono de piel:</Text>
        <Text style={styles.valorColor}>{subtonoPiel || 'No especificado'}</Text>
      </View>

      <View style={styles.fila}>
        <Text style={styles.label}>Contraste:</Text>
        <Text style={styles.valorColor}>{contraste || 'No especificado'}</Text>
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.85}
      >
        <Text style={styles.botonTexto}>Guardar datos</Text>
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
