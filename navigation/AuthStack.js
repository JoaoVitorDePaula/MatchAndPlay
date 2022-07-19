import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import TelaCadastro from '../screens/TelaCadastro';
import TelaLogin from '../screens/TelaLogin';
import OnboardingScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';


{LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 0):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 1):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 2):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 3):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 4):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 5):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 6):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 7):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 8):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 9):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 10):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 11):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 12):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 13):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 14):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 15):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 16):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 17):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 18):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 19):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 20):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 21):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 22):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 23):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 24):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 25):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 26):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 27):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 28):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 29):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 30):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 31):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 32):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 33):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 34):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 35):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 36):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 37):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 38):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 39):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 40):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 41):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 42):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 43):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 44):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 45):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 46):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 47):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 48):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 49):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 50):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 51):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 52):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 53):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 54):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 55):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 56):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 57):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 58):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 59):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 60):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 61):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 62):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 63):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 64):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 65):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 66):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 67):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 68):']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection (id: 69):']);}

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

