import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PerfilScreen({ navigation }) {
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
    <View style={[styles.circulo, { backgroundColor: color || '#ccc' }]} />
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Perfil</Text>

      <Image
        source={require('../assets/images/perfil.png')}
        style={styles.imagen}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.label}>Tipo de rostro:</Text>
        <Text style={styles.valor}>{tipoRostro || 'No especificado'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Color de ojos:</Text>
        <CirculoColor color={colorOjos} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Color de cabello:</Text>
        <CirculoColor color={colorCabello} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Tono de piel:</Text>
        <CirculoColor color={tonoPiel} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Subtono de piel:</Text>
        <Text style={styles.valor}>{subtonoPiel || 'No especificado'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Contraste:</Text>
        <Text style={styles.valor}>{contraste || 'No especificado'}</Text>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fef4f9',
    flexGrow: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ff4081',
  },
  imagen: {
    width: '100%',
    height: 180,
    marginBottom: 30,
    borderRadius: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#ffb7d1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  circulo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#d6336c',
  },
});
