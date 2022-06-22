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
  ScrollView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

export default function TelaCadastro() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 258, y: 255}));

  const [inputEmail, setInputEmail] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [hidePass, setHidePass] = useState(true);

  const {register, googleRegister} = useContext(AuthContext);

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
        toValue: 155,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 258,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 255,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <ScrollView>
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
          <Text style={styles.txtCriar}>Crie sua Conta:</Text>

          <TextInput
            style={styles.inputEmail}
            placeholder="Email"
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            onChangeText={email => setInputEmail(email)}
          />

          <TextInput
            style={styles.inputEmail}
            placeholder="Confirme seu endereço de email"
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
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
          <TextInput
            style={styles.inputSenha}
            placeholder="Corfirme sua senha"
            placeholderTextColor="#C0C0C0"
            autoCorrect={false}
            secureTextEntry={hidePass}
          />

          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => register(inputEmail, inputSenha)}>
            <Text style={styles.submitText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <Text style={styles.txtCriar}>
            Cadastre-se com Google ou Facebook:
          </Text>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => googleRegister()}>
              <Image
                style={{
                  width: 60,
                  height: 60,
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
                  marginBottom: '40%',
                }}
                source={require('../src/assets/facebook.png')}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    marginTop: '5%',
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
    marginBottom: '5%',
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
  txtCriar: {
    justifyContent: 'center',
    color: '#c0c0c0',
    fontSize: 20,
    marginBottom: '5%',
  },
});
