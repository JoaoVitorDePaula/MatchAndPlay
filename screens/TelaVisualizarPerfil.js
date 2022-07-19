import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {Avatar, Title, Caption} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const TelaVisualizarPerfil = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  const [isFollowing, setIsFollowing] = useState();

  const [following, setFollowing] = useState(0);

  const [isFollowed, setIsFollowed] = useState();

  const [followed, setFollowed] = useState(0);

  const [favoriteGames, setFavoriteGames] = useState([]);

  const getUser = async () => {
    await firestore()
      .collection('user')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const getIsFollowing = async () => {
    await firestore()
      .collection('user')
      .doc()
      .collection('following')
      .doc(route.params.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setIsFollowing(true);
        } else {
          setIsFollowing(false);
        }
      });
  };

  const getIsFollowed = async () => {
    await firestore()
      .collection('user')
      .doc()
      .collection('followed')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setIsFollowed(true);
        } else {
          setIsFollowed(false);
        }
      });
  };

  const changeFollowState = async () => {
    if (isFollowing) {
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('following')
        .doc(route.params.userId)
        .delete()
        .then();
    } else {
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('following')
        .doc(route.params.userId)
        .set({})
        .then();
    }
  };

  const changeFollowState2 = async () => {
    if (isFollowed) {
      await firestore()
        .collection('user')
        .doc(route.params.userId)
        .collection('followed')
        .doc(user.uid)
        .delete()
        .then();
    } else {
      await firestore()
        .collection('user')
        .doc(route.params.userId)
        .collection('followed')
        .doc(user.uid)
        .set({})
        .then();
    }
  };

  const RenderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.btnSeguir}>
            <Text style={styles.registerText}>Mensagem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSeguir}
            onPress={() => [
              changeFollowState(),
              changeFollowState2(),
              setFollowed(state => state - 1),
            ]}>
            <Text style={styles.registerText}>Deixa de seguir</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.btnSeguir}
          onPress={() => [
            changeFollowState(),
            changeFollowState2(),
            setFollowed(state => state + 1),
          ]}>
          <Text style={styles.registerText}>Seguir</Text>
        </TouchableOpacity>
      );
    }
  };

  const getFollowing = async () => {
    await firestore()
      .collection('user')
      .doc(route.params.userId)
      .collection('following')
      .get()
      .then(({size}) => {
        setFollowing(size);
      });
  };

  const getFollowed = async () => {
    await firestore()
      .collection('user')
      .doc(route.params.userId)
      .collection('followed')
      .get()
      .then(({size}) => {
        setFollowed(size);
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

  const getFavoriteGames = async () => {
    await firestore()
      .collection('user')
      .doc(route.params.userId)
      .collection('favoriteGames')
      .orderBy('gameName')
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
        setFavoriteGames(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser(), getIsFollowing(), getFollowing(), getFavoriteGames();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      getIsFollowed(), getFollowed();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = firestore()
        .collection('user')
        .doc(user.uid)
        .collection('following')
        .doc(route.params.userId)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        });
      return () => subscribe();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = firestore()
        .collection('user')
        .doc(route.params.userId)
        .collection('followed')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
        });
      return () => subscribe();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View style={styles.container}>
        <View style={styles.topPage}>
          <Avatar.Image
            style={styles.userImg}
            source={{
              uri: route.params.userImage,
            }}
            size={90}
          />
          <View style={{flexDirection: 'column-reverse'}}></View>
          <View>
            <Text style={styles.userText}>
              {' '}
              {route.params.userName}
            </Text>
            <Caption style={styles.captionText}>
              {' '}
              {route.params.bio}{' '}
            </Caption>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <RenderFollowButton />
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
          <Text style={styles.contactText}>Jukes_123</Text>
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
          <Text style={styles.meusJogosText}>Jogos favoritos</Text>
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

export default TelaVisualizarPerfil;

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
    flexDirection: 'row',
    marginTop: '3%',
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: '6%',
    marginTop: '3%',
    marginLeft: '2%',
  },
  submitText: {
    color: '#FFF',
    fontSize: 15,
    color: '#777777',
    marginLeft: '5%',
  },
  userImg: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: 'rgba(255, 255, 255,0.3)',
  },
  btnSeguir: {
    width: '38%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    borderRightColor: '#fff',
    borderRightWidth: 1,
    borderRadius: 4,
    marginRight: '1%',
    marginLeft: '1%',
  },

  registerText: {
    color: '#FFF',
    fontSize: 15,
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
