import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotFoundScreen() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  function voltarInicio() {
    router.replace('/(tabs)/home');
  }

  if (!fontsLoaded) {
    return <LinearGradient colors={['#0B0F19', '#1E0B36']} style={styles.container} />;
  }

  return (
    <LinearGradient
      colors={['#0B0F19', '#1E0B36']}
      style={styles.container}
    >
      <Text style={styles.ops}>OPS!</Text>
      <Text style={styles.textoErro}>Página não encontrada</Text>

      <TouchableOpacity style={styles.botaoVoltar} onPress={voltarInicio}>
        <Text style={styles.textoBotao}>Voltar para o inicio</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  ops: {
    color: '#FF007F',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 45,
    marginBottom: 20,
    textShadowColor: '#FF007F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  textoErro: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    marginBottom: 60,
    textAlign: 'center',
  },
  botaoVoltar: {
    backgroundColor: '#00E5FF',
    paddingVertical: 18,
    paddingHorizontal: 35,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  textoBotao: {
    color: '#090D16',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    textAlign: 'center',
  }
});
