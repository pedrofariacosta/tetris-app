import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Keyboard, Alert } from 'react-native';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

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
  const [jogadores, setJogadores] = useState<{ id: string; rank: number; nome: string; pontos: number }[]>([]);
  const [modalAcaoVisivel, setModalAcaoVisivel] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState<{ id: string; rank: number; nome: string; pontos: number } | null>(null);
  const [novoNomeEditado, setNovoNomeEditado] = useState('');

  const atualizarRegistro = async () => {
    if (!jogadorSelecionado || !novoNomeEditado.trim()) return;
    Keyboard.dismiss();
    const selected = jogadorSelecionado;
    const newName = novoNomeEditado.trim();

    setModalAcaoVisivel(false);
    setJogadorSelecionado(null);

    try {
      const docRef = doc(db, 'ranking', selected.id);
      await updateDoc(docRef, { nome: newName });
    } catch (error) {
      console.error("Erro ao atualizar registro no Firestore:", error);
      Alert.alert("Erro", "Não foi possível atualizar o nome. Verifique sua conexão ou permissões.");
    }
  };

  const deletarRegistro = async () => {
    if (!jogadorSelecionado) return;
    Keyboard.dismiss();
    const selected = jogadorSelecionado;

    setModalAcaoVisivel(false);
    setJogadorSelecionado(null);

    try {
      const docRef = doc(db, 'ranking', selected.id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao deletar registro no Firestore:", error);
      Alert.alert("Erro", "Não foi possível excluir o recorde. Verifique sua conexão ou permissões.");
    }
  };

  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  useEffect(() => {
    const q = query(collection(db, 'ranking'), orderBy('pontuacao', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaJogadores = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        rank: index + 1,
        nome: doc.data().nome || 'Anônimo',
        pontos: doc.data().pontuacao || 0,
      }));
      setJogadores(listaJogadores);
    }, (error) => {
      console.error("Erro ao carregar ranking do Firestore: ", error);
    });

    return () => unsubscribe();
  }, []);

  const jogadoresFiltrados = jogadores.filter(jogador =>
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

        <Text style={styles.textoInstrucao}>
          Toque e segure em um registro para editar ou excluir
        </Text>

        <FlatList
          data={jogadoresFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                setJogadorSelecionado(item);
                setNovoNomeEditado(item.nome);
                setModalAcaoVisivel(true);
              }}
              activeOpacity={0.7}
            >
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
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.textoVazio}>NENHUM JOGADOR ENCONTRADO</Text>
          }
        />

      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAcaoVisivel}
        onRequestClose={() => {
          Keyboard.dismiss();
          setModalAcaoVisivel(false);
          setJogadorSelecionado(null);
        }}
      >
        <View style={styles.containerModal}>
          <View style={styles.cardModal}>
            <Text style={styles.tituloModal}>EDITAR RECORDE</Text>

            {jogadorSelecionado && (
              <Text style={styles.textoSubtituloModal}>
                PONTOS: {String(jogadorSelecionado.pontos).padStart(6, '0')}
              </Text>
            )}

            <TextInput
              style={styles.inputModal}
              value={novoNomeEditado}
              onChangeText={setNovoNomeEditado}
              maxLength={15}
              placeholder="NOME DO JOGADOR"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              autoCapitalize="characters"
            />

            <TouchableOpacity style={styles.botaoAtualizar} onPress={atualizarRegistro}>
              <Text style={styles.textoBotaoAtualizar}>ATUALIZAR NOME</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoExcluir} onPress={deletarRegistro}>
              <Text style={styles.textoBotaoExcluir}>EXCLUIR RECORDE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => {
                Keyboard.dismiss();
                setModalAcaoVisivel(false);
                setJogadorSelecionado(null);
              }}
            >
              <Text style={styles.textoBotaoCancelar}>CONCLUÍDO</Text>
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
  },
  textoInstrucao: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 6,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 10,
  },
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 18,
  },
  textoSubtituloModal: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputModal: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6E44FF',
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  botaoAtualizar: {
    width: '100%',
    backgroundColor: '#00E5FF',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoAtualizar: {
    color: '#090D16',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    fontWeight: 'bold',
  },
  botaoExcluir: {
    width: '100%',
    backgroundColor: '#FF007F',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoExcluir: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
    fontWeight: 'bold',
  },
  botaoCancelar: {
    width: '100%',
    backgroundColor: 'rgba(9, 6, 20, 0.65)',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#6E44FF',
    alignItems: 'center',
    shadowColor: '#6E44FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotaoCancelar: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 9,
  }
});
