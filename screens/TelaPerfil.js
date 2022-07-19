import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Text,
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
      <View style={styles.container}>
        <View style={styles.topPage}>
          <Avatar.Image
            style={styles.userImg}
            source={{
              uri: userData.userImage,
            }}
            size={90}
          />
          <View>
            <Text style={styles.userText}>
              {userData ? userData.userName : 'Ainda não há nome'}
            </Text>
            <Caption style={styles.captionText}>
              {' '}
              {userData ? userData.bio : 'Ainda não há nada aqui'}
            </Caption>
          </View>
        </View>
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: '#777777',
                borderRightWidth: 1,
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
          <ScrollView>
            <View style={styles.containerJogos}>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <RenderItem />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
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
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: 'rgba(255, 255, 255,0.3)',
  },
  btnEditar: {},
  registerText: {
    color: '#35AAFF',
    fontSize: 20,
  },
  userText: {
    color: '#FFF',
    fontSize: 18,
  },
  contactText: {
    color: '#777777',
    marginLeft: '5%',
    alignSelf: 'center',
  },
  captionText: {
    color: '#FFF',
    fontSize: 13,
    color: '#777777',
  },
  IconContact: {
    color: '#777777',
    marginLeft: '2%',
    
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBoxWrapper: {
    borderBottomColor: '#777777',
    borderBottomWidth: 1,
    borderTopColor: '#777777',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    marginBottom: '3%',
    backgroundColor: '#1D1D1D',
  },
  boxText: {
    color: '#FFF',
    fontSize: 18,
  },
  topPage: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 150,
    width: 100,
    marginBottom: '5%',
    marginLeft: 16,
  },
});