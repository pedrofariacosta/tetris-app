import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

export default function TelaSobre() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <LinearGradient colors={['#0B0F19', '#1E0B36']} style={styles.container} />
    );
  }

  return (
    <LinearGradient
      colors={['#0B0F19', '#1E0B36']}
      style={styles.container}
    >
      <Text style={styles.tituloPrincipal}>Sobre o jogo</Text>

      <ScrollView
        style={styles.cardConteudo}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>O PROJETO</Text>
          <Text style={styles.textoComum}>
            Este aplicativo foi desenvolvido com foco em acessibilidade e usabilidade, idealizado com o propósito de auxiliar na estimulação cognitiva de forma lúdica e intuitiva.
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>REGRAS</Text>
          <Text style={styles.textoComum}>
            1. Alinhe os blocos para pontuar.
          </Text>
          <Text style={styles.textoComum}>
            2. O jogo termina se as peças tocarem o topo da tela.
          </Text>
        </View>

        <View style={styles.secaoDestaque}>
          <Text style={styles.textoDestaque}>
            Deslize para mover
          </Text>
          <Text style={styles.textoDestaque}>
            Toque para girar
          </Text>
        </View>

        <View style={styles.rodapeSecao}>
          <Text style={styles.textoRodape}>Versão: 1.0.0</Text>
          <Text style={styles.textoRodape}>Créditos: Pedro</Text>
        </View>

      </ScrollView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  tituloPrincipal: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    marginBottom: 25,
  },
  cardConteudo: {
    width: '85%',
    flex: 1,
    backgroundColor: 'rgba(9, 6, 20, 0.85)',
    borderRadius: 15,
    marginBottom: 100,
    padding: 20,
    borderWidth: 2,
    borderColor: '#6E44FF',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  secao: {
    marginBottom: 25,
  },
  tituloSecao: {
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E153B',
    paddingBottom: 5,
  },
  textoComum: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  secaoDestaque: {
    backgroundColor: 'rgba(255, 0, 127, 0.1)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF007F',
    alignItems: 'center',
    marginBottom: 30,
  },
  textoDestaque: {
    color: '#FF007F',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    lineHeight: 18,
    textAlign: 'center',
  },
  rodapeSecao: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#1E153B',
  },
  textoRodape: {
    color: '#777777',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    marginBottom: 10,
  }
});
