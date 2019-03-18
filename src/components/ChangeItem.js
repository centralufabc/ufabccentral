import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Icon } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default props => {
  return (
    <View style={{ flexDirection: 'row' }}>
        <Icon name="left-arrow" />
        <Text style={{ fontFamily: commonStyles.fontFamily, paddingTop: 4 }}>{props.text ? props.text : 'Outros' }</Text>
        <Icon name="right-arrow" />
    </View>
  )
};