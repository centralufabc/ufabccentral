import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            backgroundColor: '#005422',
            height: 150,
            margin: 8,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Hello World!</Text>
        </View>
      </SafeAreaView>
    );
  }
}
