import React, { Component } from 'react';
import { StyleSheet, View, NetInfo, Alert, AsyncStorage, FlatList, Text } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import {
  Title,
} from '@shoutem/ui';
import axios from 'axios';
import commonStyles from '../styles/commonStyles';
import ChangeItem from './../components/ChangeItem';

import { urlServer, shortMonthName, day, month, year } from '../common';

export default class CardRU extends Component {
  state = {
    dates: [],
    filteredDates: [],
    index: 0,
    typesCalendar: [{ tag: 'all', text: 'Geral'}, { tag: 'festas', text: 'Festas'}, { tag: 'aulas', text: 'Aulas'}],
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
          if (this.mountDate(value.ano, value.mes, value.dia) >= this.mountDate(year(), month(), day())
              && (this.state.typesCalendar[this.state.index].tag === 'all' 
                  || this.state.typesCalendar[this.state.index].tag === value.tipo)) {
            return value;
          }
        });
        filteredDates.sort(this.sortDates());
        this.setState({ dates, filteredDates });
      } else {
        this.downloadDates();
      }
    });
  }

  mountDate = (newYear, newMonth, newDay) => {
    newMonth = newMonth < 10 ? '0' + newMonth.toString() : newMonth.toString();
    newDay = newDay < 10 ? '0' + newDay.toString() : newDay.toString();
    const formatedText = newYear.toString() + newMonth.toString() + newDay.toString();
    return parseInt(formatedText);
  }

  sortDates = () => {
    const sortOrder = 1;
    return (a, b) => {
      const result = this.mountDate(a.ano, a.mes, a.dia) < this.mountDate(b.ano, b.mes, b.dia) ? -1 : this.mountDate(a.ano, a.mes, a.dia) > this.mountDate(b.ano, b.mes, b.dia) ? 1 : 0;
      return result * sortOrder;
    };
  };

  next = () => {
    if (this.state.index <= 1) {
      const newIndex = this.state.index + 1;
      this.setState({ index: newIndex }, this.loadDates);
    } else {
      this.setState({ index: 0 }, this.loadDates);
    }
  }

  last = () => {
    if (this.state.index >= 1) {
      const nexIndex = this.state.index - 1;
      this.setState({ index: nexIndex }, this.loadDates);
    } else {
      this.setState({ index: 2 }, this.loadDates);
    }
  }

  componentDidMount () {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.downloadDates();
      }
    });
    this.loadDates();
  }

  itemDate = (dayDate, monthDate, nameDate) =>
    <ElevatedView elevation={10} style={styles.dateCard}>
      <View style={styles.viewCard}>
        <Text style={{ fontSize: 36, textAlign: 'center', height: 45, justifyContent: 'center', color: commonStyles.colors.black }}>
          {dayDate}
        </Text>
        <Text style={{ fontSize: 12, textAlign: 'center', color: commonStyles.colors.principal }}>
          {shortMonthName(monthDate)}
        </Text>
      </View>
      <View style={{ marginTop: 5, marginBottom: 5, height: '80%', backgroundColor: commonStyles.colors.black, flex: 1 }} />
      <View style={{ flex: 50, height: '100%', justifyContent: 'center' }}>
        <Text style={{ color: commonStyles.colors.principal, textAlign: 'center', fontSize: 16, padding: 5 }}>
          {nameDate}
        </Text>
      </View>
    </ElevatedView>

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Title style={styles.title}>Calendário</Title>
          <ChangeItem
            style={{ height: '11%' }}
            text={this.state.typesCalendar[this.state.index].text}
            next={() => this.next()}
            last={() => this.last()}
          />
          <FlatList
            style={styles.dateCalendar}
            data={this.state.filteredDates}
            renderItem={({ item }) => this.itemDate(item.dia, item.mes, item.nome)}
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
    height: '8%',
  },
  dateCalendar: {
    width: '100%',
    height: '80%',
  },
  dateCard: {
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: commonStyles.colors.white,
    marginTop: 3,
    marginBottom: 3,
  },
  viewCard: {
    flex: 12,
    height: '100%',
    justifyContent: 'center',
  },
});
