import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ClothesScreen({ navigation }) {
  const [showChatPrompt, setShowChatPrompt] = useState(true); 

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.screenCentered}>
        <Text style={styles.screenText}>Clothes</Text>

        {showChatPrompt && (
          <View style={styles.chatPrompt}>
            <Text style={styles.girlyText}>💖 Empezar a chatear con mi asesor personal 💬</Text>
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Text style={styles.chatButtonText}>Iniciar Chat 💅</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff7eb9',
  },
  chatPrompt: {
    marginTop: 30,
    backgroundColor: '#f8bbd0',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  girlyText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#c2185b',
    marginBottom: 10,
    textAlign: 'center',
  },
  chatButton: {
    backgroundColor: '#ec407a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
