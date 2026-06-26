import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { router } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  async function entrarNoJogo() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    setLoading(true);
    try {
      // faz a requisição na API do firebase pra logar o usuario
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // se nao verificou o email ainda, desloga e barra o acesso
      if (!user.emailVerified) {
        Alert.alert(
          'Email não verificado',
          'Por favor, verifique seu email antes de acessar o jogo. Se não encontrar, verifique a caixa de spam.'
        );
        auth.signOut();
        setLoading(false);
        return;
      }

      router.replace('/(tabs)/home'); 
    } catch (error: any) {
      console.error('Erro ao logar:', error);
      let mensagem = 'Erro ao fazer login.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        mensagem = 'Email ou senha incorretos.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'O email fornecido é inválido.';
      }
      Alert.alert('Erro', mensagem);
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={[styles.botao, loading && { opacity: 0.7 }]}
        onPress={entrarNoJogo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoBotao}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.push('/cadastro')}>
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
