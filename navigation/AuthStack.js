import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import TelaCadastro from '../screens/TelaCadastro';
import TelaLogin from '../screens/TelaLogin';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLauched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLauched', 'true');
        setIsFirstLaunch(true);
      } else{
        setIsFirstLaunch(false)
      }
    });

    GoogleSignin.configure({
      webClientId: '293016028359-gg9oe6ggoj4avsc28pg2o6i57sv63hrt.apps.googleusercontent.com',
    });

  }, []);

  if( isFirstLaunch == null ) {
    return null;
  } else if ( isFirstLaunch == true) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Login', headerStyle: { backgroundColor: '#2A2A2A'},headerShown: false , headerTintColor: '#fff' }} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Cadastro', headerStyle: { backgroundColor: '#2A2A2A'}, headerTintColor: '#fff' }}/>
      </Stack.Navigator>
    )
  } else {
    return( 
    <Stack.Navigator>
      <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Login', headerStyle: { backgroundColor: '#2A2A2A'},headerShown: false, headerTintColor: '#fff' }} />
      <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Cadastro', headerStyle: { backgroundColor: '#2A2A2A'}, headerTintColor: '#fff' }}/>
    </Stack.Navigator>
    );
  }
}

export default App;

