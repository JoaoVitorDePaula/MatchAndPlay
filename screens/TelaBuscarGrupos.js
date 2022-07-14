import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const TelaBuscaGrupos = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);
  const [memberSize, setMemberSize] = useState(0);

  const routeUser = item => {
    console.log(item);
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TelaVisualizarGrupos', {
            id: item.id,
            gameImage: item.gameImage,
            gameName: item.gameName,
            platforms: item.platforms,
            description: item.description,
          })
        }>
        <View style={styles.boxGrupos}>
          <ImageBackground
            source={{uri: item.groupGameImage}}
            imageStyle={{opacity: 0.2}}
            blurRadius={3}>
            <Text style={styles.grupoTitleText}>{item.groupName}</Text>
            <Text style={styles.grupoText}>Jogo: {item.groupGame}</Text>
            <Text style={styles.grupoText}>Rank: {item.rank}</Text>
            <Text style={styles.grupoText}>Tipo: Competitivo</Text>
            <Text style={styles.grupoText}>
              members: {item.members.length}/{item.maxMembers}
            </Text>

            <Text style={styles.grupoTextEnd}>Avaliação: ⭐⭐⭐⭐⭐</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );

  const getGroups = () => {
    firestore()
      .collection('groups')
      //.where(firebase.firestore.FieldPath.documentId(), "!=", user.uid)
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const group = {
            id: documentSnapshot.id,
            description: documentSnapshot.data().description,
            groupGame: documentSnapshot.data().groupGame,
            groupGameImage: documentSnapshot.data().groupGameImage,
            groupName: documentSnapshot.data().groupName,
            groupOwner: documentSnapshot.data().groupOwner,
            members: documentSnapshot.data().members.length,
            rank: documentSnapshot.data().rank,
            rating: documentSnapshot.data().rating,
            maxMembers: documentSnapshot.data().maxMembers,
          };
          d.push(group);
        });
        //console.log(d);
        setData(d);
        setList(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getMemberSize = async () => {
    await firestore()
      .collection('groups')
      .get()
      .then(({size}) => {
        setMemberSize(size);
      });
  };

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setList(data);
    } else {
      setList(
        data.filter(
          item =>
            item.groupName.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        ),
      );
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
          windowSize={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default TelaBuscaGrupos;

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
    backgroundColor: 'rgba(255, 255, 255,0.1)',
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
  boxGrupos: {
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    width: '95%',
    marginLeft: 10,
    marginBottom: 20,
  },
  grupoText: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '2%',
  },
  grupoTitleText: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '1%',
  },
  grupoTextEnd: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '2%',
    marginBottom: '4%',
  },
});
