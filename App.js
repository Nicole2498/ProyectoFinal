import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext';

//
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
//
import FaceCaptureScreen from './screens/FaceCaptureScreen';
import FaceAnalysisScreen from './screens/FaceAnalysisScreen';
import PersonalizerScreen from './screens/PersonalizerScreen.js';
//
import SeleccionarRostroScreen from './screens/Personalizador/SeleccionarRostroScreen.js';
import ConfirmarRostroScreen from './screens/Personalizador/ConfirmarRostroScreen.js';
import ColorOjosScreen from './screens/Personalizador/ColorOjosScreen.js';
import ColorCabelloScreen from './screens/Personalizador/ColorCabelloScreen.js';
import TonoPielScreen from './screens/Personalizador/TonoPielScreen.js';
import SubtonoPielScreen from './screens/Personalizador/SubtonoPielScreen.js';
import ContrasteScreen from './screens/Personalizador/ContrasteScreen.js';
import ColorVenasScreen from './screens/Personalizador/ColorVenasScreen.js';
import ResumenScreen from './screens/Personalizador/ResumenScreen.js';
//
import HomeTabs from './navigation/HomeTabs.js'; 
import HomeScreen from './screens/HomeScreen.js';
//
import HairScreen from './screens/HairScreen';
  import IntroHairScreen from './screens/IntroHairScreen.js';
import MakeupScreen from './screens/MakeupScreen';
import ClothesScreen from './screens/ClothesScreen';
import ChatScreen from './screens/ChatScreen.js';
import ColorsScreen from './screens/ColorsScreen';
  import Paleta from './screens/Colores/Paleta.js';
  import CombinacionColor from './screens/Colores/CombinacionColor.js';
//
import MenuScreen from './screens/MenuScreen';
import PerfilScreen from './screens/PerfilScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
  
          <Stack.Screen name="FaceCapture" component={FaceCaptureScreen} />
          <Stack.Screen name="FaceAnalysis" component={FaceAnalysisScreen} />

          <Stack.Screen name="Personalizer" component={PersonalizerScreen} />
          <Stack.Screen name="PersonalizerScreen" component={PersonalizerScreen} />
              <Stack.Screen name="ConfirmarRostro" component={ConfirmarRostroScreen} />
              <Stack.Screen name="CambiarRostro" component={SeleccionarRostroScreen} />
              <Stack.Screen name="ColorOjos" component={ColorOjosScreen} />
              <Stack.Screen name="ColorCabello" component={ColorCabelloScreen} />
              <Stack.Screen name="TonoPiel" component={TonoPielScreen} />
              <Stack.Screen name="SubtonoPiel" component={SubtonoPielScreen} />
              <Stack.Screen name="ColorVenas" component={ColorVenasScreen} />
              <Stack.Screen name="Contraste" component={ContrasteScreen} />
                  <Stack.Screen name="Resumen" component={ResumenScreen} />
                  <Stack.Screen name="Perfil" component={PerfilScreen} />

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen}/>
              <Stack.Screen name="Home" component={HomeTabs} />
          
          <Stack.Screen name="IntroHair" component={IntroHairScreen} />
            <Stack.Screen name="Hair" component={HairScreen} />
          <Stack.Screen name="Makeup" component={MakeupScreen} />
          <Stack.Screen name="Clothes" component={ClothesScreen} />
          <Stack.Screen name="Colors" component={ColorsScreen} />
            <Stack.Screen name="Paleta" component={Paleta} />
            <Stack.Screen name="CombinacionColor" component={CombinacionColor} />
          
          
          <Stack.Screen name="Menu" component={MenuScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
