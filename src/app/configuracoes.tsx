import { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@vibration_active';

export default function TelaConfiguracoes() {
  const [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarConfiguracao() {
      try {
        const valorSalvo = await AsyncStorage.getItem(STORAGE_KEY);
        if (valorSalvo !== null) {
          setVibracaoAtiva(valorSalvo === 'true');
        } else {
          setVibracaoAtiva(true);
        }
      } catch (error) {
        console.error('Erro ao carregar a configuração de vibração:', error);
      } finally {
        setLoading(false);
      }
    }
    carregarConfiguracao();
  }, []);

  async function alterarVibracao(novoValor: boolean) {
    setVibracaoAtiva(novoValor);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(novoValor));
    } catch (error) {
      console.error('Erro ao salvar a configuração de vibração:', error);
    }
  }

  if (!fontsLoaded || loading) {
    return (
      <LinearGradient
        colors={['#0B0F19', '#1E0B36']}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#00E5FF" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#0B0F19', '#1E0B36']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.tituloHeader}>AJUSTES</Text>
      </View>

      <View style={styles.cardConfiguracoes}>
        <View style={styles.configItem}>
          <Text style={styles.textoConfig}>Vibração (Acessibilidade)</Text>
          <Switch
            trackColor={{ false: '#1A1A24', true: 'rgba(110, 68, 255, 0.5)' }}
            thumbColor={vibracaoAtiva ? '#39FF14' : '#888888'}
            ios_backgroundColor="#1A1A24"
            onValueChange={alterarVibracao}
            value={vibracaoAtiva}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotaoVoltar}>VOLTAR</Text>
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
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'PressStart2P_400Regular',
    textShadowColor: '#FF007F',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  cardConfiguracoes: {
    width: '90%',
    backgroundColor: 'rgba(9, 6, 20, 0.85)',
    paddingVertical: 25,
    paddingHorizontal: 20,
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
  configItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textoConfig: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 8,
    lineHeight: 14,
    flex: 1,
    marginRight: 10,
  },
  botaoVoltar: {
    width: '55%',
    paddingVertical: 12,
    backgroundColor: 'rgba(9, 6, 20, 0.65)',
    borderWidth: 2,
    borderColor: '#FF007F',
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF007F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  textoBotaoVoltar: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 10,
    fontWeight: 'bold',
  }
});
