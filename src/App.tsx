

import React, { useEffect } from 'react';



import { Provider } from 'react-redux';
import { store } from './store';
import HomeStack from './navigation/HomeStack';
import BootSplash from "react-native-bootsplash";
import { StatusBar } from 'react-native';




function App(): React.JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });

    });
  }, []);


  return (

    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#181a27" />
   <HomeStack/>
  </Provider>

  );
}



export default App;
