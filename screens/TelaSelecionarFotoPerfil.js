import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import {CardAvatar} from '../components/CardAvatar';

export default function TelaSelecionarFotoPerfil({navigation}) {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [selectImage, setSelectImage] = useState();
  const [isFocusImagem, setIsFocusImagem] = useState(0);

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

  const getProfileImages = async () => {
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
        Alert.alert('Perfil Atualizado!', 'Sua foto foi atualizada!');
      });
  };

  const MoveEditarPerfil = () => {
    navigation.navigate('TelaEditarPerfil');
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
        <CardAvatar
          key={index}
          data={item}
          isActive={isFocusImagem === index}
          onPress={() => {
            setIsFocusImagem(index);
            setSelectImage(item);
          }}
        />
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
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          <RenderItem />
        </View>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => [handleUpdate(), MoveEditarPerfil()]}>
          <Text style={styles.buttonText}> Salvar </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  container: {
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
    width: 150,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
    marginBottom: '10%',
  },
  titleText: {
    color: '#FFF',
    fontSize: 22,
    marginBottom: '5%',
    marginTop: Dimensions.get('window').height / 17
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
