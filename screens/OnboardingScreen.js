import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, color: '#fff'}}>Pular</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, color: '#fff'}}>Próxima</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
    <Text style={{fontSize: 16, color: '#fff'}}>Pronto</Text>
  </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.replace('Login')}
      pages={[
        {
          backgroundColor: '#191919',
          image: (
            <Image
              source={require('../src/assets/OB1.png')}
              style={{
                width: 250,
                height: 250,
              }}
            />
          ),
          title: 'Busque Jogadores',
          subtitle: 'Encontre jogadores parecidos com você!',
        },
        {
          backgroundColor: '#191919',
          image: (
            <Image
              source={require('../src/assets/OB2.png')}
              style={{
                width: 250,
                height: 250,
              }}
            />
          ),
          title: 'Aumente sua reputação',
          subtitle: 'Seja bem avaliado e mostre a todos suas habilidades!',
        },
        {
          backgroundColor: '#191919',
          image: (
            <Image
              source={require('../src/assets/OB3.png')}
              style={{
                width: 250,
                height: 250,
              }}
            />
          ),
          title: 'Crie Campeonatos',
          subtitle:
            'Você está no controle, crie seus próprios campeonatos com seus amigos!',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
