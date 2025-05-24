import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function HairGeneratorScreen() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://api.deepai.org/api/text2img',
        { text: prompt },
        {
          headers: {
            'Api-Key': '9df76cbd-bc72-4eed-b0c3-58124860a948', // Reemplaza con tu clave de DeepAI
          },
        }
      );
      setImageUrl(response.data.output_url);
    } catch (error) {
      console.error('Error al generar la imagen:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generador de Peinados IA</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe un peinado..."
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generar Imagen" onPress={generateImage} />
      {loading && <ActivityIndicator size="large" color="#ff7eb9" />}
      {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.image} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff0f6' },
  title: { fontSize: 22, fontWeight: 'bold', marginVertical: 10, color: '#ff7eb9' },
  input: {
    borderColor: '#ff7eb9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  image: { width: 300, height: 300, marginTop: 20, borderRadius: 10 },
});
