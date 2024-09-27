/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,


  StyleSheet,

  useColorScheme,

} from 'react-native';
import SearchBar from './components/ExploreScreen/SearchBar';
import ExploreScreen from './screens/ExploreScreen';
import { Provider } from 'react-redux';
import { store } from './store';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  return (

    <Provider store={store}>
    <ExploreScreen />
  </Provider>

  );
}



export default App;
