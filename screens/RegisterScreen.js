import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    // Guarda usuario y contraseña
    await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
    Alert.alert('¡Registro exitoso!', 'Ahora inicia sesión');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#EBF7FA', '#F1F0FF', '#F6F3FF']}  // degradado con melón clarito
      style={styles.container}
    >
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>✨ Combinarte ✨</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#BA3BEC', '#9738EC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  appNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BA3BEC',  // fucsia lindo
    fontFamily: 'sans-serif',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#BA3BEC',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  buttonWrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
  },
  button: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '300',
    letterSpacing: 1,
    fontFamily: 'sans-serif-light',
  },
  registerText: {
    marginTop: 30,
    fontSize: 14,
    color: '#BA3BEC',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'sans-serif-light',
  },
});
