import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

export default function Paleta({ navigation }) {
  const [color, setColor] = useState('#FF0000');

  const onSelectColor = () => {
    navigation.navigate('Colors', { newColor: color });
  };

  return (
    <View style={styles.container}>
      <ColorPicker
        color={color}
        onColorChange={setColor}
        style={{ flex: 1, width: '100%' }}
        thumbSize={30}
        noSnap={true}
        row={false}
      />

      <Button title="Seleccionar color" onPress={onSelectColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
