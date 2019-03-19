import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Title } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default NavigationBar = () => {
  return (
    <View style={styles.container}>
        <Title style={styles.title}>Central UFABC</Title>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  title: {
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    color: commonStyles.colors.white,
  },
});
