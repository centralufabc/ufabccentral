import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import App from './../App';
import commonStyles from './styles/commonStyles'; 

const MenuRoutes = {
  Home: {
    name: 'Home',
    screen: App,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: () => <IconEntypo name='home' size={30} color={commonStyles.colors.principal} />
    },
  },
  Store: {
    name: 'Store',
    screen: App,
    navigationOptions: {
      title: 'Store',
      tabBarIcon: () => <IconMaterial name='store' size={30} color={commonStyles.colors.principal} />
    },
  },
  Menu: {
    name: 'Menu',
    screen: App,
    navigationOptions: {
      title: 'Menu',
      tabBarIcon: () => <IconEntypo name='menu' size={30} color={commonStyles.colors.principal} />
    },
  },
  Calendar: {
    name: 'Calendar',
    screen: App,
    navigationOptions: {
      title: 'Calendar',
      tabBarIcon: () => <IconEntypo name='calendar' size={30} color={commonStyles.colors.principal} />
    },
  },
  Profile: {
    name: 'Profile',
    screen: App,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: () => <IconMaterial name='face' size={30} color={commonStyles.colors.principal} />
    },
  },
};

const MenuConfig = {
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: false,
  },
};

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)
export default MenuNavigator;