// utils/chatAPI.js
import axios from 'axios';

const API_KEY = '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'; // ¡Nunca subas esto a GitHub sin ocultarlo!

export const sendMessageToGPT = async (userMessage) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4', // o 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error al llamar a OpenAI:', error);
    return 'Ocurrió un error al procesar tu mensaje.';
  }
};
