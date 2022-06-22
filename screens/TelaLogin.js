import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {LogBox} from 'react-native';

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

export default function TelaLogin({navigation}) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 283, y: 280}));

  const [inputEmail, setInputEmail] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const criarConta = () => {
    navigation.navigate('Cadastro');
  };

  const {login, googleLogin} = useContext(AuthContext);

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 183,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 180,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 283,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 280,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('../src/assets/logo.png')}
        />
      </View>

      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}],
          },
        ]}>
        <TextInput
          style={styles.inputEmail}
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={email => setInputEmail(email)}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          placeholderTextColor="#C0C0C0"
          autoCorrect={false}
          value={inputSenha}
          onChangeText={senha => setInputSenha(senha)}
          secureTextEntry={hidePass}
        />

        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => {
            login(inputEmail, inputSenha);
          }}>
          <Text style={styles.submitText}>Entrar</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => criarConta()}>
            <Text style={styles.registerText}>Crie sua conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => criarConta()}>
            <Text style={styles.registerText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => googleLogin()}>
            <Image
              style={{
                width: 60,
                height: 62,
                marginRight: '8%',
              }}
              source={require('../src/assets/google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => criarConta()}>
            <Image
              style={{
                width: 62,
                height: 62,
              }}
              source={require('../src/assets/facebook.png')}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: '10%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
  },
  inputEmail: {
    backgroundColor: '#363636',
    width: '90%',
    marginBottom: 15,
    color: '#FFF',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginBottom: '6%',
  },
  inputSenha: {
    backgroundColor: '#363636',
    width: '90%',
    marginBottom: 15,
    color: '#FFF',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginBottom: '6%',
  },
  btnSubmit: {
    backgroundColor: '#492BB3',
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnRegister: {
    margin: '5%',
  },
  registerText: {
    color: '#35AAFF',
  },
});
