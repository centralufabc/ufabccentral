import React, {Component} from 'react';
import { View, StyleSheet, ScroolView } from 'react-native';
import { Screen, GridRow } from '@shoutem/ui';
import commonStyles from './src/styles/commonStyles';
import NavigationBar from './src/components/NavigationBar';
import CardBus from './src/components/CardBus';
import CardAulas from './src/components/CardAulas';
import CardRU from './src/components/CardRU';
import Carousel from 'react-native-snap-carousel';

const itens = [
  1,
  2,
  3,
];

export default class App extends Component {
  _renderItem ({item, index}) {
    return (
        <CardBus />
    );
}

  render() {
    return (
      <Screen>
        <NavigationBar />
        <View style={{ height: 5 }} />
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={itens}
              renderItem={this._renderItem}
              sliderWidth={350}
              itemWidth={350}
            />
      </Screen>
    );
  }
}