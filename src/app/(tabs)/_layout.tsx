import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarSafeAreaInsets: { bottom: 0, top: 0, left: 0, right: 0 },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarIconStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 0,
          marginBottom: 0,
        }
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../assets/home.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#8B56FC' : '#FFFFFF' }
                ]}
              />
              <View style={[styles.activeDot, { opacity: focused ? 1 : 0 }]} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="ranking"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../assets/ranking.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#8B56FC' : '#FFFFFF' }
                ]}
              />
              <View style={[styles.activeDot, { opacity: focused ? 1 : 0 }]} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image
                source={require('../../../assets/about.png')}
                style={[
                  styles.icon,
                  { tintColor: focused ? '#8B56FC' : '#FFFFFF' }
                ]}
              />
              <View style={[styles.activeDot, { opacity: focused ? 1 : 0 }]} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 25,
    height: 70,
    backgroundColor: 'rgba(26, 26, 36, 0.95)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#2D2D3F',
    borderTopWidth: 1,
    borderTopColor: '#2D2D3F',
    paddingBottom: 0,
    shadowColor: '#8B56FC',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B56FC',
    marginTop: 4,
    shadowColor: '#8B56FC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
  }
});
