import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import commonStyles from '../styles/commonStyles';
import ElevatedView from 'react-native-elevated-view'
import ChangeItem from './ChangeItem';

export default class CardAulas extends Component {
  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{alignItems: 'center'}}>
          <Text style={styles.className}>Geometria Analítica A4 - Diurno (Santo André)</Text>
          <Text style={styles.schedule}>8h às 10h</Text>
          <Text style={styles.teacherName}>Juliana Militão da Silva Berbert</Text>
          <Text style={styles.schedule}>S-214-0</Text>
          <ChangeItem text={'Outras aulas'} />
          <Text style={styles.moreAboutClassRooms}>Ver mais sobre aulas</Text>
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
    marginRight: 5,
    backgroundColor: 'white',
  },
  className: {
    textAlign: 'center',
    fontFamily: commonStyles.fontFamily,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  schedule: {
    fontFamily: commonStyles.fontFamily,
    marginBottom: 5,
    textAlign: 'center',
    color: commonStyles.colors.principal,
  },
  teacherName: {
    textAlign: 'center',
    fontFamily: commonStyles.fontFamily,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  moreAboutClassRooms: {
    color: commonStyles.colors.principal,
    marginTop: 10,
    fontFamily: commonStyles.fontFamily,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
});