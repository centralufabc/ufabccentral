import React from 'react';
import { SafeAreaView } from 'react-native';
import OutrasInformacoes from '../components/OutrasInformacoes';
import Header from '../components/Header';

export default class Informacoes extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Header headerText={'Outras Informações'} />
        <OutrasInformacoes />
      </SafeAreaView>
    );
  }
}
