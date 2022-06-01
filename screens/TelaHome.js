import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function TelaHome({navigation}) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));

  const {logout} = useContext(AuthContext);

  const [data, setData] = useState([]);

  const MoveBuscar = () => {
    navigation.navigate('Busca');
  };

  const getGames = () => {
    firestore()
      .collection('games')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const game = {
            id: documentSnapshot.id,
            gameImage: documentSnapshot.data().gameImage,
            gameName: documentSnapshot.data().gameName,
          };
          d.push(game);
        });
        setData(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const RenderItem = () => (
    <>
      {data.map((item, index) => (
        <TouchableOpacity>
          <Image
            style={styles.jogosImage}
            source={{
              uri: item.gameImage,
            }}
          />
        </TouchableOpacity>
      ))}
    </>
  );

  useFocusEffect(
    React.useCallback(() => {
      getGames();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
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
        <View style={styles.containerJogos}></View>
      </View>
      <ScrollView horizontal={true}>
        <RenderItem></RenderItem>
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
    width: '100%',
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
    marginLeft: 10,
    marginBottom: 20,
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
