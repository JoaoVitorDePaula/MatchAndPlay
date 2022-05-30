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
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-navigation';

export default function TelaGrupos({navigation}) {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));

  const {logout} = useContext(AuthContext);

  const [inputBusca, setInputBusca] = useState('');

  const MoverCriarGrupos = () => {
    navigation.navigate('CriarGrupos');
  };

  useEffect(() => {}, []);

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
        <View style={styles.container2}>
          <Text style={styles.meusGruposText}>MEUS GRUPOS</Text>

          <ScrollView horizontal={true}>
            <View style={styles.containerJogos}>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.container3}>
          <Text style={styles.meusGruposText}>GRUPOS QUE PARTICIPO</Text>

          <ScrollView horizontal={true}>
            <View style={styles.containerJogos}>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>GRUPO LOLZINHO</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 2/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Bronze</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>SOLO 2</Text>
                  <Text style={styles.grupoText}>Jogo: League of Legends</Text>
                  <Text style={styles.grupoText}>Participantes: 1/2</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Diamante</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonMaisStyle}
                activeOpacity={0.5}>
                <View style={styles.boxGrupos}>
                  <Text style={styles.grupoTitleText}>CSTRIKE</Text>
                  <Text style={styles.grupoText}>Jogo: CS-GO</Text>
                  <Text style={styles.grupoText}>Participantes: 4/5</Text>
                  <Text style={styles.grupoText}>Modalidade: Competitivo</Text>
                  <Text style={styles.grupoText}>Rank: Xerife</Text>
                  <Text style={styles.grupoText}>Avaliação: ⭐⭐⭐</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    alignItems: 'center',
    width: '90%',
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
