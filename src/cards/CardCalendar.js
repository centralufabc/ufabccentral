import React, { Component } from 'react';
import { StyleSheet, View, NetInfo, Alert, AsyncStorage } from 'react-native';
import {
  Title,
  Subtitle,
} from '@shoutem/ui';
import axios from 'axios';
import commonStyles from '../styles/commonStyles';
import ElevatedView from 'react-native-elevated-view';
import ChangeItem from './../components/ChangeItem';

import { urlServer, dateFormated, dynamicSort, dayOfTheWeek, nameOfDayOfTheWeek, day, month, year } from '../common';

export default class CardRU extends Component {
  state = {
    dates: [],
    filteredDates: [],
    index: 0,
  }

  downloadDates = async () => {
    try {
      const res = await axios.get(`${urlServer}/datas`);
      AsyncStorage.setItem('datas', JSON.stringify(res.data.datas));
      this.loadDates();
    } catch (err) {
      Alert.alert('Erro', err);
    }
  }

  loadDates = async () => {
    await AsyncStorage.getItem('datas', (error, result) => {
      if (result) {
        const dates = JSON.parse(result);
        const filteredDates = dates.filter((value) => {
          if (this.mountDate(value.ano, value.mes, value.dia) >= this.mountDate(year(), month(), day())) {
            return value;
          }
        });
        this.setState({ dates, filteredDates });
      } else {
        this.downloadDates();
      }
    });
  }

  mountDate = (newYear, newMonth, newDay) => {
    newMonth = newMonth < 10 ? '0' + newMonth.toString() : newMonth.toString();
    newDay = newMonth < 10 ? '0' + newDay.toString() : newDay.toString();
    const formatedText = newYear.toString() + newMonth.toString() + newDay.toString();
    return parseInt(formatedText);
  }

  componentDidMount () {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.downloadDates();
      }
    });
    this.loadDates();
  }

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Title style={styles.title}>Calendário</Title>
          <Title style={styles.title}>{this.state.filteredDates.length}</Title>
          <ElevatedView
            elevation={10}
            style={styles.dateCalendar}
          />
        </View>
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
  dateCalendar: {
    width: '90%',
    height: '90%',
    backgroundColor: commonStyles.colors.principal,
  },
});
