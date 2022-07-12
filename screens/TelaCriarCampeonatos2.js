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
  Button,
  Input,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function TelaCriarGrupos2({navigation, route}) {
  const {user} = useContext(AuthContext);

  const {criarGrupo} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [gameName, setGameName] = useState('');
  const [userData, setUserData] = useState(null);

  const [selectGame, setSelectGame] = useState();

  const [inputChampionshipName, setInputChampionshipName] = useState('');
  const [inputChampionshipGameImage, setInputChampionshipGameImage] =
    useState('');
  const [inputChampionshipGame, setInputChampionshipGame] = useState('');
  const [inputChampionshipOwner, setInputChampionshipOwner] = useState('');
  const [inputChampionshipDescription, setInputChampionshipDescription] =
    useState('');
  const [inputChampionshipMembers, setInputChampionshipMembers] = useState([]);
  const [inputChampionshipRank, setChampionshipRank] = useState('');
  const [inputChampionshipAwards, setChampionshipAwards] = useState('');
  const [inputChampionshipDateTime, setChampionshipDateTime] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    //console.warn('A date has been picked: ', date);
    setChampionshipDateTime(date),
      setDate(date),
      setTime(date),
      hideDatePicker();
  };

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== '' ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}` : '';
  };

  const getTime = () => {
    let tempTime = time.toString().split('');
    return time !== ''
      ? `${tempTime[16]}${tempTime[17]}${tempTime[18]}${tempTime[19]}${tempTime[20]}`
      : '';
  };

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
        setGameName(querySnapshot.data().gameName);
        setInputChampionshipGame(querySnapshot.data().gameName);
        setInputChampionshipGameImage(querySnapshot.data().gameImage);
        console.log(querySnapshot.data().gameImage);
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
      .then(setInputChampionshipMembers(user.uid))
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
              onChangeText={championshipName =>
                setInputChampionshipName(championshipName)
              }
            />
          </View>

          <Text style={styles.descriptionText}> Descrição </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite uma breve descrição"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              onChangeText={championshipDescription =>
                setInputChampionshipDescription(championshipDescription)
              }
            />
          </View>

          <Text style={styles.descriptionText}> Premiação </Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.inputText}
              placeholder="Digite qual a premiação"
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              onChangeText={championshipAwards =>
                setInputChampionshipAwards(championshipAwards)
              }
            />
          </View>

          <Text style={styles.descriptionText}> Ranking </Text>
          <View style={styles.container}>
            <View
              style={{
                backgroundColor: '#363636',
                width: '90%',
                marginBottom: 15,
                borderRadius: 7,
                marginBottom: '6%',
                textAlign: 'center',
                height: 48,
                justifyContent: 'center',
              }}>
              <Picker
                style={{color: '#FFF'}}
                selectedValue={selectGame}
                onValueChange={itemValue => {
                  setSelectGame(itemValue), setChampionshipRank(itemValue);
                }}>
                <Picker.Item
                  value=""
                  label="Selecione o ranking minimo do campeonato"
                  enabled={false}
                />
                {data.map(item => (
                  <Picker.Item label={item} key={item} value={item} />
                ))}
              </Picker>
            </View>
          </View>

          <Text style={styles.descriptionText}> Data e hora </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <TextInput
              style={styles.inputDateTime}
              value={getDate()}
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              editable={false}
            />
            <TextInput
              style={styles.inputDateTime}
              value={getTime()}
              placeholderTextColor="#C0C0C0"
              autoCorrect={false}
              color="#EEEEEE"
              editable={false}
            />
          </View>

          <View style={styles.btnDatetime}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.submitText}> Selecione a data e hora</Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => [
                criarGrupo(
                  inputChampionshipGame,
                  inputChampionshipName,
                  inputChampionshipOwner,
                  inputChampionshipDescription,
                  inputChampionshipMembers,
                  inputChampionshipRank,
                  inputChampionshipGameImage,
                  inputChampionshipDateTime,
                ),
                MoveGrupos(),
              ]}>
              <Text style={styles.submitText}> Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  btnDatetime: {
    backgroundColor: '#492BB3',
    width: '90%',
    height: 50,
    borderRadius: 7,
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'center',
    textAlign: 'center',
  },
  submitText: {
    color: '#FFF',
    fontSize: 20,
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
    fontSize: 20,
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
    fontSize: 20,
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
    fontSize: 16,
    borderRadius: 7,
    padding: 10,
    marginBottom: '6%',
  },
  inputDateTime: {
    backgroundColor: '#363636',
    width: '41%',
    marginBottom: 15,
    color: '#FFF',
    fontSize: 15,
    borderRadius: 7,
    padding: 10,
    marginLeft: '4%',
    marginRight: '4%',
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
