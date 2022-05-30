import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  FlatList,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';

export default function TelaGrupos({navigation}) {
  const {user} = useContext(AuthContext);

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));

  const {logout} = useContext(AuthContext);

  const [myGroups, setMyGroups] = useState('');

  const [list, setList] = useState([]);

  const MoverCriarGrupos = () => {
    navigation.navigate('CriarGrupos');
  };

  const getMyGroups = () => {
    firestore()
      .collection('groups')
      .get()
      .then(querySnapshot => {
        let d = [];
        querySnapshot.forEach(documentSnapshot => {
          const group = {
            description: documentSnapshot.description,
            groupGame: documentSnapshot.data().groupGame,
            groupName: documentSnapshot.data().groupName,
            groupOwner: documentSnapshot.data().groupOwner,
            members: documentSnapshot.data().members,
            rank: documentSnapshot.data().rank,
            rating: documentSnapshot.data().rating,
          };
          d.push(group);
        });
        console.log(d);
        setList(d);
      })
      .catch(e => {
        console.log('Erro, catch user' + e);
      });
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity style={styles.buttonMaisStyle}>
        <View style={styles.boxGrupos}>
          <Text style={styles.grupoTitleText}>{item.groupName}</Text>
          <Text style={styles.grupoText}>Jogo: {item.groupGame}</Text>
          <Text style={styles.grupoText}>Rank: {item.rank}</Text>
          <Text style={styles.grupoText}>Tipo: {item.rank}</Text>
          <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
        </View>
      </TouchableOpacity>
    </>
  );

  useFocusEffect(
    React.useCallback(() => {
      getMyGroups();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ScrollView>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoverCriarGrupos()}>
            <Text style={styles.searchText}> Criar Grupos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => MoverCriarGrupos()}>
            <Text style={styles.searchText}> Buscar Grupos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <Text style={styles.meusGruposText}>MEUS GRUPOS</Text>
          <View>
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={item => item.groupName}
            />
          </View>
        </ScrollView>
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
  grupoTitleText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: '5%',
    marginLeft: '3%',
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
    height: 190,
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
