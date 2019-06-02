import React, { Component } from 'react';
import { StyleSheet, View, Image, Linking, TouchableOpacity } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import {
  Title,
  Subtitle,
} from '@shoutem/ui';
import commonStyles from '../styles/commonStyles';
import { amplitude } from '../../App';

export default class CardDevs extends Component {
  openEnactus = () => {
    amplitude.logEvent('click_enactus');
    Linking.canOpenURL('https://www.facebook.com/enactus.ufabc/').then(() => {
      Linking.openURL('https://www.facebook.com/enactus.ufabc/');
    });
  }

  openKleversonNascimento = () => {
    amplitude.logEvent('click_kleverson_nascimento');
    Linking.canOpenURL('https://www.facebook.com/kleverson.nascimento.1').then(() => {
      Linking.openURL('https://www.facebook.com/kleverson.nascimento.1');
    });
  }

  openRodrigoMayer = () => {
    amplitude.logEvent('click_rodrigo_mayer');
    Linking.canOpenURL('https://www.facebook.com/rodrigo98rm').then(() => {
      Linking.openURL('https://www.facebook.com/rodrigo98rm');
    });
  }

  render() {
    return (
      <ElevatedView
        elevation={5}
        style={styles.stayElevated}
      >
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Title style={styles.title}>Sobre o app</Title>
          <Subtitle style={styles.nameItem}>Atual responsável</Subtitle>
          <TouchableOpacity onPress={this.openEnactus} style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
            <Subtitle style={styles.text}>Enactus UFABC</Subtitle>
            <Image
              style={{ width: 80, height: 80, marginBottom: 5 }}
              source={{ uri: 'https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.0-9/21106657_1492724324148329_4224785852189036849_n.png?_nc_cat=111&_nc_oc=AQksqPEjOro6fqGn5vqbaPJ3TKIHjaG6AciJVrucJUaAH3q8cAMd0QfzuAP3ZLQGm1k&_nc_ht=scontent.fcgh3-1.fna&oh=a98cbd27623ae54179b709b862fd6a9c&oe=5D86C99B' }}
            />
          </TouchableOpacity>
          <Subtitle style={styles.nameItem}>Fundadores</Subtitle>
          <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={this.openKleversonNascimento} style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
              <Subtitle style={styles.text}>Kleverson N.</Subtitle>
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: 'https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.0-9/10690096_683614748426461_4741099997787533573_n.jpg?_nc_cat=106&_nc_oc=AQmDeFwlPP_tvgYAK8SpSxw5ozxcQBDe-IBLu7FNCQ33Tw9BIrtHsKhtd5iHX9xw_es&_nc_ht=scontent.fcgh3-1.fna&oh=9d8e799794e99e482d7b947c7a5163bc&oe=5D5E6450' }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.openRodrigoMayer} style={{ justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
              <Subtitle style={styles.text}>Rodrigo Mayer</Subtitle>
              <Image
                style={{ width: 80, height: 80 }}
                source={{ uri: 'https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.0-9/37033816_1871461579578277_4497649684621295616_n.jpg?_nc_cat=102&_nc_oc=AQm6BZ7GD7LfTN1Jq5LyzN8VZUEMtezOj9AzaWRD8e8B1aVOx7iXKqIMw2Gc-sCMb8k&_nc_ht=scontent.fcgh3-1.fna&oh=cab2dcb7a66774020814e0ecfeb68f31&oe=5D8AFCD9' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ElevatedView>
    );
  }
}

const styles = StyleSheet.create({
  stayElevated: {
    height: '90%',
    overflow: 'scroll',
    width: '100%',
    backgroundColor: 'white',
  },
  title: {
    paddingTop: 5,
    color: commonStyles.colors.principal,
  },
  nameItem: {
    marginTop: 5,
    color: commonStyles.colors.black,
  },
  text: {
    paddingBottom: 5,
    color: commonStyles.colors.principal,
  },
});
