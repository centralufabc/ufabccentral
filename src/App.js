import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

// Tabs
import HomeScreen from './view/Home';
// import MyTicketsScreen from './src/view/MyTickets';
// import ProfileScreen from './src/view/Profile';
// import SearchScreen from './src/view/Search';

const TabNavigator = createBottomTabNavigator({
  Menu: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Menu',
    }),
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Home',
    }),
  },
  Comunidade: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: 'Comunidade',
    }),
  },
});

const AppNavigator = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: () => ({
        title: 'Tabs',
        header: null,
        headerBackTitle: null,
      }),
    },
  },
  {
    initialRouteName: 'Tabs',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
