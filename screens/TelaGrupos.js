import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function TelaGrupos({navigation}) {
  const {user} = useContext(AuthContext);

  const [groups, setGroups] = useState('');

  const [list, setList] = useState([]);
  const [data, setData] = useState([]);

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={styles.buttonMaisStyle}
        onPress={() =>
          navigation.navigate('VisualizarGrupos', {
            id: item.id,
            description: item.description,
            groupGame: item.groupGame,
            groupName: item.groupName,
            groupOwner: item.groupOwner,
            members: item.members,
            rank: item.rank,
            rating: item.rating,
            maxMembers: item.maxMembers,
            groupGameImage: item.groupGameImage,
          })
        }>
        <View style={styles.boxGrupos}>
          <ImageBackground
            source={{uri: item.groupGameImage}}
            imageStyle={{opacity: 0.2}}
            style={{width: '100%'}}
            blurRadius={3}>
            <Text style={styles.grupoTitleText}>{item.groupName}</Text>
            <Text style={styles.grupoText}>Jogo: {item.groupGame}</Text>
            <Text style={styles.grupoText}>Rank: {item.rank}</Text>
            <Text style={styles.grupoText}>Tipo: Competitivo</Text>
            <Text style={styles.grupoText}>
              Membros: {item.members.length}/{item.maxMembers}
            </Text>
            <Text style={styles.grupoTextEnd}>Avaliação: ⭐⭐⭐⭐⭐</Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </>
  );

  const MoverCriarGrupos = () => {
    navigation.navigate('CriarGrupos');
  };

  const MoverBuscarGrupos = () => {
    navigation.navigate('BuscarGrupos');
  };

  const getGroups = () => {
    firestore()
      .collection('groups')
      //.where('members[0]', "!=", user.uid)
      .get()
      .then(querySnapshot => {
        let d = [];
        let a = user.uid;

        querySnapshot.forEach(documentSnapshot => {
          const group = {
            id: documentSnapshot.id,
            description: documentSnapshot.data().description,
            groupGame: documentSnapshot.data().groupGame,
            groupName: documentSnapshot.data().groupName,
            groupOwner: documentSnapshot.data().groupOwner,
            members: documentSnapshot.data().members,
            rank: documentSnapshot.data().rank,
            rating: documentSnapshot.data().rating,
            maxMembers: documentSnapshot.data().maxMembers,
            groupGameImage: documentSnapshot.data().groupGameImage,
          };
          d.push(group);
        });
        setList(d);
        setData(d.filter(item => item.groupOwner.indexOf(a) > -1));
        setGroups(
          d.filter(item => item.members.includes(a) && item.groupOwner != a),
        );
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const getUser = () => {
    firestore()
      .collection('user')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data().userName);
        }
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser(), getGroups();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoverCriarGrupos()}>
            <Text style={styles.searchText}> Criar Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoverBuscarGrupos()}>
            <Text style={styles.searchText}> Buscar Grupos</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.meusGruposText}>MEUS GRUPOS</Text>
          <FlatList
            horizontal
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.groupName}
          />
        </View>

        <View>
          <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>
          <FlatList
            horizontal
            data={groups}
            renderItem={renderItem}
            keyExtractor={item => item.groupName}
          />
        </View>
      </View>
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
    width: '90%',
    flexDirection: 'row',
  },
  container2: {
    backgroundColor: '#1D1D1D',
  },
  container3: {},
  container4: {
    backgroundColor: '#1D1D1D',
  },
  containerJogos: {
    flexDirection: 'row',
    marginTop: '1%',
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
    marginLeft: '8%',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    margin: '3%',
  },
  searchText: {
    color: '#FFF',
    fontSize: 18,
  },
  registerText: {
    color: '#35AAFF',
  },
  grupoText: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '2%',
  },
  grupoTextEnd: {
    fontSize: 20,
    color: '#FFF',
    marginLeft: '2%',
    marginBottom: '4%',
  },
  grupoTitleText: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: '3%',
    marginTop: '2%',
  },
  meusGruposText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: '2%',
    marginTop: '2%',
    marginBottom: '2%',
  },
  boxGrupos: {
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#363636',
    borderRadius: 10,
    width: 260,
    marginLeft: 10,
    marginBottom: 20,
  },
  inputText: {
    backgroundColor: '#363636',
    width: '90%',
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
});
