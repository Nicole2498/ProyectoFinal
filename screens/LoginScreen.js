import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('FaceCapture');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  return (
    <LinearGradient
      colors={['#FFF6F9', '#FFF1F5', '#FFF4E6']}  
      style={styles.container}
    >
      <View style={styles.appNameContainer}>
        <Text style={styles.appName}>✨ Combinarte ✨</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Inicia sesión</Text>

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

        <TouchableOpacity onPress={handleLogin} style={styles.buttonWrapper}>
          <LinearGradient
            colors={['#EC407A', '#D81B60']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegisterRedirect}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

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
    color: '#D81B60',  
    fontFamily: 'sans-serif',
  },
  stars: {
    fontSize: 12,
    color: '#D81B60',
    marginLeft: 6,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#AD1457',
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
    color: '#AD1457',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'sans-serif-light',
  },
});
