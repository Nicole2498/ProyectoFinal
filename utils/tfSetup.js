// utils/tfSetup.js
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as faceapi from 'face-api.js';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

let modelsLoaded = false;

export async function initTensorflowAndModels() {
  if (modelsLoaded) return; // No volver a cargar

  await tf.ready(); // Inicializar TensorFlow

  // Ruta base a tus modelos guardados localmente
  const modelUri = FileSystem.documentDirectory + 'models/';

  // Cargar los modelos desde los assets
  await faceapi.nets.ssdMobilenetv1.loadFromUri(modelUri);
  await faceapi.nets.faceLandmark68Net.loadFromUri(modelUri);
  await faceapi.nets.faceRecognitionNet.loadFromUri(modelUri);

  modelsLoaded = true;
}
