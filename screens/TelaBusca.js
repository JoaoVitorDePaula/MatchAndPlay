import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';

const TelaBusca = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);

  const routeUser = item => {
    console.log(item);
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={styles.profileBox}
        onPress={() =>
          navigation.navigate('TelaVisualizarPerfil', {
            userId: item.id,
            userName: item.userName,
            bio: item.bio,
            favoriteGames: item.favoriteGames,
            followers: item.followers,
            following: item.following,
          })
        }>
        <View style={{flexDirection: 'row'}}>
          <Avatar.Image
            style={styles.userImg}
            source={require('../src/assets/FotoPerfil.jpeg')}
            size={60}
          />
          <View>
            <Text style={styles.userText}>{item.userName}</Text>
            <Text style={styles.contentText}>{item.email}</Text>
            <Text style={styles.contentText}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );

  const getUser = () => {
    firestore()
      .collection('user')
      .get()
      .then(querySnapshot => {
        let d = [];
        //console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          const user = {
            id: documentSnapshot.id,
            name: documentSnapshot.data().name,
            email: documentSnapshot.data().email,
            userName: documentSnapshot.data().userName,
            bio: documentSnapshot.data().bio,
            favoriteGames: documentSnapshot.data().favoriteGames,
            userImage: documentSnapshot.data().userImage,
            followers: documentSnapshot.data().followers,
            following: documentSnapshot.data().following,
          };
          d.push(user);
        });
        //console.log(d);
        setData(d);
        setList(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setList(data);
    } else {
      setList(
        data.filter(
          item =>
            item.userName.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        ),
      );
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Procurando por alguém?"
        placeholderTextColor="#C0C0C0"
        autoCorrect={false}
        color="#EEEEEE"
        value={searchText}
        onChangeText={t => setSearchText(t)}
      />
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default TelaBusca;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#191919',
  },
  container1: {
    width: '100%',
    backgroundColor: '#191919',
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
    margin: '3%',
    marginLeft: '7%',
  },
  userText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '2%',
    marginLeft: '5%',
  },
  contentText: {
    color: '#FFF',
    fontSize: 15,
    marginLeft: '5%',
  },
  profileBox: {
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: '5%',
    width: '100%',
  },
  inputText: {
    backgroundColor: '#363636',
    width: '100%',
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginBottom: 17,
    marginTop: 10,
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
  searchText: {
    color: '#FFF',
    fontSize: 18,
  },
});
