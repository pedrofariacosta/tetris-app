import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';

// dados temporários
const DADOS_MOCK = [
  { id: '1', rank: 1, nome: 'João', pontos: 155 },
  { id: '2', rank: 2, nome: 'Lucas', pontos: 130 },
  { id: '3', rank: 3, nome: 'Ana', pontos: 112 },
  { id: '4', rank: 4, nome: 'Julia', pontos: 102 },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return '#FFD700';
    case 2: return '#E0E0E0';
    case 3: return '#CD7F32';
    default: return '#FFFFFF';
  }
};

export default function TelaRanking() {
  const [busca, setBusca] = useState('');

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const jogadoresFiltrados = DADOS_MOCK.filter(jogador =>
    jogador.nome.toLowerCase().includes(busca.toLowerCase())
  );

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
      <Text style={styles.titulo}>Ranking</Text>

      <View style={styles.cardPrincipal}>

        <View style={styles.areaBuscaContainer}>
          <View style={styles.areaBusca}>
            <Image
              source={require('../../../assets/loupe.png')}
              style={styles.iconeLupa}
            />
            <TextInput
              style={styles.inputBusca}
              placeholder="BUSCAR JOGADOR..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              value={busca}
              onChangeText={setBusca}
            />
          </View>
        </View>

        <View style={styles.headerTabela}>
          <Text style={styles.textoHeaderTabelaColRank}>POS</Text>
          <Text style={styles.textoHeaderTabelaColNome}>JOGADOR</Text>
          <Text style={styles.textoHeaderTabelaColPontos}>PONTOS</Text>
        </View>

        <FlatList
          data={jogadoresFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.itemLista}>
              <View style={styles.colRank}>
                <Text style={[styles.textoItem, { color: getRankColor(item.rank) }]}>
                  {item.rank === 1 ? '1°' : item.rank === 2 ? '2°' : item.rank === 3 ? '3°' : `${item.rank}°`}
                </Text>
              </View>
              <View style={styles.colNome}>
                <Text style={styles.textoItemNome}>{item.nome.toUpperCase()}</Text>
              </View>
              <View style={styles.colPontos}>
                <Text style={styles.textoItemPontos}>
                  {String(item.pontos).padStart(6, '0')}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>NENHUM JOGADOR ENCONTRADO</Text>
          }
        />

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },
  titulo: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 18,
    marginBottom: 20,
  },
  cardPrincipal: {
    width: '85%',
    flex: 1,
    backgroundColor: 'rgba(9, 6, 20, 0.85)',
    borderRadius: 15,
    marginBottom: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#6E44FF',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  areaBuscaContainer: {
    padding: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1E153B',
  },
  areaBusca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#332766',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  iconeLupa: {
    width: 18,
    height: 18,
    tintColor: 'rgba(255, 255, 255, 0.6)',
    marginRight: 10,
  },
  inputBusca: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
  },
  headerTabela: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: '#1E153B',
  },
  textoHeaderTabelaColRank: {
    flex: 1.5,
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
  },
  textoHeaderTabelaColNome: {
    flex: 3,
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
  },
  textoHeaderTabelaColPontos: {
    flex: 2,
    textAlign: 'right',
    color: '#00E5FF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
  },
  itemLista: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(26, 24, 41, 0.4)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 21, 59, 0.5)',
  },
  colRank: {
    flex: 1.5,
    justifyContent: 'center',
  },
  colNome: {
    flex: 3,
    justifyContent: 'center',
  },
  colPontos: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textoItem: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
  },
  textoItemNome: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
  },
  textoItemPontos: {
    color: '#FFFF00',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    textAlign: 'right',
  },
  textoVazio: {
    color: '#777777',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 30,
  }
});
