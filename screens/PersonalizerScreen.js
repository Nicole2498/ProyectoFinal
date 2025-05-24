import React, { useEffect } from 'react';


export default function PersonalizerScreen({ navigation, route }) {
  const datosUsuario = route.params?.datosUsuario || {};

    useEffect(() => {
        if (datosUsuario?.tipoRostro) {
            navigation.replace('ConfirmarRostro', { datosUsuario });
        }
    }, [datosUsuario]);

  return null; // No renderiza nada, solo redirige
}


