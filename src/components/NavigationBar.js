import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Title } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default props => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Title style={styles.title}>Central UFABC</Title>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    backgroundColor: commonStyles.colors.principal,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#BBB',
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0, 
    color: commonStyles.colors.white,
  },
});