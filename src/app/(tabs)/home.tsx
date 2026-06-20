import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaHome() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  function irParaJogo() {
    console.log('Indo para a tela do jogo');
    router.push('/jogo');
  }

  function irParaRanking() {
    console.log('Indo para o ranking');
  }

  function abrirConfiguracoes() {
    console.log('Abrir configurações');
  }

  function abrirSobre() {
    console.log('Abrir sobre');
  }

  if (!fontsLoaded) {
    return (
      <LinearGradient
        colors={['#0F172A', '#2E1065']}
        style={styles.container}
      />
    );
  }

  return (
    <LinearGradient
      colors={['#0F172A', '#2E1065']}
      style={styles.container}
    >

      <Image
        source={require('../../../assets/peca-verde.png')}
        style={[styles.pecaFundo, styles.pecaVerde]}
      />
      <Image
        source={require('../../../assets/peca-rosa.png')}
        style={[styles.pecaFundo, styles.pecaRosa]}
      />
      <Image
        source={require('../../../assets/peca-laranja.png')}
        style={[styles.pecaFundo, styles.pecaLaranja]}
      />

      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Tetris Arcade</Text>
        <View style={styles.perfilPlaceholder} />
      </View>

      <View style={styles.cardBoasVindas}>
        <Text style={styles.textoBoasVindas}>Olá, [Nome]!</Text>
        <Text style={styles.textoBoasVindas}>Pronto para bater seu recorde?</Text>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoJogar} onPress={irParaJogo}>
          <Text style={styles.textoBotaoJogar}>JOGAR!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={irParaRanking}>
          <Text style={styles.textoBotaoSecundario}>Ranking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={abrirConfiguracoes}>
          <Text style={styles.textoBotaoSecundario}>Configurações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={abrirSobre}>
          <Text style={styles.textoBotaoSecundario}>Sobre</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C113A',
    alignItems: 'center',
    paddingBottom: 110,
  },

  pecaFundo: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
    opacity: 0.5,
    zIndex: -1,
  },
  pecaVerde: {
    left: 30,
    top: 250,
    transform: [{ rotate: '45deg' }],
  },
  pecaRosa: {
    right: 20,
    bottom: 230,
    transform: [{ rotate: '-20deg' }],
  },
  pecaLaranja: {
    left: 40,
    bottom: 100,
    transform: [{ rotate: '70deg' }],
  },

  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PressStart2P_400Regular',
  },
  perfilPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555555',
    position: 'absolute',
    right: 20,
    top: 50,
  },

  cardBoasVindas: {
    width: '85%',
    backgroundColor: '#2A204C',
    padding: 20,
    borderRadius: 12,
    marginBottom: 60,
  },
  textoBoasVindas: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },

  areaBotoes: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  botaoJogar: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },
  textoBotaoJogar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    width: '60%',
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#6E44FF',
    borderRadius: 25,
    alignItems: 'center',
  },
  textoBotaoSecundario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
