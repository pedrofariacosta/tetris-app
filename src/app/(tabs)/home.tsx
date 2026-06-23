import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaHome() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const scale = useRef(new Animated.Value(1)).current;

  const numPieces = 6;
  const pieces = useRef(
    Array.from({ length: numPieces }).map((_, i) => ({
      id: i,
      imageIndex: i % 3,
      translateX: new Animated.Value(-500),
      translateY: new Animated.Value(-500),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.08,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const { width, height } = Dimensions.get('window');

    const animatePiece = (piece: any) => {
      const dir = Math.floor(Math.random() * 4);
      let startX = 0, startY = 0, endX = 0, endY = 0;
      const offscreen = 150;

      if (dir === 0) {
        startX = Math.random() * width;
        startY = -offscreen;
        endY = height + offscreen;
        const sinal = Math.random() > 0.5 ? 1 : -1;
        endX = startX + sinal * (width * 0.4 + Math.random() * (width * 0.6));
      } else if (dir === 1) {
        startX = Math.random() * width;
        startY = height + offscreen;
        endY = -offscreen;
        const sinal = Math.random() > 0.5 ? 1 : -1;
        endX = startX + sinal * (width * 0.4 + Math.random() * (width * 0.6));
      } else if (dir === 2) {
        startX = -offscreen;
        startY = Math.random() * height;
        endX = width + offscreen;
        const sinal = Math.random() > 0.5 ? 1 : -1;
        endY = startY + sinal * (height * 0.3 + Math.random() * (height * 0.5));
      } else {
        startX = width + offscreen;
        startY = Math.random() * height;
        endX = -offscreen;
        const sinal = Math.random() > 0.5 ? 1 : -1;
        endY = startY + sinal * (height * 0.3 + Math.random() * (height * 0.5));
      }

      piece.translateX.setValue(startX);
      piece.translateY.setValue(startY);
      piece.rotate.setValue(0);

      const duration = 12000 + Math.random() * 10000;

      Animated.parallel([
        Animated.timing(piece.translateX, {
          toValue: endX,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(piece.translateY, {
          toValue: endY,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(piece.rotate, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ]).start(({ finished }) => {
        if (finished) {
          setTimeout(() => animatePiece(piece), 2000 + Math.random() * 2000);
        }
      });
    };

    pieces.forEach((p, index) => {
      setTimeout(() => animatePiece(p), index * 3000);
    });

  }, [scale, pieces]);

  function irParaJogo() {
    console.log('Indo para a tela do jogo');
    router.push('/jogo');
  }

  function irParaRanking() {
    console.log('Indo para o ranking');
    router.push('/(tabs)/ranking');
  }

  function abrirConfiguracoes() {
    console.log('Abrir configurações');
    router.push('/configuracoes' as any);
  }

  function abrirSobre() {
    console.log('Abrir sobre');
    router.push('/(tabs)/sobre');
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

      {pieces.map((p) => {
        const sources = [
          require('../../../assets/peca-verde.png'),
          require('../../../assets/peca-rosa.png'),
          require('../../../assets/peca-laranja.png'),
        ];
        const baseStyles = [styles.pecaVerde, styles.pecaRosa, styles.pecaLaranja];

        const spin = p.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        });

        return (
          <Animated.Image
            key={p.id}
            source={sources[p.imageIndex]}
            style={[
              styles.pecaFundo,
              baseStyles[p.imageIndex],
              {
                top: 0,
                left: 0,
                right: undefined,
                bottom: undefined,
                transform: [
                  { translateX: p.translateX },
                  { translateY: p.translateY },
                  { rotate: spin }
                ]
              }
            ]}
          />
        );
      })}

      <View style={styles.header}>
        <Text style={styles.tituloHeader}>Tetris Arcade</Text>
        <View style={styles.perfilPlaceholder} />
      </View>

      <View style={styles.cardBoasVindas}>
        <Text style={styles.textoBoasVindas}>OLÁ, [NOME]!</Text>
        <Text style={styles.textoBoasVindasSub}>PRONTO PARA BATER SEU RECORDE?</Text>
      </View>

      <View style={styles.areaBotoes}>
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity style={styles.botaoJogar} onPress={irParaJogo}>
            <Text style={styles.textoBotaoJogar}>JOGAR!</Text>
          </TouchableOpacity>
        </Animated.View>

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
    alignItems: 'center',
    paddingBottom: 110,
  },

  pecaFundo: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
    opacity: 0.25,
    zIndex: -1,
  },
  pecaVerde: {
    left: 20,
    top: 200,
    transform: [{ rotate: '45deg' }],
  },
  pecaRosa: {
    right: 20,
    bottom: 280,
    transform: [{ rotate: '-20deg' }],
  },
  pecaLaranja: {
    left: 40,
    bottom: 170,
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
    fontSize: 20,
    fontFamily: 'PressStart2P_400Regular',
    textShadowColor: '#00E5FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  perfilPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0D091A',
    borderWidth: 2,
    borderColor: '#00E5FF',
    position: 'absolute',
    right: 20,
    top: 50,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  cardBoasVindas: {
    width: '85%',
    backgroundColor: 'rgba(9, 6, 20, 0.85)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 50,
    borderWidth: 2,
    borderColor: '#6E44FF',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  textoBoasVindas: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    marginBottom: 8,
  },
  textoBoasVindasSub: {
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
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
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 10,
    shadowColor: '#FFA500',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  textoBotaoJogar: {
    color: '#090D16',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 14,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    width: '65%',
    paddingVertical: 12,
    backgroundColor: 'rgba(9, 6, 20, 0.65)',
    borderWidth: 2,
    borderColor: '#6E44FF',
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  textoBotaoSecundario: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
  }
});
