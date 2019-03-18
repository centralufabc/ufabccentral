import React, {Component} from 'react';
import { View, StyleSheet, ScroolView } from 'react-native';
import { Screen, GridRow } from '@shoutem/ui';
import commonStyles from './src/styles/commonStyles';
import NavigationBar from './src/components/NavigationBar';
import CardBus from './src/components/CardBus';
import CardAulas from './src/components/CardAulas';
import CardRU from './src/components/CardRU';
import Carousel, { Pagination } from 'react-native-snap-carousel';

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

  get pagination () {
    return (
        <Pagination
          dotsLength={itens.length}
          activeDotIndex={1}
          containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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
        { this.pagination }
      </Screen>
    );
  }
}