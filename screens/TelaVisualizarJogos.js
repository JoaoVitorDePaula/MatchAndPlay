import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const TelaVisualizarJogos = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [isFavorite, setIsFavorite] = useState();

  const [isFavorited, setIsFavorited] = useState();

  const [favorited, setFavorited] = useState(0);

  const getIsFavorite = async () => {
    await firestore()
      .collection('user')
      .doc()
      .collection('following')
      .doc(route.params.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      });
  };

  const getIsFavorited = async () => {
    await firestore()
      .collection('user')
      .doc()
      .collection('favorited')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setIsFavorited(true);
        } else {
          setIsFavorited(false);
        }
      });
  };

  const changeFollowState = async () => {
    if (isFavorite) {
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('favoriteGames')
        .doc(route.params.id)
        .delete()
        .then();
    } else {
      await firestore()
        .collection('user')
        .doc(user.uid)
        .collection('favoriteGames')
        .doc(route.params.id)
        .set({})
        .then();
    }
  };

  const changeFollowState2 = async () => {
    if (isFavorited) {
      await firestore()
        .collection('games')
        .doc(route.params.id)
        .collection('favorited')
        .doc(user.uid)
        .delete()
        .then();
    } else {
      await firestore()
        .collection('games')
        .doc(route.params.id)
        .collection('favorited')
        .doc(user.uid)
        .set({})
        .then();
    }
  };

  const getFavorite = async () => {
    await firestore()
      .collection('games')
      .doc(route.params.id)
      .collection('favoriteGames')
      .get()
      .then(({size}) => {
        console.log('Seguidores', size);
        setFollowing(size);
      });
  };

  const getFavorited = async () => {
    await firestore()
      .collection('games')
      .doc(route.params.id)
      .collection('favorited')
      .get()
      .then(({size}) => {
        console.log('Favorito', size);
        setFavorited(size);
        console.log(favorited);
      });
  };

  const getUser = async () => {
    await firestore()
      .collection('user')
      .doc()
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const RenderFollowButton = () => {
    if (isFavorite) {
      return (
        <TouchableOpacity
          onPress={() => [changeFollowState(), changeFollowState2(), setFavorited(state => state-1)]}>
          <Image
            style={{
              width: 40,
              height: 40,
              alignSelf: 'flex-end',
              marginTop: "2%",
              marginRight: "2%",
            }}
            source={require('../src/assets/favorite.png')}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => [changeFollowState(), changeFollowState2(), setFavorited(state => state+1)]}>
          <Image
            style={{
              width: 40,
              height: 40,
              opacity: 0.2,
              alignSelf: 'flex-end',
              marginTop: "2%",
              marginRight: "2%"
            }}
            source={require('../src/assets/favorite.png')}
          />
        </TouchableOpacity>
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser(), getIsFavorite(), getFavorite();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      getIsFavorited(), getFavorited();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = firestore()
        .collection('user')
        .doc(user.uid)
        .collection('favoriteGames')
        .doc(route.params.id)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        });
      return () => subscribe();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = firestore()
        .collection('games')
        .doc(route.params.id)
        .collection('favorited')
        .doc(user.uid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.exists) {
            setIsFavorited(true);
          } else {
            setIsFavorited(false);
          }
        });
      return () => subscribe();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ImageBackground
        source={{uri: route.params.gameImage}}
        imageStyle={{opacity: 0.2}}
        style={{width: '100%', height: '100%'}}
        blurRadius={3}>

<RenderFollowButton/>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.gameTitle}>{route.params.gameName}</Text>
         
        </View>
        <View style={styles.containerLinesTop}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Text style={styles.gameDescriptionText}>
                {route.params.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerLines}>
          <Text style={styles.followersNText}>{favorited}</Text>
          <Text style={styles.followersText}>Seguidores</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TelaVisualizarJogos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerLines: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: '3%',
  },
  containerLinesTop: {
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.4)',
  },
  topPage: {
    alignItems: 'center',
  },
  gameTitle: {
    color: '#FFF',
    fontSize: 35,
    marginBottom: '5%',
  },
  gameText: {
    color: '#FFF',
    fontSize: 15,
    color: '#fff',
  },
  gameDescriptionText: {
    color: '#FFF',
    fontSize: 17,
    marginBottom: '5%',
    marginTop: '5%',
    textAlign: 'justify',
  },
  followersText: {
    color: '#FFF',
    fontSize: 16,
    color: '#fff',
    margin: '3%',
  },
  followersNText: {
    color: '#FFF',
    fontSize: 16,
    color: '#fff',
    marginTop: '3%',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#FFF',
    fontSize: 18,
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
});
