const openaiKey = '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'; // reemplaza con tu key real para pruebas

export async function llamarChatOpenAI(mensajeUsuario) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // o 'gpt-4o' si tu key lo permite
        messages: [
          { role: 'system', content: 'Eres un asesor de moda simpático y profesional.' },
          { role: 'user', content: mensajeUsuario },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.choices[0].message.content;
    } else {
      console.error('Error de OpenAI:', data);
      return 'Hubo un error al generar la respuesta.';
    }
  } catch (err) {
    console.error('Error al llamar a OpenAI:', err);
    return 'Error de conexión con OpenAI.';
  }
}
