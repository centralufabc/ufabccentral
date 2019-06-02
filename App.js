import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { Screen } from '@shoutem/ui';
import RNAmplitude from 'react-native-amplitude-analytics';
import commonStyles from './src/styles/commonStyles';
import NavigationBar from './src/components/NavigationBar';
import CardBus from './src/cards/CardBus';
import CardAulas from './src/cards/CardAulas';
import CardRU from './src/cards/CardRU';
import CardCalendar from './src/cards/CardCalendar';
import CardDevs from './src/cards/CardDevs';

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(80);
export const amplitude = new RNAmplitude('ad38650f9d155ae97eb6dd7846d01ded', true);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth;

const cards = [
  <CardDevs />,
  <CardBus />,
  <CardAulas />,
  <CardRU />,
  <CardCalendar />,
];

export default class App extends Component {
  state = {
    index: 2,
  }

  _renderItem = ({ index }) => cards[index];

  get pagination () {
    return (
      <Pagination
        dotsLength={cards.length}
        activeDotIndex={this.state.index}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  componentWillMount() {
    amplitude.logEvent('open_app');
  }

  changePage = (index) =>  {
    const namePages = ['devs', 'bus', 'aulas', 'ru', 'calendar'];
    amplitude.logEvent(`${namePages[index]}_page_viewed`);
    this.setState({ index });
  }

  render() {
    return (
      <Screen style={{ backgroundColor: commonStyles.colors.principal }}>
        <NavigationBar />
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={cards}
          onSnapToItem={(index) => this.changePage(index)}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          activeSlideAlignment={'center'}
          layout={'default'}
          firstItem={2}
        />
        { this.pagination }
      </Screen>
    );
  }
}
