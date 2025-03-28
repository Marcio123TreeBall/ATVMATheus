import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Image} from 'react-native';
import api from './src/services/api';

export default function App () {
  const [loginGithub, setLoginGithub] = useState('');
  const [infoDev, setInfoDev] = useState();
  const [imagemPerfil, setImagemPerfil] = useState('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png');

  const consultarDev = async (loginGithub) => {
    const response = await api.get(loginGithub);
    setInfoDev(response.data);
    setImagemPerfil(response.data.avatar_url);
  };

  return (
    <View style={styles.container}>
    <Image source={{ uri: imagemPerfil }} style={styles.foto} />  
      
      <TextInput
        style={styles.login}
        value={loginGithub}
        onChangeText={setLoginGithub}
        underlineColorAndroid="transparent"
      />

      <Button title="Consultar Dev" onPress={() => consultarDev(loginGithub)}  />

      {infoDev && (
        <>
          <Text style={styles.info}>Id: {infoDev.id}</Text>
          <Text style={styles.info}>Nome: { infoDev.login}</Text>
          <Text style={styles.info}>Repositórios: {infoDev.public_repos}</Text>
          <Text style={styles.info}>Criado em: {infoDev.created_at}</Text>
          <Text style={styles.info}>Seguidores: {infoDev.followers}</Text>
          <Text style={styles.info}>Seguindo: {infoDev.following}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#89a4a9',
  },
  info: {
    marginTop: 20, 
    fontSize: 28,  
    fontWeight: '600', 
    textAlign: 'center',
    alignItems: 'left',
    color: '#333', 
    backgroundColor: '#2f597e',
  },
  login: {
    width: '100%',
    maxWidth: 320, 
    height: 45,  
    borderColor: 'grey', 
    borderWidth: 1,
    paddingHorizontal: 15, 
    borderRadius: 10,  
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#2f597e', 
  },
  foto: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'black', 
    borderRadius: 100,  
    overflow: 'hidden', 
    marginBottom: 20, 
  },
});
