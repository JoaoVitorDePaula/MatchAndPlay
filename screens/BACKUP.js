                    groupName: '',
                    groupOwner: '',
                    description: '',
                    rank: '',
                    members: [],
                    rating: 0,



                    var members = documentSnapshot.data().userName;
          const ArrMembers = members.split(',');
          //console.log(ArrMembers);
          setInputMembers(ArrMembers),


          return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
              <ScrollView>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => MoverCriarGrupos()}>
                    <Text style={styles.searchText}> Criar Grupos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => MoverCriarGrupos()}>
                    <Text style={styles.searchText}> Buscar Grupos</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container2}>
                  <Text style={styles.meusGruposText}>MEUS GRUPOS</Text>
        
                  <ScrollView horizontal={true}>
                    <View style={styles.containerJogos}>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
        
                <View style={styles.container3}>
                  <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>
        
                  <ScrollView horizontal={true}>
                    <View style={styles.containerJogos}>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 2/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Bronze</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>SOLO 2</Text>
                          <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                          <Text style={styles.grupoText}>Participantes: 1/2</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Diamante</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonMaisStyle}
                        activeOpacity={0.5}>
                        <View style={styles.boxGrupos}>
                          <Text style={styles.grupoTitleText}>CSTRIKE</Text>
                          <Text style={styles.grupoText}>Jogo: CS-GO</Text>
                          <Text style={styles.grupoText}>Participantes: 4/5</Text>
                          <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                          <Text style={styles.grupoText}>Rank: Xerife</Text>
                          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </View>
              </ScrollView>
            </SafeAreaView>
          );









          <View style={styles.container3}>
          <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>

          <ScrollView horizontal={true}>
            <View style={styles.containerJogos}>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>SOLO 2</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 1/2</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Diamante</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>CSTRIKE</Text>
                  <Text style={styles.grupoText}>Jogo: CS-GO</Text>
                  <Text style={styles.grupoText}>Participantes: 4/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Xerife</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>


firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('Teste', documentSnapshot.data().userName);
        setGroups(d.filter(item => item.members.indexOf(documentSnapshot.data().userName) > -1));
      });
  }; 











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
          <View style={styles.containerJogos}>
            
          </View>
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


const games = data.map(item => {
  return `${item.gameImage}`
})

JSON.stringify(nameList);

const nameList = data.map(item => {
  return `${item.gameImage}`;
});

JSON.stringify(nameList);





import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
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
        //console.log(d);
        setData(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const renderItem = () => (
    <>
      {data.map(item => (
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
      <View style={styles.container}>
        <FlatList
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.gameName}
        />
      </View>
      <View style={styles.container2}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.meusJogosText}>JOGOS EM ALTA</Text>
          <Text style={styles.maisJogosText}>Ver mais</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            horizontal
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.gameName}
          />
        </View>
      </View>
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
    alignItems: 'center',
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

  