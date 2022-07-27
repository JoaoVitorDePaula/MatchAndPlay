import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

export default function TelaCriarGrupos({navigation}) {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [gamesData, setGamesData] = useState([]);
  const [list, setList] = useState([]);

  const [selectGame, setSelectGame] = useState();

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

  const getGames = () => {
    firestore()
      .collection('games')
      .orderBy('gameName')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const game = {
            id: documentSnapshot.id,
            gameName: documentSnapshot.data().gameName,
            rank: documentSnapshot.data().rank,
            gameImage: documentSnapshot.data().gameImage,
          };
          d.push(game);
        });
        setData(d);
        setList(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const MoverCriarGrupos = () => {
    navigation.navigate('CriarGrupos2',{
      idGame: selectGame,
    });
  };

  useEffect(() => {
    getGames(), getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
      <Text style={styles.userText}>Selecione o jogo do grupo:</Text>
      </View>
      <View
        style={{
          backgroundColor: '#363636',
          width: '90%',
          marginBottom: 15,
          fontSize: 17,
          borderRadius: 7,
          marginBottom: '6%',
          marginTop: '6%',
        }}>
      <Picker
      style={{color: '#FFF'}}
        selectedValue={selectGame}
        onValueChange={(itemValue, itemIndex) => setSelectGame(itemValue)}>
        {data.map(item => (
          <Picker.Item
            label={item.gameName}
            key={item.id}
            value={item.id}
          />
        ))}
      </Picker>
      </View>
      <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoverCriarGrupos()}>
            <Text style={styles.buttonText}> Próximo</Text>
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
    marginTop: '10%'
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
    fontSize: 21,
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
    marginTop: '6%'
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
