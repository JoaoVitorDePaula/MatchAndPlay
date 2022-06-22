import React, {useState, useContext} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Text,
  Alert,
} from 'react-native';
import {Title} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

export default function TelaEditarPerfil({navigation}) {
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [userImage, setUserImage] = useState();

  const MoveSelecionarFoto = () => {
    navigation.navigate('TelaSelecionarFotoPerfil');
  };

  const MovePerfil = () => {
    navigation.navigate('TelaPerfil');
  };

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const getProfileImage = () => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        setUserImage(documentSnapshot.data().userImage);
      });
  };

  const handleUpdate = async () => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .update({
        bio: userData.bio,
        name: userData.name,
        userName: userData.userName,
      })
      .then(() => {
        console.log('Perfil Atualizado!');
        Alert.alert(
          'Perfil Atualizado',
          'Seu perfil foi atualizado com sucesso.',
        );
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser(),getProfileImage();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => MoveSelecionarFoto()}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%',
                backgroundColor: 'rgba(255, 255, 255,0.4)'
              }}>
              <ImageBackground
                source={{
                  uri: userImage,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 100}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={40}
                    color="#000"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#000',
                      borderRadius: 10,
                      backgroundColor:'rgba(255,255,255,0.3)',
                      
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Title style={styles.userText}>
            {' '}
            {userData ? userData.userName : ''}{' '}
          </Title>
        </View>

        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.descriptionText}> Nome real </Text>
            <Text style={styles.captionText}> Não será exibido </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite seu verdadeiro nome"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              value={userData ? userData.name : ''}
              onChangeText={txt => setUserData({...userData, name: txt})}
            />
          </View>
          <Text style={styles.descriptionText}> Nome de Usuario </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Este nome será exibido no seu perfil"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              value={userData ? userData.userName : ''}
              onChangeText={txt => setUserData({...userData, userName: txt})}
            />
          </View>
          <Text style={styles.descriptionText}> Bio </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="O que gostaria de dizer aos outros..."
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              value={userData ? userData.bio : ''}
              onChangeText={txt => setUserData({...userData, bio: txt})}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => [handleUpdate(), MovePerfil()]}>
            <Text style={styles.submitText}> Atualizar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container2}></View>
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
    flex: 1,
    width: '100%',
  },
  container2: {
    flex: 1,
    width: '100%',
    height: 50,
  },
  btnSubmit: {
    backgroundColor: '#492BB3',
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
    fontSize: 18,
    margin: '3%',
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
    borderColor: '#fff',
    borderRadius: 10,
    margin: '3%',
    height: 160,
    width: 110,
    alignItems: 'center',
  },
  inputText: {
    backgroundColor: '#363636',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginBottom: '6%',
  },
  descriptionText: {
    color: '#c0c0c0',
    fontSize: 18,
    marginLeft: '4%',
    marginBottom: '1%',
  },
  captionText: {
    color: '#FFF',
    fontSize: 13,
    color: '#777777',
    marginLeft: '40%',
    marginTop: '1.5%',
  },
});
