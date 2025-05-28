import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

export default function FaceCaptureScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPermission.status !== 'granted' || mediaLibraryPermission.status !== 'granted') {
        Alert.alert('Permiso requerido', 'Necesitamos permiso para usar cámara y galería');
      }
    })();
  }, []);

  const handleImage = async (result) => {
    if (!result.canceled) {
      const selected = result.assets[0];
      setImage(selected);
      const fileName = selected.uri.split('/').pop();
      const localPath = `${FileSystem.documentDirectory}${fileName}`;

      try {
        await FileSystem.copyAsync({
          from: selected.uri,
          to: localPath,
        });
        setLocalUri(localPath);
        console.log('Imagen guardada localmente en:', localPath);
      } catch (error) {
        console.error('Error al guardar localmente:', error);
      }
    }
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      exif: true,
    });

    await handleImage(result);
  };

  const takePhotoWithCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
      exif: true,
      cameraType: 'front',
    });

    if (!result.canceled) {
      let selected = result.assets[0];
      const manipResult = await ImageManipulator.manipulateAsync(
        selected.uri,
        [{ flip: ImageManipulator.FlipType.Horizontal }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      selected = {
        ...selected,
        uri: manipResult.uri,
        base64: manipResult.base64,
      };

      await handleImage({ canceled: false, assets: [selected] });
    }
  };

  const uploadToImgur = async () => {
    if (!image) {
      Alert.alert('Primero selecciona o toma una imagen');
      return;
    }

    setUploading(true);
    try {
      const base64Data = image.base64.includes('base64,') ? image.base64.split('base64,')[1] : image.base64;

      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 3b89d67af4e0b8e',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Data,
          type: 'base64',
        }),
      });

      const data = await response.json();
      console.log('Respuesta Imgur:', data);

      if (data.success) {
        const imgurUrl = data.data.link;
        navigation.navigate('FaceAnalysis', {
          imageUrl: imgurUrl,
          localPath: image.uri,
        });
      } else {
        throw new Error('Error al subir imagen');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir la imagen');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={['#FDE2E6', '#FAD6D9', '#FBD9C8']} style={styles.container}>
      
      {/* Logo arriba */}
      <MaterialCommunityIcons name="face-recognition" size={100} color="#fff" style={{ marginBottom: 40 }} />

      {/* Texto con jerarquía y distintas tipografías */}
      <Text style={styles.titlePrimary}>Análisis Facial Personalizado</Text>
      <Text style={styles.titleSecondary}>Permítenos analizar tu rostro para ofrecerte una experiencia única y adaptada a ti.</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.circleButton, styles.circleButtonCamera]} onPress={takePhotoWithCamera} activeOpacity={0.8}>
          <MaterialCommunityIcons name="camera" size={52} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.circleButton, styles.circleButtonGallery]} onPress={pickImageFromGallery} activeOpacity={0.8}>
          <MaterialCommunityIcons name="image-multiple" size={52} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* La imagen no se muestra en pantalla, pendiente */}

      {uploading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
      ) : (
        image && (

          
          <TouchableOpacity style={styles.uploadButtonWrapper} onPress={uploadToImgur} activeOpacity={0.8}>
            <LinearGradient colors={['#EC407A', '#D81B60']} style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Subir y continuar</Text>
            </LinearGradient>
          </TouchableOpacity>
        )
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePrimary: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif-condensed',
    marginBottom: 20,
  },
  titleSecondary: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
    lineHeight: 26,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 50,
  },
  circleButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonCamera: {
    backgroundColor: '#F06292', 
  },
  circleButtonGallery: {
    backgroundColor: '#FFAB91', 
  },
  uploadButtonWrapper: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 40,
  },
  uploadButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 1,
    fontFamily: 'sans-serif-light',
  },
});
