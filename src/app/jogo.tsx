import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaJogo() {
  const [pontuacao, setPontuacao] = useState(0);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  function pausarJogo() {
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  function voltarParaHome() {
    setModalVisivel(false);
    router.replace('/(tabs)/home');
  }

  if (!fontsLoaded) {
    return (
      <LinearGradient
        colors={['#0B0F19', '#1E0B36']}
        style={styles.container}
      />
    );
  }

  return (
    <LinearGradient
      colors={['#0B0F19', '#1E0B36']}
      style={styles.container}
    >

      <View style={styles.header}>
        <View style={styles.placar}>
          <Text style={styles.tituloPlacar}>PONTOS</Text>
          <Text style={styles.pontosPlacar}>
            {String(pontuacao).padStart(6, '0')}
          </Text>
        </View>

        <TouchableOpacity style={styles.botaoPause} onPress={pausarJogo}>
          <Text style={styles.textoBotaoPause}>PAUSE</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabuleiro}>
        <View style={styles.gridFundo}>
          {Array.from({ length: 20 }).map((_, r) => (
            <View key={r} style={styles.linhaGrid}>
              {Array.from({ length: 10 }).map((_, c) => (
                <View key={c} style={styles.celulaGrid} />
              ))}
            </View>
          ))}
        </View>

        <View style={styles.caixaProxima}>
          <Text style={styles.textoProxima}>Proxima</Text>
          <View style={styles.previewPeca}>
            <View style={styles.linhaPreview}>
              <View style={styles.quadradinhoRosa} />
              <View style={styles.quadradinhoVazio} />
            </View>
            <View style={styles.linhaPreview}>
              <View style={styles.quadradinhoRosa} />
              <View style={styles.quadradinhoVazio} />
            </View>
            <View style={styles.linhaPreview}>
              <View style={styles.quadradinhoRosa} />
              <View style={styles.quadradinhoRosa} />
            </View>
          </View>
        </View>

      </View>

      <View style={styles.areaControles}>
        <Text style={styles.textoControles}>
          Deslize para mover - Toque para girar
        </Text>
      </View>

      <Modal
        transparent={true}
        visible={modalVisivel}
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.containerModal}>
          <View style={styles.cardModal}>
            <Text style={styles.tituloModal}>JOGO PAUSADO</Text>

            <TouchableOpacity style={styles.botaoModalContinuar} onPress={fecharModal}>
              <Text style={styles.textoBotaoContinuar}>CONTINUAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoModalSair} onPress={voltarParaHome}>
              <Text style={styles.textoBotaoSair}>SAIR DO JOGO</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  placar: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#00E5FF',
  },
  tituloPlacar: {
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    marginBottom: 4,
    textAlign: 'center',
  },
  pontosPlacar: {
    color: '#FFFF00',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 16,
    letterSpacing: 2,
  },
  botaoPause: {
    backgroundColor: '#FF007F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  textoBotaoPause: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    fontWeight: 'bold',
  },

  tabuleiro: {
    flex: 1,
    backgroundColor: '#090D16',
    borderWidth: 4,
    borderColor: '#00E5FF',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },

  gridFundo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  linhaGrid: {
    flex: 1,
    flexDirection: 'row',
  },
  celulaGrid: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 229, 255, 0.08)',
  },

  caixaProxima: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(9, 13, 22, 0.85)',
    borderWidth: 2,
    borderColor: '#FF007F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  textoProxima: {
    color: '#FF007F',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
    marginBottom: 8,
  },
  previewPeca: {
    alignItems: 'flex-start',
  },
  linhaPreview: {
    flexDirection: 'row',
  },
  quadradinhoRosa: {
    width: 16,
    height: 16,
    backgroundColor: '#FF007F',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 2,
  },
  quadradinhoVazio: {
    width: 16,
    height: 16,
    backgroundColor: 'transparent',
  },

  areaControles: {
    height: 100,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6E44FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 11, 54, 0.6)',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  textoControles: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    textAlign: 'center',
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardModal: {
    width: '85%',
    backgroundColor: '#1E0B36',
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#00E5FF',
    padding: 24,
    alignItems: 'center',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  tituloModal: {
    color: '#FFFF00',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 22,
  },
  botaoModalContinuar: {
    width: '100%',
    backgroundColor: '#00E5FF',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoContinuar: {
    color: '#090D16',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoModalSair: {
    width: '100%',
    backgroundColor: '#FF007F',
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoSair: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
