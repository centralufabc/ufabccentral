import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, AsyncStorage } from 'react-native';
import commonStyles from '../styles/commonStyles';
import ElevatedView from 'react-native-elevated-view'
import ChangeItem from './../components/ChangeItem';

import { urlServer, dateFormated } from '../common';

import axios from 'axios';

import {
  Title,
} from '@shoutem/ui';

export default class CardRU extends Component {
  downloadMenus = async () => {
    try {
      const res = await axios.get(`${urlServer}/ru/cardapio/${dateFormated()}`);
      AsyncStorage.setItem('cardapios', JSON.stringify(res.data.Cardapios));
    } catch (err) {
      Alert.alert('Erro', err);
    }
  }

  componentDidMount () {
    this.downloadMenus();
  }


  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Title style={styles.title}>Restaurante</Title>
          <ChangeItem text={'Segunda'} style={{ marginBottom: 15 }} />
        </View>
        <Text style={styles.title}>Almoço</Text>
        <Text style={styles.text}>Strogonoff de frango</Text>
        <Text style={styles.title}>Jantar</Text>
        <Text style={styles.text}>Bife Acebolado</Text>
        <Text style={styles.title}>Guarnição</Text>
        <Text style={styles.text}>Batata corada</Text>
        <Text style={styles.title}>Saladas</Text>
        <Text style={styles.text}>Rabanete, Catalonha, Carpaccio de Abobrinha</Text>
        <Text style={styles.title}>Sobremesas</Text>
        <Text style={styles.text}>Gelatina de Morango, Laranja</Text>
      </ElevatedView>
    );
  }
}

const styles = StyleSheet.create({
  stayElevated: {
    height: '90%',
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 10,
    marginRight: 10,
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.principal,
  },
  text: {
    fontFamily: commonStyles.fontFamily,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
  },
});