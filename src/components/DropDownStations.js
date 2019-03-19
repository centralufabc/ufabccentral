import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { max } from 'moment';

export default class DropDownStations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [
        {
          value: 'Santo André',
        },
        {
          value: 'São Bernardo',
        },
        {
          value: 'Term. Leste',
        },
        {
          value: 'Praça dos Expedicionários',
        },
        {
          value: 'Term. SBC',
        },
      ],
    };
  }

  render() {
    return (
      <Dropdown
        label={this.props.origin ? 'Partida' : 'Destino'}
        value={this.props.value}
        data={this.state.stations}
        dropdownOffset={{ top: 16, left: 0 }}
      />
    );
  }
}
