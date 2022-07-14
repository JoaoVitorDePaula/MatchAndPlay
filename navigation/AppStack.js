import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TelaHome from '../screens/TelaHome';
import TelaPerfil from '../screens/TelaPerfil';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TelaCriarGrupos from '../screens/TelaCriarGrupos';
import TelaCriarGrupos2 from '../screens/TelaCriarGrupos2';
import TelaEditarPerfil from '../screens/TelaEditarPerfil';
import TelaBusca from '../screens/TelaBusca';
import TelaBuscarGrupos from '../screens/TelaBuscarGrupos';
import TelaGrupos from '../screens/TelaGrupos';
import TelaVisualizarPerfil from '../screens/TelaVisualizarPerfil';
import TelaVisualizarJogos from '../screens/TelaVisualizarJogos';
import TelaSelecionarFotoPerfil from '../screens/TelaSelecionarFotoPerfil';
import TelaCampeonatos from '../screens/TelaCampeonatos';
import TelaCriarCampeonatos from '../screens/TelaCriarCampeonatos';
import TelaCriarCampeonatos2 from '../screens/TelaCriarCampeonatos2';
import TelaVisualizarGrupos from '../screens/TelaVisualizarGrupos';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={TelaHome}
      options={{
        title: 'Match&Play',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="Busca"
      component={TelaBusca}
      options={{
        title: 'Buscar Jogadores',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="TelaVisualizarPerfil"
      component={TelaVisualizarPerfil}
      options={{
        title: 'Visualizar Perfil',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="TelaVisualizarJogos"
      component={TelaVisualizarJogos}
      options={{
        title: 'Jogo',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="TelaPerfil"
      component={TelaPerfil}
      options={{
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
        title: 'Perfil',
        headerRight: () => (
          <MaterialCommunityIcons.Button
            name="account-edit"
            size={25}
            backgroundColor="#191919"
            color="#fff"
            onPress={() => navigation.navigate('TelaEditarPerfil')}
          />
        ),
      }}
    />
    <Stack.Screen
      name="TelaEditarPerfil"
      component={TelaEditarPerfil}
      options={{
        title: 'Editar Perfil',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen
      name="TelaSelecionarFotoPerfil"
      component={TelaSelecionarFotoPerfil}
      options={{
        title: 'Selecione sua foto perfil',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const GrupoStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Grupo"
      component={TelaGrupos}
      options={{
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
        title: 'Meus Grupos',
      }}
    />
    <Stack.Screen
      name="CriarGrupos"
      component={TelaCriarGrupos}
      options={{
        title: 'Criar Grupos',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />

    <Stack.Screen
      name="CriarGrupos2"
      component={TelaCriarGrupos2}
      options={{
        title: 'Criar Grupos',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />

<Stack.Screen
      name="BuscarGrupos"
      component={TelaBuscarGrupos}
      options={{
        title: 'Buscar Grupos',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />

<Stack.Screen
      name="VisualizarGrupos"
      component={TelaVisualizarGrupos}
      options={{
        title: 'Grupo',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const CampeonatoStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Grupo"
      component={TelaCampeonatos}
      options={{
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
        title: 'Campeonatos',
      }}
    />

    <Stack.Screen
      name="CriarCampeonatos"
      component={TelaCriarCampeonatos}
      options={{
        title: 'Criar Campeonatos',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />

    <Stack.Screen
      name="CriarCampeonatos2"
      component={TelaCriarCampeonatos2}
      options={{
        title: 'Criar Campeonatos',
        headerStyle: {backgroundColor: '#191919'},
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: '#2e64e5',
        tabBarStyle: {
          backgroundColor: 'rgba(34,36,40,1)',
        },
      }}>
      <Tab.Screen
        name="Cadastro"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Grupos"
        component={GrupoStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="people-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Campeonatos"
        component={CampeonatoStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="trophy" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppStack;
