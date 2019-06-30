import React from 'react';
import { Platform, Image, Linking, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import IntentLauncher from 'react-native-intent-launcher';

export default class HomeScreen extends React.Component {
  // Abre o app se ja esta instalado
  // Se nao, abre a Google Play Store na pagina do app
  openLibraryApp = () => {
    // Lib para abrir o app pelo package name
    // https://github.com/poberwong/react-native-intent-launcher
    const packageName = 'com.nintersoft.bibliotecaufabc';
    IntentLauncher.isAppInstalled(packageName)
      .then(() => {
        // Abrir o app
        IntentLauncher.startAppByPackageName(packageName)
          .then(() => {})
          .catch((error) => console.log('startAppByPackageName: could not open', error));
      })
      .catch(() => {
        // Abrir a Google Play Store
        const playUrl = 'https://play.google.com/store/apps/details?id=com.nintersoft.bibliotecaufabc';
        Linking.canOpenURL(playUrl)
          .then((supported) => {
            if (supported) {
              return Linking.openURL(playUrl);
            }
          })
          .catch((err) => console.log('An error occurred', err));
      });
  };

  render() {
    return (
      <SafeAreaView>
        {Platform.OS === 'android' && (
          <View style={styles.card}>
            <Text style={{ fontSize: 22, fontWeight: '600', marginTop: 12, color: '#000' }}>UFABC Library</Text>
            <Image
              style={{ flex: 1, margin: 8 }}
              resizeMode="contain"
              source={require('../assets/imgs/ufabc_library.png')}
            />
            <Text style={{ fontSize: 16, fontWeight: '200', paddingTop: 8, color: '#000' }}>
              Procure, reserve e renove seus livros
            </Text>
            <Text style={{ fontSize: 12, fontWeight: '200', padding: 8 }}>Desenvolvido por Mauro Mascarenhas</Text>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', padding: 12, marginHorizontal: 16 }}
              onPress={this.openLibraryApp}
            >
              <Text style={{ color: '#005422', fontWeight: 'bold' }}>ABRIR</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    height: 240,
    margin: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
});
