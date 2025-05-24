import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

export default function FaceAnalysisScreen({ route, navigation }) {
  const { imageUrl } = route.params;
  const [landmarks, setLandmarks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faceType, setFaceType] = useState(null);

  const API_KEY = 'n3fj0yMoq5jZ4M-oMD960U0ANz2Yx3j3';
  const API_SECRET = '-pZfnhZjkKbFzAFzjTCcPGiuvukUn3xp';

  const dist = (p1, p2) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  useEffect(() => {
    const detectFace = async () => {
      try {
        const formData = new FormData();
        formData.append('api_key', API_KEY);
        formData.append('api_secret', API_SECRET);
        formData.append('image_url', imageUrl);
        formData.append('return_landmark', 2);

        const response = await fetch('https://api-us.faceplusplus.com/facepp/v3/detect', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.faces && data.faces.length > 0) {
          setLandmarks(data.faces[0].landmark);

          const lm = data.faces[0].landmark;

          const foreheadLeft = lm.contour_left1;
          const foreheadRight = lm.contour_right1;
          const cheekLeft = lm.contour_left7;
          const cheekRight = lm.contour_right7;
          const jawLeft = lm.contour_left14;
          const jawRight = lm.contour_right14;
          const chin = lm.contour_chin;

          const foreheadWidth = dist(foreheadLeft, foreheadRight);
          const cheekWidth = dist(cheekLeft, cheekRight);
          const jawWidth = dist(jawLeft, jawRight);
          const jawLengthLeft = dist(chin, jawLeft);
          const jawLengthRight = dist(chin, jawRight);
          const jawLength = (jawLengthLeft + jawLengthRight) / 2;
          const foreheadY = (foreheadLeft.y + foreheadRight.y) / 2;
          const faceLength = chin.y - foreheadY;

          const ratioLengthToWidth = faceLength / cheekWidth;
          const ratioCheekToJaw = cheekWidth / jawWidth;
          const ratioForeheadToCheek = foreheadWidth / cheekWidth;

          let type = 'Indefinido';
          if (
            ratioLengthToWidth >= 0.9 &&
            ratioForeheadToCheek > 1.05 &&
            ratioCheekToJaw > 1.5
          ) {
            type = 'Ovalado';
          } else if (
            ratioLengthToWidth < 1.1 &&
            ratioCheekToJaw > 1.8
          ) {
            type = 'Corazón';
          } else if (
            ratioLengthToWidth < 1.1 &&
            Math.abs(foreheadWidth - cheekWidth) < 40 &&
            Math.abs(cheekWidth - jawWidth) < 40
          ) {
            type = 'Redondo';
          } else if (
            Math.abs(jawWidth - cheekWidth) < 10 &&
            Math.abs(foreheadWidth - cheekWidth) < 10
          ) {
            type = 'Cuadrado';
          } else if (
            ratioLengthToWidth > 1.5 &&
            ratioCheekToJaw < 1.0
          ) {
            type = 'Rectangular/Alargado';
          }

          setFaceType(type);
        } else {
          setLandmarks(null);
          setFaceType(null);
        }
      } catch (error) {
        console.error('Error al detectar rostro:', error);
        setLandmarks(null);
        setFaceType(null);
      } finally {
        setLoading(false);
      }
    };

    detectFace();
  }, [imageUrl]);

  const getFaceIcon = (type) => {
    switch(type) {
      case 'Ovalado':
        return { name: 'ellipse', color: '#FF69B4' };
      case 'Corazón':
        return { name: 'heart', color: '#FF4500' };
      case 'Redondo':
        return { name: 'ellipse-outline', color: '#1E90FF' };
      case 'Cuadrado':
        return { name: 'square-outline', color: '#32CD32' };
      case 'Rectangular/Alargado':
        return { name: 'resize', color: '#8A2BE2' };
      default:
        return { name: 'help-circle-outline', color: '#666' };
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!landmarks) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No se detectó ningún rostro. Intenta con otra imagen.</Text>
      </View>
    );
  }

  const scale = 300 / 200;
  const scalePoint = (p) => ({ x: p.x * scale, y: p.y * scale });

  const contourCoords = [];
  for (let i = 1; i <= 14; i++) contourCoords.push(landmarks[`contour_left${i}`]);
  contourCoords.push(landmarks.contour_chin);
  for (let i = 14; i >= 1; i--) contourCoords.push(landmarks[`contour_right${i}`]);

  const scaledContour = contourCoords.map(scalePoint);

  const foreheadLeft = scalePoint(landmarks.contour_left1);
  const foreheadRight = scalePoint(landmarks.contour_right1);
  const cheekLeft = scalePoint(landmarks.contour_left7);
  const cheekRight = scalePoint(landmarks.contour_right7);
  const jawLeft = scalePoint(landmarks.contour_left14);
  const jawRight = scalePoint(landmarks.contour_right14);
  const chin = scalePoint(landmarks.contour_chin);

  const faceIcon = getFaceIcon(faceType);

  return (
    <View style={styles.container}>
      <Text style={styles.personalMessage}>
        ¡Tienes un rostro muy especial! Hemos detectado que tu tipo de rostro es:
      </Text>

      <Ionicons
        name={faceIcon.name}
        size={64}
        color={faceIcon.color}
        style={{ marginBottom: 10 }}
      />

      <Text style={styles.faceType}>{faceType}</Text>

      <Text style={styles.subtitle}>
        Con esta información podemos comenzar tu asesoría personalizada. ¡Vamos allá!
      </Text>

      <Svg width={300} height={300} style={{ backgroundColor: '#eee', marginTop: 20 }}>
        <Polyline
          points={scaledContour.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="blue"
          strokeWidth={2}
        />
        <Line x1={foreheadLeft.x} y1={foreheadLeft.y} x2={foreheadRight.x} y2={foreheadRight.y} stroke="red" strokeWidth={2} />
        <Line x1={cheekLeft.x} y1={cheekLeft.y} x2={cheekRight.x} y2={cheekRight.y} stroke="green" strokeWidth={2} />
        <Line x1={jawLeft.x} y1={jawLeft.y} x2={jawRight.x} y2={jawRight.y} stroke="orange" strokeWidth={2} />
        <Line x1={chin.x} y1={chin.y} x2={jawLeft.x} y2={jawLeft.y} stroke="purple" strokeWidth={2} />
        <Line x1={chin.x} y1={chin.y} x2={jawRight.x} y2={jawRight.y} stroke="purple" strokeWidth={2} />
        <Line
          x1={(foreheadLeft.x + foreheadRight.x) / 2}
          y1={(foreheadLeft.y + foreheadRight.y) / 2}
          x2={chin.x}
          y2={chin.y}
          stroke="brown"
          strokeWidth={2}
        />
        {[foreheadLeft, foreheadRight, cheekLeft, cheekRight, jawLeft, jawRight, chin].map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={4} fill="black" />
        ))}
      </Svg>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() =>
          navigation.navigate('PersonalizerScreen', {
            datosUsuario: { tipoRostro: faceType }
          })
        }
      >
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 100 },
  personalMessage: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 30,
  },
  faceType: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ff69b4',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  error: { fontSize: 18, color: 'red' },
  startButton: {
    marginTop: 50,
    backgroundColor: '#ff69b4',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
