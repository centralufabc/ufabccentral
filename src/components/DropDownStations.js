import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

export default props => {
  return (
    <Dropdown
      label={props.origin ? 'Partida' : 'Destino'}
      value={props.value}
      data={props.stations}
      dropdownOffset={{ top: 16, left: 0 }}
      onChangeText={(value) => props.onChange(value)}
      itemCount={props.itemCount ? props.itemCount : 4}
    />
  );
};

