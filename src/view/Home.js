import React from 'react';
import { Image, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
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
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '600', marginTop: 12 }}>UFABC Library</Text>
          <Image
            style={{ flex: 1, margin: 8 }}
            resizeMode="contain"
            source={require('../assets/imgs/ufabc_library.png')}
          />
          <Text style={{ fontSize: 16, fontWeight: '200', paddingTop: 8 }}>Procure, reserve e renove seus livros</Text>
          <Text style={{ fontSize: 12, fontWeight: '200', padding: 8 }}>Desenvolvido por Mauro Mascarenhas</Text>
          <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 12, marginHorizontal: 16 }}>
            <Text style={{ color: '#005422', fontWeight: 'bold' }}>ABRIR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
