/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../src/App';
import BootSplash from "react-native-bootsplash";
import { render } from '@testing-library/react-native';

// Mock react-navigation
// MOCK RN SPLASH SCREEN

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn(),
  };
});

describe('<App />', () => {
  beforeEach(() => {
    (BootSplash.hide as jest.Mock).mockClear();
    jest.useFakeTimers();
    
  });
  
  it('renders correctly', () => {
    render(<App />);
  });
});
