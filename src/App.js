import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

// Tabs
import HomeScreen from './view/Home';
import MenuScreen from './view/Menu';

// Telas
import Informacoes from './view/Informacoes';
// import MyTicketsScreen from './src/view/MyTickets';
// import ProfileScreen from './src/view/Profile';
// import SearchScreen from './src/view/Search';

const TabNavigator = createBottomTabNavigator({
  Menu: {
    screen: MenuScreen,
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
}, {
  initialRouteName: 'Home',
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
    Informacoes: {
      screen: Informacoes,
      navigationOptions: () => ({
        title: 'Outras Informações',
      }),
    },
  },
  {
    initialRouteName: 'Tabs',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0d593b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '600',
      },
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
