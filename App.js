import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Screen } from '@shoutem/ui';
import commonStyles from './src/styles/commonStyles';
import NavigationBar from './src/components/NavigationBar';
import CardBus from './src/components/CardBus';
import CardAulas from './src/components/CardAulas';
import CardRU from './src/components/CardRU';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const cards = [
  <CardBus />,
  <CardAulas />,
  <CardRU />,
];

export default class App extends Component {
  state = {
    index: 0,
  }
  _renderItem = ({ index }) => cards[index];

  get pagination () {
    return (
      <Pagination
        dotsLength={cards.length}
        activeDotIndex={this.state.index}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render() {
    return (
      <Screen style={{ backgroundColor: commonStyles.colors.principal }}>
        <NavigationBar />
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={cards}
          onSnapToItem={(index) => this.setState({ index })}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          activeSlideAlignment={'center'}
          layout={'default'}
          firstItem={1}
        />
        { this.pagination }
      </Screen>
    );
  }
}
