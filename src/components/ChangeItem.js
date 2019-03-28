import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { Icon, Subtitle } from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';

export default props => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={props.last}>
        {props.isFirst ? [] : <Icon name="left-arrow" />}
      </TouchableOpacity>
      <Subtitle>{props.text ? props.text : 'Outros' }</Subtitle>
      <TouchableOpacity onPress={props.next}>
        {props.isLast ? [] : <Icon name="right-arrow" />}
      </TouchableOpacity>
    </View>
  )
};