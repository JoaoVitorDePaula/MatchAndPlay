import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const TelaVisualizarGrupos = ({navigation, route}) => {
  const {user} = useContext(AuthContext);

  const [userData, setUserData] = useState(null);

  const [memberIn, setMemberIn] = useState(true);

  const {addMember} = useContext(AuthContext);

  const {removeMember} = useContext(AuthContext);

  const {deleteGroup} = useContext(AuthContext);

  const [merbersNumber, setMembersNumber] = useState(null);

  const getMemberNumber = () => {
    setMembersNumber(route.params.members.length);
  };

  const getUser = async () => {
    await firestore()
      .collection('user')
      .doc()
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const MoveGrupos = () => {
    navigation.navigate('Grupo');
  };

  const RenderFollowButton = () => {
    if (memberIn) {
      return (
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => [
            addMember(user.uid, route.params.id),
            setMembersNumber(state => state + 1),
          ]}>
          <Text style={styles.submitText}> Participar</Text>
        </TouchableOpacity>
      );
    } else if (memberIn == false && route.params.groupOwner == user.uid) {
      return (
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => [deleteGroup(route.params.id), MoveGrupos()]}>
          <Text style={styles.submitText}> Excluir</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => [
            removeMember(user.uid, route.params.id),
            setMembersNumber(state => state - 1),
          ]}>
          <Text style={styles.submitText}> Sair</Text>
        </TouchableOpacity>
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const subscribe = firestore()
        .collection('groups')
        .doc(route.params.id)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot.data().members.includes(user.uid)) {
            setMemberIn(false);
            console.log(documentSnapshot.data().members);
          } else {
            setMemberIn(true);
            console.log(documentSnapshot.data().members);
          }
        });
      return () => subscribe();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      getUser(), getMemberNumber();
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191919'}}>
      <ImageBackground
        source={{uri: route.params.groupGameImage}}
        imageStyle={{opacity: 0.2}}
        style={{width: '100%', height: '100%'}}
        blurRadius={3}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.gameTitle}>{route.params.groupName}</Text>
        </View>
        <View style={styles.containerLinesTop}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Text style={styles.gameDescriptionText}>
                {route.params.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.containerLines}>
          <Text style={styles.followersNText}>
            {merbersNumber}/{route.params.maxMembers}
          </Text>
          <Text style={styles.followersText}>Membros</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <RenderFollowButton />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TelaVisualizarGrupos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  containerLines: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: '3%',
  },
  containerLinesTop: {
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.4)',
  },
  topPage: {
    alignItems: 'center',
  },
  gameTitle: {
    color: '#FFF',
    fontSize: 35,
    marginBottom: '5%',
  },
  gameText: {
    color: '#FFF',
    fontSize: 15,
    color: '#fff',
  },
  gameDescriptionText: {
    color: '#FFF',
    fontSize: 17,
    marginBottom: '5%',
    marginTop: '5%',
    textAlign: 'justify',
  },
  followersText: {
    color: '#FFF',
    fontSize: 16,
    color: '#fff',
    margin: '3%',
  },
  followersNText: {
    color: '#FFF',
    fontSize: 16,
    color: '#fff',
    marginTop: '3%',
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    color: '#FFF',
    fontSize: 18,
  },
  boxAddGame: {
    fontSize: 100,
    color: '#363636',
  },
  meusJogosText: {
    color: '#FFF',
    fontSize: 18,
    marginLeft: '2%',
    marginTop: '2%',
  },
  btnSeguir: {
    width: '38%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
    borderBottomColor: '#FFF',
    borderBottomWidth: 1,
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    borderRightColor: '#fff',
    borderRightWidth: 1,
    borderRadius: 4,
    marginRight: '1%',
    marginLeft: '1%',
  },
  btnSubmit: {
    backgroundColor: '#492BB3',
    width: '45%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginTop: '5%',
    marginBottom: '5%',
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    margin: '3%',
  },
});
