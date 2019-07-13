import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

export default class MenuScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Botoes temporarios ate o design da tela ser disponibilizado */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => { this.props.navigation.navigate('Informacoes'); }}
          >
            <Text style={styles.buttonTextStyle}>Outras Informações</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: { padding: 8, backgroundColor: '#00D1B2', width: '50%', alignItems: 'center', borderRadius: 4 },
  buttonTextStyle: { fontWeight: '600', color: '#fff' },
});
