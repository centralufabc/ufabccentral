import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import { Heading } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default NavigationBar = () => {
  return (
    <View style={styles.container}>
      <Heading style={styles.title}>Central UFABC</Heading>
    </View>
  );
};

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
    paddingTop: Platform.OS === 'ios' ? 35 : 10,
    color: commonStyles.colors.white,
  },
});
