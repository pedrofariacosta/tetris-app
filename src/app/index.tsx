import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  function entrarNoJogo() {
    console.log('Tentando logar com o email:', email);
  }

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/game-console.png')}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Tetris Arcade</Text>

      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/mail.png')}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/padlock.png')}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Senha"
          placeholderTextColor="#FFFFFF"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={entrarNoJogo}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }}>
        <Text style={styles.textoCadastroContainer}>
          <Text style={styles.textoCadastroComum}>Não tem uma conta? </Text>
          <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A24',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 170,
    height: 170,
    marginBottom: 10,
  },
  titulo: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 22,
    marginBottom: 40,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#202024',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#000000',
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  inputField: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 16,
  },
  botao: {
    width: '30%',
    height: 50,
    backgroundColor: '#8B56FC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoCadastroContainer: {
    fontSize: 14,
  },
  textoCadastroComum: {
    color: '#FFFFFF',
  },
  textoCadastroDestaque: {
    color: '#8B56FC',
  }
});
