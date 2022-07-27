import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const TelaPerfil = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const [following, setFollowing] = useState(0);

  const [followed, setFollowed] = useState(0);

  const [favoriteGames, setFavoriteGames] = useState([]);

  const getUser = async () => {
    await firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        documentSnapshot.exists;
        setUserData(documentSnapshot.data());
      });
  };

  const getFavoriteGames = async () => {
    await firestore()
      .collection('user')
      .doc(user.uid)
      .collection('favoriteGames')
      .orderBy('gameName')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const game = {
            id: documentSnapshot.id,
            gameImage: documentSnapshot.data().gameImage,
          };
          d.push(game);
        });
        setFavoriteGames(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const RenderItem = () => (
    <>
      {favoriteGames.map((item, index) => (
        <TouchableOpacity key={index}>
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

  const getFollowing = async () => {
    await firestore()
      .collection('user')
      .doc(user.uid)
      .collection('following')
      .get()
      .then(({size}) => {
        setFollowing(size);
      });
  };

  const getFollowed = async () => {
    await firestore()
      .collection('user')
      .doc(user.uid)
      .collection('followed')
      .get()
      .then(({size}) => {
        setFollowed(size);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser(), getFollowing(), getFollowed(), getFavoriteGames();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topPage}>
            <View style={styles.containerImage}>
              <ImageBackground
                imageStyle={{opacity: 0.7}}
                style={{width: '100%', alignItems: 'center'}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/matchandplay-9b795.appspot.com/o/TERRA.jpg?alt=media&token=8fdadce2-7067-4887-bb55-c3eac98a1347',
                }}>
                <Avatar.Image
                  style={styles.userImg}
                  source={{
                    uri: userData.userImage,
                  }}
                  size={120}
                />
              </ImageBackground>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.userText}>
                {userData ? userData.userName : 'Ainda não há nome'}
              </Text>

              <View style={{}}>
                <MaterialCommunityIcons.Button
                  name="account-edit"
                  size={35}
                  backgroundColor="#191919"
                  color="#fff"
                  onPress={() => navigation.navigate('TelaEditarPerfil')}
                />
              </View>
            </View>
            <Caption style={styles.bioText}>
              {userData ? userData.bio : 'Ainda não há nada aqui'}
            </Caption>

            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: '#191919',
                    borderRightWidth: 4,
                  },
                ]}>
                <Title style={styles.boxText}>{followed}</Title>
                <Caption style={styles.captionText}>Seguidores</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title style={styles.boxText}>{following}</Title>
                <Caption style={styles.captionText}>Seguindo</Caption>
              </View>
            </View>
          </View>

          <View style={styles.socialContainer}>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                style={styles.IconContact}
                name="instagram"
                size={30}
              />
              <Text style={styles.contactText}>Joao_123</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                style={styles.IconContact}
                name="whatsapp"
                size={30}
              />
              <Text style={styles.contactText}>999887766</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                style={styles.IconContact}
                name="discord"
                size={30}
              />
              <Text style={styles.contactText}>Meu Servidor</Text>
            </View>
          </View>

          <View style={styles.container2}>
            <Text style={styles.meusJogosText}>Meus jogos favoritos</Text>
            <View>
              <View style={styles.containerJogos}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <RenderItem />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaPerfil;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  container2: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1D1D1D',
  },
  containerJogos: {
    marginTop: '3%',
  },
  containerImage: {
    width: '100%',
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: '6%',
    marginTop: '3%',
    marginLeft: '2%',
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: '38%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
    marginLeft: '5%',
  },
  submitText: {
    color: '#FFF',
    fontSize: 15,
    color: '#777777',
    marginLeft: '5%',
  },
  registerText: {
    color: '#35AAFF',
  },
  userImg: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: '30%',
    marginBottom: '2%',
    backgroundColor: '#777777',
  },
  btnEditar: {},
  registerText: {
    color: '#35AAFF',
    fontSize: 20,
  },
  userText: {
    flex: 2,
    color: '#FFF',
    fontSize: 22,
    marginTop: 15,
    marginLeft: Dimensions.get('window').height / 14,
    textAlign: 'center',
  },
  bioText: {
    color: '#FFF',
    fontSize: 13,
    color: '#777777',
    marginBottom: 15,
  },
  contactText: {
    color: '#C0C0C0',
    marginLeft: '5%',
    alignSelf: 'center',
  },
  captionText: {
    color: '#FFF',
    fontSize: 13,
    color: '#868686',
  },
  IconContact: {
    color: '#DEDEDE',
    marginLeft: '2%',
  },
  infoBox: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#777777',
  },
  infoBoxWrapper: {
    borderBottomColor: '#868686',
    borderBottomWidth: 0,
    borderTopColor: '#868686',
    borderTopWidth: 0,
    flexDirection: 'row',
    height: 70,
    marginBottom: 10,
    backgroundColor: '#2E2E2E',
    borderRadius: 50,
  },
  boxText: {
    color: '#FFF',
    fontSize: 18,
  },
  topPage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMaisStyle: {
    backgroundColor: '#494949',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    height: 160,
    width: 110,
    alignItems: 'center',
    marginLeft: 10,
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
  jogosImage: {
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 3.6,
    marginBottom: '5%',
    marginLeft: 16,
  },
});
