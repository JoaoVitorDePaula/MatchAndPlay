import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';

const TelaHome = ({navigation, route}) => {
  const {logout} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [dataMobile, setDataMobile] = useState([]);
  const [dataPC, setDataPC] = useState([]);

  const {height} = useState(120);

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
            platforms: documentSnapshot.data().platforms,
            description: documentSnapshot.data().description,
          };
          d.push(game);
        });
        setData(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getMobilieGames = () => {
    firestore()
      .collection('games')
      .orderBy('gameName')
      .get()
      .then(querySnapshot => {
        let d = [];
        let a = 'Mobile';

        querySnapshot.forEach(documentSnapshot => {
          const game = {
            id: documentSnapshot.id,
            gameImage: documentSnapshot.data().gameImage,
            gameName: documentSnapshot.data().gameName,
            platforms: documentSnapshot.data().platforms,
            description: documentSnapshot.data().description,
          };
          d.push(game);
        });
        setDataMobile(d.filter(item => item.platforms.indexOf(a) > -1));
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getPCGames = () => {
    firestore()
      .collection('games')
      .orderBy('description')
      .get()
      .then(querySnapshot => {
        let d = [];
        let b = 'PC';
        querySnapshot.forEach(documentSnapshot => {
          const game = {
            id: documentSnapshot.id,
            gameImage: documentSnapshot.data().gameImage,
            gameName: documentSnapshot.data().gameName,
            platforms: documentSnapshot.data().platforms,
            description: documentSnapshot.data().description,
          };
          d.push(game);
        });
        setDataPC(d.filter(item => item.platforms.indexOf(b) > -1));
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const RenderItem = () => (
    <>
      {data.map((item, index) => (
        <TouchableOpacity
          windowSize={1}
          initialNumToRender={1}
          onPress={() =>
            navigation.navigate('TelaVisualizarJogos', {
              id: item.id,
              gameImage: item.gameImage,
              gameName: item.gameName,
              platforms: item.platforms,
              description: item.description,
              followers: item.followers,
            })
          }
          key={index}>
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

  const RenderItemMobile = () => (
    <>
      {dataMobile.map((item, index) => (
        <TouchableOpacity
          windowSize={1}
          initialNumToRender={1}
          onPress={() =>
            navigation.navigate('TelaVisualizarJogos', {
              id: item.id,
              gameImage: item.gameImage,
              gameName: item.gameName,
              platforms: item.platforms,
              description: item.description,
            })
          }
          key={index}>
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

  const RenderItemPC = () => (
    <>
      {dataPC.map((item, index) => (
        <TouchableOpacity
          windowSize={1}
          initialNumToRender={1}
          onPress={() =>
            navigation.navigate('TelaVisualizarJogos', {
              id: item.id,
              gameImage: item.gameImage,
              gameName: item.gameName,
              platforms: item.platforms,
              description: item.description,
            })
          }
          key={index}>
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

  useEffect(() => {
    getGames(), getMobilieGames(), getPCGames();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoveBuscar()}>
            <Text style={styles.searchText}> Buscar Jogadores</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.meusJogosText}> SUGESTÕES DA SEMANA</Text>
          </View>
        </View>
        <View style={styles.containerJogos}>
          <ScrollView horizontal={true}>
            <RenderItem />
          </ScrollView>
        </View>

        <View style={styles.container2}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.meusJogosText}> JOGUE EM QUALQUER LUGAR</Text>
          </View>
        </View>

        <View style={styles.containerJogos}>
          <ScrollView horizontal={true}>
            <RenderItemMobile />
          </ScrollView>
        </View>

        <View style={styles.container2}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.meusJogosText}> SÓ NO MOUSE E TECLADO</Text>
          </View>
        </View>
        <View style={styles.containerJogos}>
          <ScrollView horizontal={true}>
            <RenderItemPC />
          </ScrollView>
        </View>

        <View style={styles.container3}>
          <TouchableOpacity style={styles.btnSubmit} onPress={() => logout()}>
            <Text style={styles.submitText}> Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaHome;

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
    height: Dimensions.get('window').height / 4,
  },
  btnSubmit: {
    backgroundColor: '#492BB3',
    width: '45%',
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
    height: '100%',
    width: Dimensions.get('window').width / 2.7,
    marginLeft: 10,
    marginBottom: 20,
  },
});
