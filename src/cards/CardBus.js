import React, { Component } from 'react';
import {
  Heading,
  Title,
  Subtitle,
} from '@shoutem/ui';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import ElevatedView from 'react-native-elevated-view';
import {
  StyleSheet,
  View,
  AsyncStorage,
  TouchableOpacity,
  Linking,
  NetInfo,
} from 'react-native';

import axios from 'axios';

import DropDownStations from '../components/DropDownStations';
import ChangeItem from '../components/ChangeItem';

import commonStyles from '../styles/commonStyles';
import { urlServer, linesAvaliable, hour, minutes, formatHour, pdfFilesLink, dynamicSort } from '../common';

export default class CardBus extends Component {
  state = { //eslint-disable-line
    stations: [{ value: 'Santo André', origins: ['Terminal leste', 'São Bernardo', 'Terminal SBC'] }, { value: 'Terminal leste', origins: ['Santo André', 'São Bernardo', 'Terminal SBC'] }, { value: 'São Bernardo', origins: ['Santo André', 'Terminal leste', 'Praça dos expedicionários', 'Terminal SBC'] }, { value: 'Terminal SBC', origins: ['Santo André', 'Terminal leste', 'Praça dos expedicionários', 'São Bernardo'] }, { value: 'Praça dos expedicionários', origins: ['Terminal SBC', 'São Bernardo'] }],
    stationsDestiny: [{ value: 'Terminal leste', origins: ['Santo André', 'São Bernardo', 'Terminal SBC'] }, { value: 'São Bernardo', origins: ['Santo André', 'Terminal leste', 'Praça dos expedicionários', 'Terminal SBC'] }, { value: 'Terminal SBC', origins: ['Santo André', 'Terminal leste', 'Praça dos expedicionários', 'São Bernardo'] }],
    keyOrigin: '',
    keyDestiny: '',
    lastSchedule: '',
    schedules: [],
    nextSchedules: [],
    updated: 0,
    origin: 'Santo André',
    destiny: 'São Bernardo',
    index: 0,
  }

  filterStations = (stationSelected) => {
    const destinys = this.state.stations.filter((value) => {
      if (value.origins.includes(stationSelected)) {
        return value;
      }
    });
    this.setState({ stationsDestiny: destinys, destiny: destinys[0].value }, this.identifyKeys);
    AsyncStorage.setItem('destiny', destinys[0].value);
  };

  updateOrigin = (stationSelected) => {
    this.setState({ origin: stationSelected }, () => {
      AsyncStorage.setItem('origin', stationSelected);
      this.filterStations(stationSelected);
    });
  }

  updateDestiny = (stationSelected) => {
    this.setState({ destiny: stationSelected }, () => {
      AsyncStorage.setItem('destiny', stationSelected);
      this.identifyKeys();
    });
  }

  downloadSchedules = async () => {
    try {
      const res = await axios.get(`${urlServer}/fretados`);
      AsyncStorage.setItem('fretados', JSON.stringify(res.data.data));
      this.loadSchedules();
    } catch (err) {}
  }

  loadSchedules = async () => {
    await AsyncStorage.getItem('fretados', (error, result) => {
      if (result) {
        this.setState({ schedules: JSON.parse(result).schedules });
      }
    });
    let origin = this.state.origin;
    let destiny = this.state.destiny;
    await AsyncStorage.getItem('origin', (error, result) => {
      if (result) {
        origin = result;
      }
    });
    await AsyncStorage.getItem('destiny', (error, result) => {
      if (result) {
        destiny = result;
      }
    });
    this.setState({ origin }, () => {
      const destinys = this.state.stations.filter((value) => {
        if (value.origins.includes(origin)) {
          return value;
        }
      });
      this.setState({ stationsDestiny: destinys, destiny }, () => {
        this.identifyKeys();
      });
    });
  }

  openPDFFiles = () => {
    Linking.canOpenURL(pdfFilesLink).then(() => {
      Linking.openURL(pdfFilesLink);
    });
  }

  identifyKeys = () => {
    if (this.state.origin === 'Santo André') {
      switch (this.state.destiny) {
        case 'Terminal leste':
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'Leste'}, this.searchSchedules);
          break;
        case 'São Bernardo':
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'SBC' }, this.searchSchedules);
          break;
        case 'Terminal SBC':
          this.setState({ keyOrigin: 'SALeste', keyDestiny: 'TermPraca' }, this.searchSchedules);
          break;
        default:
          this.searchSchedules();
      }
    } else if (this.state.origin === 'Terminal leste') {
      switch (this.state.destiny) {
        case 'Santo André':
          this.setState({ keyOrigin: 'LesteSA', keyDestiny: 'SA' }, this.searchSchedules);
          break;
        case 'São Bernardo':
          this.setState({ keyOrigin: 'LesteSBC', keyDestiny: 'SBC' }, this.searchSchedules);
          break;
        case 'Terminal SBC':
          this.setState({ keyOrigin: 'LesteSBC', keyDestiny: 'TermPraca' }, this.searchSchedules);
          break;
        default:
          this.searchSchedules();
      }
    } else if (this.state.origin === 'São Bernardo') {
      switch (this.state.destiny) {
        case 'Santo André':
          this.setState({ keyOrigin: 'SBCLeste', keyDestiny: 'SA' }, this.searchSchedules);
          break;
        case 'Terminal leste':
          this.setState({ keyOrigin: 'SBCLeste', keyDestiny: 'LesteSA' }, this.searchSchedules);
          break;
        case 'Terminal SBC':
          this.setState({ keyOrigin: 'SBCPraca', keyDestiny: 'TermPraca' }, this.searchSchedules);
          break;
        case 'Praça dos expedicionários':
          this.setState({ keyDestiny: 'PracaSBC', keyOrigin: 'SBCPraca' }, this.searchSchedules);
          break;
        default:
          this.searchSchedules();
      }
      } else if (this.state.origin === 'Terminal SBC') {
              switch(this.state.destiny) {
                case 'Santo André': 
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'SA' }, this.searchSchedules);
                  break;
                case 'Terminal leste':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'LesteSA' }, this.searchSchedules);
                  break;
                case 'São Bernardo':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'SBC' }, this.searchSchedules);
                  break;
                case 'Praça dos expedicionários':
                  this.setState({ keyOrigin: 'TermPraca', keyDestiny: 'PracaSBC' }, this.searchSchedules);
                  break;
                default:
                  this.searchSchedules();
              }
            } else if (this.state.origin === 'Praça dos expedicionários') {
              this.setState({ keyOrigin: 'PracaTerm' });
              switch(this.state.destiny) {
                case 'São Bernardo':
                  this.setState({ keyOrigin: 'PracaSBC', keyDestiny: 'SBC' }, this.searchSchedules);
                  break;
                case 'Terminal SBC':
                  this.setState({ keyOrigin: 'PracaTerm', keyDestiny: 'TermPraca' }, this.searchSchedules);
                  break;
                default:
                  this.searchSchedules();
              }
            } else {
              this.searchSchedules();
            }
  }

  searchSchedules = () => {
    const time = (hour() * 60) + minutes();
    const resultSearch = this.state.schedules.filter((value) => {
      if (formatHour(value[this.state.keyOrigin]) >= time
         && formatHour(value[this.state.keyOrigin]) <= (time + 60)
         && linesAvaliable().includes(value['Linha'])
         && value[this.state.keyDestiny]
         && time > 60) {
        return value;
      }
    });
    resultSearch.sort(dynamicSort(this.state.keyOrigin));
    if (!this.isEquivalent(resultSearch, this.state.nextSchedules)) {
      this.setState({ nextSchedules: resultSearch, index: 0 });
      this.searchLastSchedule();
    }
  };

  isEquivalent = (a, b) => {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }

  reverseStations = () => {
    const oldOrigin = this.state.origin;
    const oldDestiny = this.state.destiny;
    this.setState({ origin: oldDestiny }, () => {
      AsyncStorage.setItem('origin', oldDestiny);
      const destinys = this.state.stations.filter((value) => {
        if (value.origins.includes(oldDestiny)) {
          return value;
        }
      });
      this.setState({ stationsDestiny: destinys, destiny: oldOrigin }, () => {
        AsyncStorage.setItem('destiny', oldOrigin);
        this.identifyKeys();
      });
    });
  }

  searchLastSchedule = () => {
    const time = (hour() * 60) + minutes();
    const resultSearch = this.state.schedules.filter((value) => {
      if (formatHour(value[this.state.keyOrigin]) < time
         && formatHour(value[this.state.keyOrigin]) >= (time - 60)
         && linesAvaliable().includes(value['Linha'])
         && value[this.state.keyDestiny]
         && time > 60) {
        return value;
      }
    });
    if (resultSearch.length > 0) {
      resultSearch.sort(dynamicSort(this.state.keyOrigin));
      const textLastSchedule = 'O último foi ' + this.nameLine(resultSearch[resultSearch.length - 1]) +  ' há ' + (time - formatHour(resultSearch[resultSearch.length - 1][this.state.keyOrigin])) + ' min';
      this.setState({ lastSchedule: textLastSchedule });
    }
  }

  timeForNext = () => {
    const next = this.state.nextSchedules[this.state.index];
    if (next) {
      const time = formatHour(next[this.state.keyOrigin]) - ((hour() * 60) + minutes());
      if (time > 1) {
        return time + ' minutos'; 
      }
      return time + ' minuto';
    }
    return '0 minuto';
  }

  arrivalTime = () => {
    const next = this.state.nextSchedules[this.state.index];
    if (next) {
      const time = next[this.state.keyDestiny].toString();
      let h;
      let m;
      if (time.length > 3) {
        h = time.substring(0, 2);
        m = time.substring(2, 4);
      } else {
        h = time.substring(0, 1);
        m = time.substring(2, 3);
      }
      return 'Você vai chegar às ' + h + 'h' + m;
    }
    return 'Sem fretado na próxima hora';
  }

  nameLine = (next) => {
    if (next) {
      const numberLine = parseInt(next['Linha']);
      if (numberLine <= 6) {
        if (numberLine === 6) {
          return 'Expresso';
        }
        return 'Linha ' + numberLine;
      }
      if (next['SBCLeste'] !== 0) {
        return 'Linha 2';
      }
      return 'Linha 1';
    } 
    return '';
  }

  isLast = () => this.state.nextSchedules.length !== 0 ?
  this.state.index === (this.state.nextSchedules.length - 1) :
  true;

  isFirst = () => this.state.index === 0;

  next = () => {
    if (this.state.index < (this.state.nextSchedules.length - 1)) {
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

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      if (isConnected) {
        this.downloadSchedules();
      }
    });
    this.loadSchedules();
    setInterval(this.searchSchedules, 1000);
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
          <DropDownStations stations={this.state.stations} itemCount={5} onChange={(station) => this.updateOrigin(station)} origin value={this.state.origin} />
        </View>
        <TouchableOpacity onPress={() => this.reverseStations()}>
          <View style={styles.originDestinyGroup}>
            <IconMaterial name={'compare-arrows'} style={styles.icon} size={30} color={commonStyles.colors.black} />
          </View>
        </TouchableOpacity>
        <View style={{ marginLeft: 16, marginRight: 16 }}>
          <DropDownStations stations={this.state.stationsDestiny} onChange={(station) => this.updateDestiny(station)} origin={false} value={this.state.destiny} />
        </View>
        <View style={styles.centralizeItems}>
          <Subtitle>{this.state.lastSchedule}</Subtitle>
          <Heading style={{ color: commonStyles.colors.principal }}>{this.timeForNext()}</Heading>
          <Subtitle>{this.nameLine(this.state.nextSchedules[this.state.index])}</Subtitle>
          <Subtitle style={{ color: commonStyles.colors.blueInfos }}>{this.arrivalTime()}</Subtitle>
          <ChangeItem isLast={this.isLast()} isFirst={this.isFirst()} next={() => this.next()} last={() => this.last()} text={'Outros horários'} />
          <TouchableOpacity onPress={() => this.openPDFFiles()}>
            <Subtitle style={styles.moreAboutBus}>Ver tabelas em PDF</Subtitle>
          </TouchableOpacity>
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
