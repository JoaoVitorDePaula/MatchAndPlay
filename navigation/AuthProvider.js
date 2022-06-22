import auth, {firebase} from '@react-native-firebase/auth';
import {async} from '@firebase/util';
import React, {useContext, useState, useEffect, createContext} from 'react';
import {GoogleSignin} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, senha) => {
          try {
            await auth().signInWithEmailAndPassword(email, senha);
          } catch (error) {
            console.log(error);
            Alert.alert('Ops!', 'Email ou senha incorretos, tente novamente!');
          }
        },

        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            await auth()
              .signInWithCredential(googleCredential)
              .catch(error => {
                console.log('Alguma coisa deu errado: ', error);
                Alert.alert('Erro:', 'Algo deu errado, tente novamente.');
              });
          } catch (error) {
            console.log({error});
          }
        },

        googleRegister: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();

            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);

            await auth()
              .signInWithCredential(googleCredential)
              .then(() => {
                firestore()
                  .collection('user')
                  .doc(auth().currentUser.uid)
                  .set({
                    bio: '',
                    email: auth().currentUser.email,
                    name: '',
                    userImage: 'https://firebasestorage.googleapis.com/v0/b/matchandplay-9b795.appspot.com/o/Profile%20Images%2Fdefault.jpeg?alt=media&token=69eb3d60-6b38-41bf-a7ca-ca781f3f4483',
                    userName: '',
                  })
                  .catch(error => {
                    console.log(
                      'Erro ao adicionar o usuario ao banco de dados: ',
                      error,
                    );
                    Alert.alert(
                      'Erro:',
                      'Não foi possivel se conectar ao banco de dados corretamente!',
                    );
                  });
              })
              .catch(error => {
                console.log('Erro ao se cadastrar: ', error);
                Alert.alert(
                  'Erro ao Cadastrar:',
                  'Não foi possivel realizar o cadastro corretamente!',
                );
              });
          } catch (error) {
            console.log({error});
          }
        },

        register: async (email, senha) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, senha)
              .then(() => {
                firestore()
                  .collection('user')
                  .doc(auth().currentUser.uid)
                  .set({
                    bio: '',
                    email: email,
                    name: '',
                    userImage: 'https://firebasestorage.googleapis.com/v0/b/matchandplay-9b795.appspot.com/o/Profile%20Images%2Fdefault.jpeg?alt=media&token=69eb3d60-6b38-41bf-a7ca-ca781f3f4483',
                    userName: '',
                  })
                  .catch(error => {
                    console.log('Algo deu errado:', error);
                    Alert.alert(
                      'Erro:',
                      'Não foi possivel se conectar ao banco de dados corretamente!',
                    );
                  });
              })
              .catch(error => {
                console.log('Algo deu errado: ', error);
                Alert.alert(
                  'Erro ao cadastrar',
                  'Já existe uma conta com este endereço de email!',
                );
              });
          } catch (e) {
            console.log(e);
            Alert.alert(
              'Erro ao cadastrar',
              'Já existe uma conta com este endereço de email!',
            );
          }
        },

        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },

        criarGrupo: async (
          groupGame,
          groupName,
          groupOwner,
          description,
          members,
          rank,
          gameImage,
        ) => {
          firestore()
            .collection('groups')
            .add({
              groupGame: groupGame,
              groupName: groupName,
              groupOwner: groupOwner,
              description: description,
              rank: rank,
              members: [members],
              rating: 0,
              groupGameImage: gameImage,
            })
            .then(() => {
              console.log('Grupo criado!');
              Alert.alert(
                'Grupo criado!',
                'Seu grupo foi criado com sucesso.',
              );
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
