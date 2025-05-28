import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const COHERE_API_KEY = 'YxxRWJQFysUwZHF9a2NvBkBKD8TNFJ4z8tL7e5dc'; // KEY Cohere

export default function ChatScreen({ navigation }) {  
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    {
      role: "CHATBOT",
      message: "Eres una asesora de moda e imagen dulce, amigable y profesional. Da consejos con emojis, en tono casual pero profesional y encantadora.",
    },
  ]);
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (mensaje.trim() === '') return;

    setCargando(true);

    const nuevoHistorial = [
      ...historial,
      { role: "USER", message: mensaje },
    ];

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'command-r-plus',
          chat_history: nuevoHistorial,
          message: mensaje,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        const respuestaIA = data.text.trim();

        setHistorial([
          ...nuevoHistorial,
          { role: "CHATBOT", message: respuestaIA },
        ]);
      } else {
        console.error('Error de Cohere:', data);
        setHistorial([
          ...nuevoHistorial,
          { role: "CHATBOT", message: 'Ups 💔... hubo un error al generar la respuesta.' },
        ]);
      }
    } catch (error) {
      console.error('Error al llamar a Cohere:', error);
      setHistorial([
        ...nuevoHistorial,
        { role: "CHATBOT", message: 'No se pudo conectar 😢.' },
      ]);
    }

    setMensaje('');
    setCargando(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>💖 Tu Asesora Personal 💬</Text>
      </View>

      <ScrollView style={styles.chatBox}>
        {historial
          .filter(h => h.role !== 'CHATBOT' || h.message !== historial[0].message)
          .map((item, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                item.role === 'USER' ? styles.userMessage : styles.botMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Hola!! soy Rachel, tu asesora de imagen personal, dime en qué te puedo ayudar..."
          value={mensaje}
          onChangeText={setMensaje}
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={enviarMensaje} disabled={cargando}>
          <Text style={styles.sendButtonText}>{cargando ? '...' : 'Enviar 💅'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#f8bbd0',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 50,
    padding: 8,
    backgroundColor: '#ec407a',
    borderRadius: 20,
    zIndex: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#c2185b',
  },
  chatBox: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '90%',
  },
  userMessage: {
    backgroundColor: '#e1bee7',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#ffe3ec',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#4a148c',
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: '#f8bbd0',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ec407a',
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    minHeight: 60,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#ec407a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
