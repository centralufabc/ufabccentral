import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Icon, Subtitle } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default props => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Icon name="left-arrow" />
      <Subtitle style={{ fontFamily: commonStyles.fontFamily }}>{props.text ? props.text : 'Outros' }</Subtitle>
      <Icon name="right-arrow" />
    </View>
  )
};