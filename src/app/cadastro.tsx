import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { router } from 'expo-router';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AVATARES = ['bee', 'chick', 'crab', 'dog', 'frog', 'koala'];

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [avatarSelecionado, setAvatarSelecionado] = useState('dog');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const getAvatarSource = (avatarName: string) => {
    switch (avatarName) {
      case 'bee': return require('../../assets/bee.png');
      case 'chick': return require('../../assets/chick.png');
      case 'crab': return require('../../assets/crab.png');
      case 'frog': return require('../../assets/frog.png');
      case 'koala': return require('../../assets/koala.png');
      case 'dog':
      default: return require('../../assets/dog.png');
    }
  };

  async function realizarCadastro() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o seu nome.');
      return;
    }

    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem('@nome_usuario', nome.trim());
      await AsyncStorage.setItem('@avatar_usuario', avatarSelecionado);

      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await sendEmailVerification(user);

      Alert.alert(
        'Cadastro Realizado!',
        'Enviamos um link de verificação para o seu email. Por favor, verifique sua caixa de entrada (ou spam) antes de fazer o login.',
        [{ text: 'OK', onPress: () => router.replace('/') }]
      );

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      let mensagem = 'Erro ao fazer o cadastro.';
      if (error.code === 'auth/email-already-in-use') {
        mensagem = 'Este email já está sendo usado.';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'O email fornecido é inválido.';
      } else if (error.code === 'auth/weak-password') {
        mensagem = 'A senha é muito fraca.';
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

      <Text style={styles.titulo}>Criar Conta</Text>

      <Text style={styles.subtitulo}>Escolha seu Avatar</Text>
      <View style={styles.avatarList}>
        {AVATARES.map((avatar) => (
          <TouchableOpacity 
            key={avatar} 
            onPress={() => setAvatarSelecionado(avatar)}
            style={[
              styles.avatarContainer,
              avatarSelecionado === avatar && styles.avatarSelecionado
            ]}
          >
            <Image 
              source={getAvatarSource(avatar)} 
              style={styles.avatarImage} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Seu Nome"
          placeholderTextColor="#FFFFFF"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />
      </View>

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

      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/padlock.png')}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Confirmar Senha"
          placeholderTextColor="#FFFFFF"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={[styles.botao, loading && { opacity: 0.7 }]}
        onPress={realizarCadastro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={() => router.back()}>
        <Text style={styles.textoVoltarContainer}>
          <Text style={styles.textoVoltarComum}>Já tem uma conta? </Text>
          <Text style={styles.textoVoltarDestaque}>Faça Login</Text>
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
  titulo: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 20,
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subtitulo: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    marginBottom: 15,
    color: '#00E5FF',
    textAlign: 'center',
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  avatarContainer: {
    margin: 5,
    padding: 5,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSelecionado: {
    borderColor: '#00E5FF',
    backgroundColor: 'rgba(0, 229, 255, 0.1)',
  },
  avatarImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
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
    width: '50%',
    height: 50,
    backgroundColor: '#8B56FC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textoVoltarContainer: {
    fontSize: 14,
  },
  textoVoltarComum: {
    color: '#FFFFFF',
  },
  textoVoltarDestaque: {
    color: '#8B56FC',
  }
});
