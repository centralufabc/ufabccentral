/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import 'react-native';
import React from 'react';
import App from '../App';

it('renders correctly', () => {
  renderer.create(<App />);
});
