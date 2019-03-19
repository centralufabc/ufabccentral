import React, { Component } from 'react';
import {
  Heading,
  Title,
  Subtitle,
} from '@shoutem/ui';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import ElevatedView from 'react-native-elevated-view';
import { StyleSheet, View, Alert, AsyncStorage } from 'react-native';

import axios from 'axios';

import DropDownStations from './DropDownStations';
import ChangeItem from './ChangeItem';

import commonStyles from '../styles/commonStyles';
import { urlServer, dayOfTheWeek, hour, minutes } from '../common';

export default class CardBus extends Component {
  state = {
    origin: 'Santo André',
    destiny: 'Terminal Leste',
    keyOrigin: '',
    keyDestiny: '',
    lastSchedule: 'O último fretado foi há 5 min',
    schedules: [],
    nextSchedules: [],
    updated: 0,
    teste: '',
  }

  setEmptyState = () => {
    this.setState({ nextSchedules: [], lastSchedule: 'Não tem fretado hoje :c' });
  }

  identifyKeys = () => {
    if(this.state.origin === 'Santo André') {
      switch(this.state.destiny) {
        case 'Term. Leste': 
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'Leste'}, this.searchSchedules );
          break;
        case 'São Bernardo':
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'SBC' }, this.searchSchedules );
          break;
        case 'Term. SBC':
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'TermPraca' }, this.searchSchedules );
          break;
        default:
          this.searchSchedules();
      }
     } else if (this.state.origin === 'Term. Leste') {
          switch(this.state.destiny) {
            case 'Santo André': 
              this.setState({ keyOrigin: 'LesteSA', keyDestiny: 'SA' }, this.searchSchedules);
              break;
            case 'São Bernardo':
              this.setState({ keyOrigin: 'LesteSBC', keyDestiny: 'SBC' }, this.searchSchedules);
              break;
            case 'Term. SBC':
              this.setState({ keyOrigin: 'LesteSBC', keyDestiny: 'TermPraca' }, this.searchSchedules);
              break;
            default:
              this.searchSchedules();
          }
        } else if (this.state.origin === 'São Bernardo') {
            switch(this.state.destiny) {
              case 'Santo André': 
                this.setState({ keyOrigin: 'SBCLeste', keyDestiny: 'SA' }, this.searchSchedules );
                break;
              case 'Term. Leste':
                this.setState({ keyOrigin: 'SBCLeste', keyDestiny: 'LesteSA' }), this.searchSchedules;
                break;
              case 'Term. SBC':
                this.setState({ keyOrigin: 'SBCPraca', keyDestiny: 'TermPraca' }, this.searchSchedules);
                break;
              case 'Praça dos Expedicionários':
                this.setState({ keyDestiny: 'PracaSBC', keyOrigin: 'SBCPraca' }, this.searchSchedules);
                break;
              default:
                this.searchSchedules();
            }
          } else if (this.state.origin === 'Term. SBC') {
              switch(this.state.destiny) {
                case 'Santo André': 
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'SA' }, this.searchSchedules);
                  break;
                case 'Term. Leste':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'LesteSA' }, this.searchSchedules);
                  break;
                case 'São Bernardo':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'SBC' }, this.searchSchedules);
                  break;
                case 'Praça dos Expedicionários':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'PracaSBC' }, this.searchSchedules);
                  break;
                default:
                  this.searchSchedules();
              }
            } else if (this.state.origin === 'Praça dos Expedicionários') {
              this.setState({ keyOrigin: 'PracaTerm' });
              switch(this.state.destiny) {
                case 'São Bernardo':
                  this.setState({ keyOrigin: 'PracaSBC', keyDestiny: 'SBC' }, this.searchSchedules);
                  break;
                case 'Term. SBC':
                  this.setState({ keyOrigin: 'PracaTerm', keyDestiny: 'TermPraca' }, this.searchSchedules);
                  break;
                default:
                  this.searchSchedules();
              }
            } else {
              this.searchSchedules();
            }
  }

  weekDaySearch = () => {
    hourFormated = (hour * 60) + minutes;
    nexts = [];
    this.state.schedules.forEach((value, index, array) => {
      this.setState({ teste : this.state.keyOrigin });
      if(this.formatHour(value[this.state.keyOrigin]) >= hourFormated) {
        nexts.push(value);
      }
    });
    this.setState({ nextSchedules : nexts });
  }

  formatHour = (hour) => {
    stringHour = hour.toString();
    if (stringHour.length > 3) {
      h = parseInt(stringHour.substring(0, 2)); 
      m = parseInt(stringHour.substring(2, 4));
      return (h*60) + m;
    }

    h = parseInt(stringHour.substring(0, 1)); 
    m = parseInt(stringHour.substring(1, 3));
    return (h*60) + m;
  }; 

  downloadSchedules = async () => {
    try {
      const res = await axios.get(`${urlServer}/fretados`);
      AsyncStorage.setItem('fretados', JSON.stringify(res.data.data));
    } catch (err) {
      Alert.alert('Erro', err);
    }
  }

  updateOrigin = (origin) => {
    this.setState({ origin }, this.identifyKeys);
  }

  updateDestiny = (destiny) => {
    this.setState({ destiny }, this.identifyKeys);
  }

  loadSchedules = async () => {
    await AsyncStorage.getItem('fretados', (error, result) => {
      this.setState({ schedules: JSON.parse(result).schedules });
    });
  }

  saturdaySearch = () => {
    this.setState({ updated : 55 });
    Alert.alert('teste', 'teste');
  }

  searchSchedules = () => {
    switch(2) {
      case 0: 
        this.setEmptyState();
        break;
      case 1:
        this.saturdaySearch();
        break;
      default:
        this.weekDaySearch();
    }
  }

  componentDidMount() {
    this.downloadSchedules();
    this.loadSchedules();
  }

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={styles.centralizeItems}>
          <Title style={styles.title}>Fretado</Title>
        </View>
        <View style={{ marginLeft: 16, marginRight: 16 }}>
          <DropDownStations origin value={'Santo André'} />
        </View>
        <View style={styles.originDestinyGroup}>
          <IconMaterial name={'compare-arrows'} style={styles.icon} size={30} color={commonStyles.colors.black} />
        </View>
        <View style={{ marginLeft: 16, marginRight: 16 }}>
          <DropDownStations origin={false} value={'Terminal leste'} />
        </View>
        <View style={styles.centralizeItems}>
          <Subtitle>{this.state.lastSchedule}</Subtitle>
          <Heading style={{ color: commonStyles.colors.principal }}>25 min</Heading>
          <Subtitle style={{ color: commonStyles.colors.blueInfos }}>Você vai chegar ás 22h30</Subtitle>
          <ChangeItem text={'Outros horários'} />
          <Subtitle style={styles.moreAboutBus}>Ver mais sobre fretados</Subtitle>
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
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  originDestinyGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  centralizeItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreAboutBus: {
    color: commonStyles.colors.principal,
    marginTop: 10,
  },
  icon: {
    transform: [{ rotate: '90deg' }],
    marginRight: 10,
  },
});
