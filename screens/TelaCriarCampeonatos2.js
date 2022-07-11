import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';

export default function TelaCriarGrupos2({navigation, route}) {
  const {user} = useContext(AuthContext);

  const {criarGrupo} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [gameName, setGameName] = useState('');
  const [userData, setUserData] = useState(null);

  const [selectGame, setSelectGame] = useState();

  const [inputChampionshipName, setInputChampionshipName] = useState('');
  const [inputChampionshipGameImage, setInputChampionshipGameImage] = useState('');
  const [inputChampionshipGame, setInputChampionshipGame] = useState('');
  const [inputChampionshipOwner, setInputChampionshipOwner] = useState('');
  const [inputChampionshipDescription, setInputChampionshipDescription] = useState('');
  const [inputChampionshipMembers, setInputChampionshipMembers] = useState([]);
  const [inputChampionshipRank, setChampionshipRank] = useState('');
  const [inputChampionshipAwards, setChampionshipAwards] = useState('');

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          //console.log('Dados do usuário:', documentSnapshot.data());
          setUserData(documentSnapshot.data(), setInputGroupOwner(user.uid));
        }
      });
  };

  const MoveGrupos = () => {
    navigation.navigate('Grupo');
  };

  const getGames = () => {
    firestore()
      .collection('games')
      .doc(route.params.idGame)
      .get()
      .then(querySnapshot => {
        setData(querySnapshot.data().rank);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getNameGames = () => {
    firestore()
      .collection('games')
      .doc(route.params.idGame)
      .get()
      .then(querySnapshot => {
        setChampionshipGameName(querySnapshot.data().gameName);
        setInputChampionshipGame(querySnapshot.data().gameName);
        setInputChampionshipGameImage(querySnapshot.data().gameImage);
        console.log(querySnapshot.data().gameImage)
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getUserName = () => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(
        setInputMembers(user.uid)
      )
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getGames(), getUser(), getNameGames(), getUserName();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.userText}> {gameName} </Text>
        </View>

        <View style={{alignItems: 'center'}}></View>

        <View>
          <Text style={styles.descriptionText}> Nome do campeonato </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite o nome do campeonato"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              onChangeText={championshipName => setInputChampionshipName(championshipName)}
            />
          </View>

          <Text style={styles.descriptionText}> Descrição </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite uma descrição para seu campeonato"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              onChangeText={championshipDescription => setInputChampionshipDescription(championshipDescription)}
            />
          </View>

          <Text style={styles.descriptionText}> Ranking </Text>
          <View style={styles.container}>
            <Picker
              style={[styles.inputText]}
              selectedValue={selectGame}
              onValueChange={itemValue => {
                setSelectGame(itemValue), setChampionshipRank(itemValue);
              }}>
              <Picker.Item
                value=""
                label="Selecione seu ranking"
                enabled={false}
              />
              {data.map(item => (
                <Picker.Item label={item} key={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() =>
              [criarGrupo(
                inputChampionshipGame,
                inputChampionshipName,
                inputChampionshipOwner,
                inputChampionshipDescription,
                inputChampionshipMembers,
                inputChampionshipRank,
                inputChampionshipGameImage,
                inputChampionshipDate,
              ), MoveGrupos()]
            }>
            <Text style={styles.submitText}> Criar</Text>
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
  userText: {
    color: '#FFF',
    fontSize: 30,
    margin: '6%',
  },
  buttonText: {
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
    color: '#FFF',
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
