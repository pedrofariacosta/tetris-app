import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function SobreLayout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
