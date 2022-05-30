import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  Text,
  RefreshControl,
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const TelaPerfil = ({navigation, route}) => {
  const {logout} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [update, setUpdade] = useState(false);

  const whenUpdate = () => {
    setUpdade(true);
    setTimeout(
      () => {
        setUpdade(false);
      },
      1000,
      getUser(),
    );
  };

  const getUser = async () => {
    await firestore()
      .collection('user')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={update} onRefresh={whenUpdate} />
        }>
        <View style={styles.topPage}>
          <Avatar.Image
            style={styles.userImg}
            source={require('../src/assets/FotoPerfil.jpeg')}
            size={90}
          />
          <View style={{flexDirection: 'column-reverse'}}></View>
          <View>
            <Text style={styles.userText}>
              {userData ? userData.userName : 'Ainda não há nome'}
            </Text>
            <Caption style={styles.captionText}>
              {' '}
              {userData ? userData.bio : 'Ainda não há nada aqui'}{' '}
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
            <Title style={styles.boxText}>323</Title>
            <Caption style={styles.captionText}>Seguidores</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={styles.boxText}>458</Title>
            <Caption style={styles.captionText}>Seguindo</Caption>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            style={styles.IconContact}
            name="instagram"
            size={30}
          />
          <Text style={styles.contactText}>Master_123</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            style={styles.IconContact}
            name="whatsapp"
            size={30}
          />
          <Text style={styles.contactText}>24 99988 7766</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            style={styles.IconContact}
            name="discord"
            size={30}
          />
          <Text style={styles.contactText}>Meu Servidor</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.meusJogosText}>Meus Jogos</Text>
          <View style={styles.containerJogos}>
            <View style={styles.box2}>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <Text style={styles.boxAddGame}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/lol.jpeg')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.jogosImage}
                source={require('../src/assets/Games/star.jpeg')}
              />
            </TouchableOpacity>
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
    flexDirection: 'row',
    marginTop: '3%',
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
  },
  captionText: {
    color: '#FFF',
    fontSize: 13,
    color: '#777777',
  },
  IconContact: {
    color: '#777777',
    marginLeft: '2%',
    marginBottom: '3%',
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
    height: 160,
    width: 110,
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: '5%',
  },
});
