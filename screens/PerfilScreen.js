import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function PerfilScreen({ navigation, route }) {
  const { datosUsuario } = route.params || {};

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.screenCentered}>
        <Text style={styles.screenText}>Perfil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.infoContainer}>
        {datosUsuario ? (
          Object.entries(datosUsuario).map(([clave, valor]) => (
            <View key={clave} style={styles.item}>
              <Text style={styles.label}>{clave}:</Text>
              <Text style={styles.value}>{valor}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No hay datos disponibles.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff0f6',
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
  backButtonText: {
    fontSize: 16,
    color: '#ff4081',
    fontWeight: '600',
  },
  screenCentered: {
    marginTop: 100,
    alignItems: 'center',
  },
  screenText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff7eb9',
    marginBottom: 20,
  },
  infoContainer: {
    padding: 20,
  },
  item: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  noData: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
});
