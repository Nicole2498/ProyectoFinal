import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { UserContext } from '../context/UserContext';

const COHERE_API_KEY = 'YxxRWJQFysUwZHF9a2NvBkBKD8TNFJ4z8tL7e5dc';

export default function HairScreen({ navigation }) {
  const { datosUsuario } = useContext(UserContext);
  const {
    tipoRostro,
    colorOjos,
    colorCabello,
    tonoPiel,
    subtonoPiel,
    contraste,
  } = datosUsuario || {};

  const [sugerencias, setSugerencias] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImagen, setLoadingImagen] = useState(false);

  useEffect(() => {
    generarSugerenciasConCohere();
  }, []);

  const generarSugerenciasConCohere = async () => {
    setLoading(true);
    setSugerencias([]);
    setSeleccion(null);
    setImageUrl('');

    const prompt = `Eres una asesora de imagen experta. Sugiere 4 estilos de peinado, corte y color de cabello ideales para una mujer con las siguientes características: 
    tipo de rostro: ${tipoRostro || 'no especificado'}, 
    color de cabello: ${colorCabello || 'no especificado'}, 
    color de ojos: ${colorOjos || 'no especificado'}, 
    tono de piel: ${tonoPiel || 'no especificado'}, 
    subtono de piel: ${subtonoPiel || 'no especificado'}, 
    contraste: ${contraste || 'no especificado'}. 
    Escribe solo los nombres o descripciones breves, uno por línea`;

    try {
      const response = await fetch('https://api.cohere.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${COHERE_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'command-r-plus',
          chat_history: [
            {
              role: 'USER',
              message: prompt,
            },
          ],
          message: 'Por favor dame las 4 sugerencias.',
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        const textoGenerado = data.text.trim();
        const opciones = textoGenerado
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0);

        setSugerencias(opciones);
      } else {
        console.error('Error Cohere:', data);
        setSugerencias([
          'Corte bob con ondas suaves',
          'Flequillo largo con capas',
          'Balayage miel',
          'Recogido casual con volumen',
        ]);
      }
    } catch (error) {
      console.error('Error en Cohere:', error);
      setSugerencias([
        'Corte bob con ondas suaves',
        'Flequillo largo con capas',
        'Balayage miel',
        'Recogido casual con volumen',
      ]);
    }

    setLoading(false);
  };

  const generarImagenConDeepAI = async (prompt) => {
    setLoadingImagen(true);
    setImageUrl('');
    try {
      const response = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
          'Api-Key': '9df76cbd-bc72-4eed-b0c3-58124860a948',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `text=Mujer con rostro ${tipoRostro || 'ovalado'},  con ${encodeURIComponent(prompt)}`,
      });

      const data = await response.json();
      if (data.output_url) {
        setImageUrl(data.output_url);
      } else {
        console.error('Error DeepAI:', data);
      }
    } catch (err) {
      console.error('Error generando imagen', err);
    } finally {
      setLoadingImagen(false);
    }
  };

  const handleSeleccion = (item) => {
    setSeleccion(item);
    generarImagenConDeepAI(item);
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Sugerencias personalizadas</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} color="#ff4081" />
      ) : (
        <FlatList
          data={sugerencias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.option} onPress={() => handleSeleccion(item)}>
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {loadingImagen && <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#ff4081" />}

      {imageUrl !== '' && (
        <View style={styles.result}>
          <Text style={styles.generatedTitle}>Visualización generada:</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.selectionText}>Estilo seleccionado: {seleccion}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 60,
    color: '#ff4081',
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#ffe3ec',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  result: {
    marginTop: 30,
    alignItems: 'center',
  },
  generatedTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ff4081',
  },
  selectionText: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
  },
});
