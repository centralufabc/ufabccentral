import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, TouchableOpacity, NetInfo } from 'react-native';
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter } from 'react-native-popup-dialog';
import { Title, Subtitle, TextInput } from '@shoutem/ui';
import axios from 'axios';
import ElevatedView from 'react-native-elevated-view';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import commonStyles from '../styles/commonStyles';
import ChangeItem from './../components/ChangeItem';


import { urlServer, biweekly, dynamicSort, dayOfTheWeek, nameOfDayOfTheWeek, hour } from '../common';
import { amplitude } from '../../App';

export default class CardAulas extends Component {
  state = {
    classrooms: [],
    classesToday: [],
    index: 0,
    ra: 0,
    nextRA: '',
    dialogVisible: false,
    indexDay: 0,
    biweekly: 'quinzenal I',
  }

  loadRA = async () => {
    await AsyncStorage.getItem('ra', (error, result) => {
      if (result) {
        this.setState({ ra: result }, () => {
          NetInfo.isConnected.fetch().then((isConnected) => {
            if (isConnected) {
              this.downloadClassRooms();
            }
          });

        });
      }
    });
  }

  downloadClassRooms = async () => {
    try {
      const res = await axios.get(`${urlServer}/turmas/buscar/${this.state.ra}`);
      AsyncStorage.setItem('aulas', JSON.stringify(res.data));
      this.loadClassRooms();
    } catch (err) {}
  }

  loadClassRooms = async () => {
    await AsyncStorage.getItem('aulas', (error, result) => {
      if (result) {
        const allClasses = this.separateClasses(JSON.parse(result));
        const day = nameOfDayOfTheWeek(this.state.indexDay).toLowerCase().replace('ç', 'c').replace('á', 'a');

        const filteredClasses = allClasses.filter((value) => {
          if (value.dayOfClass.includes(day)
              && (value.frequency.includes(this.state.biweekly) ||
                  value.frequency.includes('semanal'))) {
            if (this.state.biweekly === 'quinzenal I') {
              if (!value.frequency.includes('II')) {
                return value;
              }
              return false;
            }
            return value;
          }
        });
        filteredClasses.sort(dynamicSort('startTime'));
        let classRomsOfDayIndex = 0;
        for (let i=0; i < filteredClasses.length; i++) {
          if ((hour() >= filteredClasses[i].endTime) && (filteredClasses.length > (i + 1))) {
            classRomsOfDayIndex = 0;
          }
        }
        this.setState({ classrooms: allClasses, classesToday: filteredClasses, index: classRomsOfDayIndex });
      }
    });
  }

  separateClasses = (allClasses) => {
    const formatedClasses = [];
    for (let j = 0; j < allClasses.length; j++) {
      const value = allClasses[j];
      if (value.teoria && value.teoria !== '0') {
        const separateClasses = value.teoria.split(',');
        for (let i = 0; i < separateClasses.length; i = i + 3) {
          const dayOfClass = separateClasses[i].split(' das ')[0].replace(' ', '');
          const startTime = parseInt(separateClasses[i].split(' das ')[1].replace(' ', '').split('às')[0].replace(':', ''));
          const endTime = parseInt(separateClasses[i].split(' das ')[1].replace(' ', '').split('às')[1].replace(':', ''));
          const room = separateClasses[i + 1].replace('sala', '');
          const frequency = separateClasses[i + 2];
          const newClass = {};
          newClass.dayOfClass = dayOfClass;
          newClass.startTime = startTime;
          newClass.endTime = endTime;
          newClass.room = room;
          newClass.frequency = frequency;
          newClass.className = value.classe;
          newClass.teacherName = value.docenteTeoria;
          formatedClasses.push(newClass);
        }
      }
      if (value.pratica && value.pratica !== '0') {
        const separateClasses = value.pratica.split(',');
        for (let i = 0; i < separateClasses.length; i = i + 3) {
          const dayOfClass = separateClasses[i].split(' das ')[0].replace(' ', '');
          const startTime = parseInt(separateClasses[i].split(' das ')[1].replace(' ', '').split('às')[0].replace(':', ''));
          const endTime = parseInt(separateClasses[i].split(' das ')[1].replace(' ', '').split('às')[1].replace(':', ''));
          const room = separateClasses[i + 1].replace('sala', '');
          const frequency = separateClasses[i + 2];
          const newClass = {};
          newClass.dayOfClass = dayOfClass;
          newClass.startTime = startTime;
          newClass.endTime = endTime;
          newClass.room = room;
          newClass.frequency = frequency;
          newClass.className = value.classe;
          newClass.teacherName = value.docentePratica;
          formatedClasses.push(newClass);
        }
      }
    }
    return formatedClasses;
  }

  formatTime = () => {
    let initTime = this.state.classesToday[this.state.index].startTime ?
    this.state.classesToday[this.state.index].startTime.toString().substring(0, 2) :
    '';
    initTime = initTime === '80' ? '8' : initTime;
    const endTime = this.state.classesToday[this.state.index].endTime ?
    this.state.classesToday[this.state.index].endTime.toString().substring(0, 2) :
    '';

    return initTime + 'h às ' + endTime + 'h';
  }

  isLastClass = () => this.state.classesToday.length !== 0 ?
  this.state.index === (this.state.classesToday.length - 1) :
  true;

  isFirstClass = () => this.state.index === 0;

  nextClass = () => {
    amplitude.logEvent('click_next_today_aulas');
    if (this.state.index < (this.state.classesToday.length - 1)) {
      const newIndex = this.state.index + 1;
      this.setState({ index: newIndex });
    }
  }

  lastClass = () => {
    amplitude.logEvent('click_next_previous_aulas');
    if (this.state.index > 0) {
      const nexIndex = this.state.index - 1;
      this.setState({ index: nexIndex });
    }
  }

  isLastDay = () => this.state.indexDay === 6;

  isFirstDay = () => this.state.indexDay === 0;

  nextDay = () => {
    amplitude.logEvent('click_next_day_aulas', { day: this.state.indexDay });
    if (this.state.indexDay < 6) {
      const newIndex = this.state.indexDay + 1;
      this.setState({ indexDay: newIndex }, this.loadClassRooms);
    }
  }

  lastDay = () => {
    amplitude.logEvent('click_previous_day_aulas', { day: this.state.indexDay });
    if (this.state.indexDay > 0) {
      const nexIndex = this.state.indexDay - 1;
      this.setState({ indexDay: nexIndex }, this.loadClassRooms);
    }
  }

  changeRA = (value) => {
    if (value.length <= 12) {
      this.setState({ nextRA: value });
    }
  }

  changeBiweekly = () => {
    amplitude.logEvent('click_change_biweekly');
    const newBiweekly = this.state.biweekly === 'quinzenal I' ? 'quinzenal II' : 'quinzenal I';
    this.setState({ biweekly: newBiweekly }, this.loadClassRooms);
  }

  saveRA = () => {
    AsyncStorage.setItem('ra', this.state.nextRA.toString());
    amplitude.logEvent('add_new_ra', { newRa: this.state.nextRA, oldRA: this.state.ra });
    this.setState({ ra: this.state.nextRA, dialogVisible: false }, this.downloadClassRooms);
  }

  biweeklyText = () => this.state.biweekly.substring(0, 1).toUpperCase() + this.state.biweekly.substring(1);

  componentDidMount() {
    this.loadRA();
    const dayOfThWeekWithoutSunday = dayOfTheWeek() === 0 ? 1 : dayOfTheWeek();
    this.setState({ indexDay: dayOfThWeekWithoutSunday, biweekly: biweekly() }, this.loadClassRooms);
  }

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ alignItems: 'center' }}>
          <Title style={styles.title}>Aulas</Title>
          <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.changeBiweekly}>
                <IconMaterial name={'autorenew'} style={{ marginRight: 5 }} size={25} color={commonStyles.colors.black} />
              </TouchableOpacity>
              <Subtitle>{this.biweeklyText()}</Subtitle>
            </View>
            <ChangeItem isLast={this.isLastDay()} isFirst={this.isFirstDay()} next={() => this.nextDay()} last={() => this.lastDay()} text={nameOfDayOfTheWeek(this.state.indexDay)} />
          </View>
          {this.state.classesToday.length > 1 && <ChangeItem isLast={this.isLastClass()} isFirst={this.isFirstClass()} next={() => this.nextClass()} last={() => this.lastClass()} text={'Outras aulas'} />}
          <Subtitle style={styles.className}>{this.state.classesToday[this.state.index] ? this.state.classesToday[this.state.index].className : '-'}</Subtitle>
          <Subtitle style={styles.schedule}>{this.state.classesToday[this.state.index] ? this.formatTime() : '-'}</Subtitle>
          <Subtitle style={styles.teacherName}>{this.state.classesToday[this.state.index] ? this.state.classesToday[this.state.index].teacherName : '-'}</Subtitle>
          <Subtitle style={styles.schedule}>{this.state.classesToday[this.state.index] ? this.state.classesToday[this.state.index].room : '-'}</Subtitle>
          <TouchableOpacity onPress={() => this.setState({ dialogVisible: true })}>
            <Subtitle style={styles.addRA}>{this.state.ra === 0 ? 'Toque aqui para adicionar seu RA\n' : 'Aulas do RA: ' + this.state.ra + '\nToque aqui para editar'}</Subtitle>
          </TouchableOpacity>
        </View>
        <Dialog
          visible={this.state.dialogVisible}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          footer={
            <DialogFooter>
              <DialogButton
                text="Cancelar"
                onPress={() => this.setState({ dialogVisible: false })}
              />
              <DialogButton
                text="OK"
                onPress={this.saveRA}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Title style={{ marginTop: 15 }}>Digite o RA:</Title>
            <TextInput
              placeholder={'000000000000'}
              keyboardType={'numeric'}
              onChangeText={(value) => this.changeRA(value)}
              value={this.state.nextRA}
            />
          </DialogContent>
        </Dialog>
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
  className: {
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  schedule: {
    marginBottom: 5,
    textAlign: 'center',
    color: commonStyles.colors.principal,
  },
  addRA: {
    marginTop: 15,
    textAlign: 'center',
    color: commonStyles.colors.blueInfos,
  },
  teacherName: {
    textAlign: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  moreAboutClassRooms: {
    color: commonStyles.colors.principal,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  title: {
    paddingTop: 5,
    color: commonStyles.colors.principal,
  },
});
