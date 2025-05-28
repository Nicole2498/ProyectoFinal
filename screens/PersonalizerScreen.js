import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function PersonalizerScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};

  useEffect(() => {
    if (datosUsuario?.tipoRostro) {
      navigation.replace('ConfirmarRostro', { datosUsuario });
    }
  }, [datosUsuario, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff4081" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f6',
  },
});
