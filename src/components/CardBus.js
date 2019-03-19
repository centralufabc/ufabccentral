import React, { Component } from 'react';
import { 
  Heading,
  Title,
  Subtitle,
} from '@shoutem/ui';
import { StyleSheet, View, Alert, AsyncStorage } from 'react-native';

import axios from 'axios';

import DropDownStations from './DropDownStations';
import ChangeItem from './ChangeItem';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../styles/commonStyles';
import ElevatedView from 'react-native-elevated-view';
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
        <Title style={styles.originDestinyText}>{this.state.nextSchedules.length}</Title>
        <DropDownStations onSelectedStation={(newOrigin) => this.updateOrigin(newOrigin) } />
        <View style={styles.originDestinyGroup}>
          <Title style={styles.originDestinyText}>{this.state.teste}</Title>
          <IconMaterial name='compare-arrows' style={{ transform: [{ rotate: '90deg'}], marginRight: 5 }} size={30} color={commonStyles.colors.black} />
        </View>
        <DropDownStations onSelectedStation={(newDestiny) => this.updateDestiny(newDestiny)} />
        <View style={styles.centralizeItems}>
          <Subtitle styleName="sm-gutter-top">{this.state.lastSchedule}</Subtitle>
          <Heading style={{ color: commonStyles.colors.principal }}>25 min</Heading>
          <Subtitle styleName="sm-gutter-top" style={{ color: commonStyles.colors.blueInfos }}>Você vai chegar ás 22h30</Subtitle>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 }}>
          <ChangeItem text={'Outros horários'} style={{ paddingLeft: 5 }} />
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
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  originDestinyText: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  originDestinyGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  centralizeItems: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  moreAboutBus: {
    color: commonStyles.colors.principal,
    marginRight: 10,
  },
});
