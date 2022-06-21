import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

export default function TelaSelecionarFotoPerfil({navigation}) {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [selectImage, setSelectImage] = useState();

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const getProfileImages = async() => {
    firestore()
      .collection('profile_images')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setData(documentSnapshot.data().url);
        });
      });
  };

  const handleUpdate = async () => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .update({
        userImage: selectImage,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Perfil Atualizado',
          'Seu perfil foi atualizado com sucesso.',
        );
      });
  };

  // const handleUpdate2 = async () => {
  //   firestore()
  //     .collection('user')
  //     .doc(user.uid)
  //     .update({
  //       social: {
  //         'whatsapp': "123",
  //         'discord': "123123"
  //       }
  //     })
  //     .then(() => {
  //       console.log('User Updated!');
  //       Alert.alert(
  //         'Perfil Atualizado',
  //         'Seu perfil foi atualizado com sucesso.',
  //       );
  //     });
  // };

  const RenderItem = () => (
    <>
      {data.map((item, index) => (
        <TouchableOpacity key={index} 
        onPress={() => [setSelectImage(item)]}>
          <Image
            style={styles.jogosImage}
            source={{
              uri: item,
            }}
          />
        </TouchableOpacity>
      ))}
    </>
  );

  useEffect(() => {
    getProfileImages();
  }, []);

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.titleText}>Selecione seu avatar:</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',}}>
        <RenderItem />
      </View>
      <TouchableOpacity style={styles.btnSubmit} onPress={() => [handleUpdate()]}>
        <Text style={styles.buttonText}> Salvar </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
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
    backgroundColor: '#191919',
    alignItems: 'center',
    textAlign: 'center',
  },
  container1: {
    marginTop: '10%',
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
  userImg: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
  },
  titleText: {
    color: '#FFF',
    fontSize: 30,
    marginBottom: '5%',
    marginTop: '5%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  jogosImage: {
    backgroundColor: '#rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: '#494949',
    borderRadius: 100,
    height: 70,
    width: 70,
    marginLeft: "4%",
    marginBottom: "8%",
    borderColor: 'rgba(255, 255, 255, 1)'
  },
});
