import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { DropDownMenu } from '@shoutem/ui';

export default class DropDownStations extends Component {
  constructor(props){
    super(props);
    this.state = {
      stations: [
        {
          station: "Santo André",
        },
        {
          station: "São Bernardo",
        },
        {
          station: "Term. Leste",
        },
        {
          station: "Praça dos Expedicionários",
        },
        {
          station: "Term. SBC",
        },
      ],
    }
  }

  render() {
    return (
      <DropDownMenu
        styleName="horizontal"
        options={this.state.stations}
        selectedOption={this.state.selectedStation ? this.state.selectedStation : this.state.stations[0]}
        onOptionSelected={(station) => {
          this.setState({ selectedStation : station })
          this.props.onSelectedStation(station.station)
        }}
        titleProperty="station"
        valueProperty="stations.station"
        style={styles.dropDown}
      />
    )
  }
}

const styles = StyleSheet.create({
  dropDown: {
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 100,
  },
});