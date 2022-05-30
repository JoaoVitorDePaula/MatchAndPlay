import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  TextInput,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';

export default function TelaHome({navigation}) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));

  const {logout} = useContext(AuthContext);

  const [inputBusca, setInputBusca] = useState('');

  const MoveBuscar = () => {
    navigation.navigate('Busca');
  };

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.btnSubmit} onPress={() => MoveBuscar()}>
          <Text style={styles.searchText}> Encontrar</Text>
        </TouchableOpacity>
        
      </View>
      <View style={styles.container2}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.meusJogosText}>JOGOS EM ALTA</Text>
          <Text style={styles.maisJogosText}>Ver mais</Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.containerJogos}>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/lol.jpeg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/PUBG.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/FORT.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/CSGO.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/APEX.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/VAVA.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/RB6.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/star.jpeg')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.container3}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.meusJogosText}>JOGOS CASUAIS</Text>
          <Text style={styles.maisJogosText}>Ver mais</Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.containerJogos}>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/MINE.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/TERRA.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/FLG.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/ROCKET.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/AUS.jpg')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/BLL.jpg')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.container4}>
        
          <Text style={styles.meusJogosText}>TOP 5 MOBILE</Text>
        
        <ScrollView horizontal={true}>
          <View style={styles.containerJogos}>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/MBL.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/CODM.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/FF.jpg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/PUBGM.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/AOV.jpg')}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.btnSubmit} onPress={() => logout()}>
          <Text style={styles.submitText}> Sair</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  container: {
    alignItems: 'center',
    width: '90%',
  },
  container2: {
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
  },
  container3: {
    alignItems: 'center',
  },
  container4: {
    backgroundColor: '#1D1D1D',
  },
  containerJogos: {
    flexDirection: 'row',
    marginTop: '1%',
  },
  btnSubmit: {
    backgroundColor: '#492BB3',
    width: '38%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
    marginBottom: '5%',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    margin: '3%',
  },
  searchText: {
    color: '#FFF',
    fontSize: 18,
  },
  registerText: {
    color: '#35AAFF',
  },
  userImg: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: '7%',
  },
  btnEditar: {},
  registerText: {
    color: '#35AAFF',
    fontSize: 20,
  },
  boxAddGame: {
    fontSize: 100,
    color: '#363636',
  },
  meusJogosText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: '2%',
    marginTop: '2%',
  },
  maisJogosText: {
    color: '#6443DA',
    fontSize: 18,
    marginLeft: '43%',
    marginTop: '2%',
  },
  jogosImage: {
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    height: 160,
    width: 110,
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 20
  },
  inputText: {
    backgroundColor: '#363636',
    width: '90%',
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
});
