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
import {Picker} from '@react-native-picker/picker';

export default function TelaSelecionarFotoPerfil({navigation}) {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);

  const [selectImage, setSelectImage] = useState();

  const [selected, setSelected] = useState();

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

  const getProfileImages = () => {
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

  const RenderItem = () => (
    <>
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => [setSelectImage(item), console.log(item)]}>
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
    <View style={styles.container}>
      <Text style={styles.titleText}>Selecione seu avatar:</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <RenderItem />
      </View>

      <TouchableOpacity style={styles.btnSubmit} onPress={() => handleUpdate()}>
        <Text style={styles.buttonText}> Salvar </Text>
      </TouchableOpacity>
    </View>
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
    color: '#FFF',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    marginBottom: '6%',
    marginTop: '6%',
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
  jogosImage: {
    backgroundColor: '#494949',
    borderWidth: 1,
    borderColor: '#494949',
    borderRadius: 100,
    height: 80,
    width: 80,
    marginLeft: 10,
    marginBottom: 20,
  },
});
