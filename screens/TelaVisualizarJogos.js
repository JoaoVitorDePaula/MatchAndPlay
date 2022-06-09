import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

const TelaVisualizarJogos = ({navigation, route}) => {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ImageBackground
        source={{uri: route.params.gameImage}}
        imageStyle={{opacity: 0.2}}
        style={{width: '100%', height: '100%'}}
        blurRadius={3}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.gameTitle}> {route.params.gameName}</Text>
        </View>
        <View style={styles.containerLinesTop}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: "90%"}}>
            <Text style={styles.gameDescriptionText}>
              {route.params.description}
            </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerLines}>
          <Text style={styles.followersNText}>{route.params.followers}</Text>
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
    marginTop: '5%',
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
});
