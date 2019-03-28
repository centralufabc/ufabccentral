import React, { Component } from 'react';
import { StyleSheet, View, NetInfo, Alert, AsyncStorage } from 'react-native';
import commonStyles from '../styles/commonStyles';
import ElevatedView from 'react-native-elevated-view'
import ChangeItem from './../components/ChangeItem';

import { urlServer, dateFormated, dynamicSort, dayOfTheWeek, nameOfDayOfTheWeek } from '../common';

import axios from 'axios';

import {
  Title,
  Subtitle,
} from '@shoutem/ui';

export default class CardRU extends Component {
  state = {
    menus: [],
    index: 0,
  }

  downloadMenus = async () => {
    try {
      const res = await axios.get(`${urlServer}/ru/cardapio/${dateFormated()}`);
      AsyncStorage.setItem('cardapios', JSON.stringify(res.data.Cardapios));
      if (res.data.Cardapios.length > 0) {
        this.loadMenus();
      }
    } catch (err) {
      Alert.alert('Erro', err);
    }
  }

  loadMenus = async () => {
    await AsyncStorage.getItem('cardapios', (error, result) => {
      if (result) {
        const menus = JSON.parse(result);
        const filteredMenus = menus.filter((value) => {
          if (parseInt(value.data) >= parseInt(dateFormated())) {
            return value;
          }
        });
        filteredMenus.sort(dynamicSort('data'));
        if (filteredMenus.length > 0) {
          this.setState({ menus: filteredMenus });
        } else {
          NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
              this.downloadMenus();
            }
          });
        }
      } else {
        this.downloadMenus();
      }
    });
  }

  formatText = (text) => {
    const newText = text.replace(':', '');
    return newText.substring(0, 1) === ' ' ? newText.substring(1, newText.length) : newText;
  }

  selectedDay = () => {
    if (dayOfTheWeek() === 0) {
      return 1 + this.state.index;
    }
    return dayOfTheWeek() + this.state.index;
  }

  isLast = () => this.state.menus.length !== 0 ?
  this.state.index === (this.state.menus.length - 1) :
  true;

  isFirst = () => this.state.index === 0;

  next = () => {
    if (this.state.index < (this.state.menus.length - 1)) {
      const newIndex = this.state.index + 1;
      this.setState({ index: newIndex });
    }
  }

  last = () => {
    if (this.state.index > 0) {
      const nexIndex = this.state.index - 1;
      this.setState({ index: nexIndex });
    }
  }

  componentDidMount () {
    this.loadMenus();
  }

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Title style={styles.title}>Restaurante</Title>
          <ChangeItem isLast={this.isLast()} isFirst={this.isFirst()} next={() => this.next()} last={() => this.last()} text={nameOfDayOfTheWeek(this.selectedDay())} style={{ marginBottom: 15 }} />
        </View>
        <Subtitle style={styles.nameItem}>Almoço</Subtitle>
        <Subtitle style={styles.text}>{this.state.menus[this.state.index] ? this.formatText(this.state.menus[this.state.index].almoço) : ''}</Subtitle>
        <Subtitle style={styles.nameItem}>Jantar</Subtitle>
        <Subtitle style={styles.text}>{this.state.menus[this.state.index] ? this.formatText(this.state.menus[this.state.index].jantar) : ''}</Subtitle>
        <Subtitle style={styles.nameItem}>Guarnição</Subtitle>
        <Subtitle style={styles.text}>{this.state.menus[this.state.index] ? this.formatText(this.state.menus[this.state.index].guarnição) : ''}</Subtitle>
        <Subtitle style={styles.nameItem}>Saladas</Subtitle>
        <Subtitle style={styles.text}>{this.state.menus[this.state.index] ? this.formatText(this.state.menus[this.state.index].saladas) : ''}</Subtitle>
        <Subtitle style={styles.nameItem}>Sobremesas</Subtitle>
        <Subtitle style={styles.text}>{this.state.menus[this.state.index] ? this.formatText(this.state.menus[this.state.index].sobremesas) : ''}</Subtitle>
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
    paddingTop: 5,
    color: commonStyles.colors.principal,
  },
  nameItem: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 0,
    marginBottom: 0,
    color: commonStyles.colors.principal,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
  },
});