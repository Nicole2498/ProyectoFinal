import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { UserContext } from '../context/UserContext';

const COHERE_API_KEY = 'YxxRWJQFysUwZHF9a2NvBkBKD8TNFJ4z8tL7e5dc';

export default function MakeupScreen({ navigation }) {
  const { datosUsuario } = useContext(UserContext);
  const {
    tipoRostro,
    colorOjos,
    colorCabello,
    tonoPiel,
    subtonoPiel,
    contraste,
  } = datosUsuario || {};

  const [inputs, setInputs] = useState({
    evento: '',
    clima: '',
    hora: '',
    vestimenta: '',
    tipoPiel: '',
  });
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  };

  const generarMaquillaje = async () => {
    setLoading(true);
    setResultado('');

    const prompt = `Eres una asesora de imagen profesional, cercana, elegante y súper femenina. Redacta una recomendación de maquillaje como si se la dieras a una clienta real, de manera amable y detallada, paso a paso, sin usar formato de IA, sin asteriscos, ni listas con guiones. Evita mencionar códigos hexadecimales.

Características de la clienta:
- tipo de rostro: ${tipoRostro || 'no especificado'}
- color de cabello: ${colorCabello || 'no especificado'}
- color de ojos: ${colorOjos || 'no especificado'}
- tono de piel: ${tonoPiel || 'no especificado'}
- subtono de piel: ${subtonoPiel || 'no especificado'}
- contraste: ${contraste || 'no especificado'}

Datos del día:
- Evento: ${inputs.evento}
- Clima: ${inputs.clima}
- Hora del día: ${inputs.hora}
- Color de la vestimenta: ${inputs.vestimenta}
- Tipo de piel: ${inputs.tipoPiel}

Hazlo como una asesoría real y profesional, incluyendo recomendaciones de productos existentes si es posible, y sugerencias de tonos de manera muy visual, sin ser técnica ni mecánica.`;

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
          message: 'Por favor genera la asesoría de maquillaje detallada.',
          temperature: 0.8,
        }),
      });

      const data = await response.json();

      if (data?.text) {
        const texto = data.text.trim();
        setResultado(texto);
      } else {
        setResultado('No se pudo generar el maquillaje.');
      }
    } catch (error) {
      console.error('Error al generar maquillaje:', error);
      setResultado('Hubo un error al generar el maquillaje.');
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Maquillaje personalizado</Text>

      {['evento', 'clima', 'hora', 'vestimenta', 'tipoPiel'].map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={inputs[field]}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={generarMaquillaje}>
        <Text style={styles.buttonText}>Generar maquillaje</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#ff4081" style={{ marginTop: 20 }} />}

      {resultado !== '' && (
        <View style={styles.result}>
          <Text style={styles.resultText}>{resultado}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
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
    marginBottom: 16,
    color: '#ff4081',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ff99bb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff4081',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    borderColor: '#ffccde',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});
