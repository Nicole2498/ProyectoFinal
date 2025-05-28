import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CombinacionColor({ route }) {
  const { baseColors } = route.params;
  const [combinations, setCombinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCombinations() {
      setLoading(true);
      const prompt = `Según la colorimetría, dame 14 colores que combinen con este color base: ${baseColors}. Devuelve solo los códigos hexadecimales de los colores, separados por comas.`;

      try {
        const response = await axios.post(
          'https://api.cohere.ai/v1/generate',
          {
            model: 'command',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.8,
          },
          {
            headers: {
              Authorization: `Bearer YxxRWJQFysUwZHF9a2NvBkBKD8TNFJ4z8tL7e5dc`,
              'Content-Type': 'application/json',
            },
          }
        );

        const text = response.data.generations[0].text;

        const colorList = text
          .replace(/\n/g, '')
          .split(',')
          .map(c => c.trim())
          .filter(c => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(c));

        const filledColors = [...colorList];
        while (filledColors.length < 9) {
          filledColors.push('#ffffff'); 
        }

        setCombinations(filledColors.slice(0, 9));
      } catch (error) {
        console.error('Error al generar combinaciones:', error);
      }
      setLoading(false);
    }

    fetchCombinations();
  }, [baseColors]);

  const renderColorGrid = () => {
    const rows = [];
    for (let i = 0; i < combinations.length; i += 3) {
      const row = combinations.slice(i, i + 3);
      rows.push(
        <View key={i} style={styles.row}>
          {row.map((color, index) => (
            <View key={index} style={[styles.colorSquare, { backgroundColor: color }]} />
          ))}
        </View>
      );
    }
    return rows;
  };

  return (
    <LinearGradient colors={['#FFF0F5', '#FFE3EC', '#FFD6EB']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Combinaciones sugeridas</Text>

        {loading && <ActivityIndicator size="large" color="#8A417B" />}
        {!loading && renderColorGrid()}
        {!loading && combinations.length === 0 && (
          <Text style={styles.noResults}>No se encontraron combinaciones.</Text>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialCommunityIcons name="home-outline" size={30} color="#8A417B" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <MaterialCommunityIcons name="account-circle-outline" size={30} color="#8A417B" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginTop: 100,
    marginBottom: 50,
    color: '#8A417B',
    fontWeight: '700',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 16,
  },
  colorSquare: {
    width: 90,
    height: 90,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  noResults: {
    marginTop: 20,
    color: '#888',
    fontStyle: 'italic',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#FFF0F5',
    backgroundColor: '#FFF0F5',
  },
});
