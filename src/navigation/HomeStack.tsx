// In App.js in a new project

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import ExploreScreen from '../screens/ExploreScreen';
import TickerDetailsScreen from '../screens/TickerDetailsScreen';
import { StockTicker } from '../api/polygon.ts/types';
import { StyleSheet, Text, View } from 'react-native';


type RootStackParamList = {
    ExploreScreen: undefined;
    TickerDetailsScreen: { stockTicker: StockTicker };
  };

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
    const CustomHeader = () => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ticker Details</Text>
        </View>
      );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={
            {
                headerShown:false
                ,headerTitle:'Explore'
            }
        } name="ExploreScreen" component={ExploreScreen} />
        <Stack.Screen
         name="TickerDetailsScreen"
         options={({ route }) => ({ title: route.params.stockTicker.ticker ,
            headerStyle: styles.headerSyle,
            headerTintColor: '#FFF',
         })}
         component={TickerDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default HomeStack;

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#1e202f', // Your header background color
      padding: 10,
      alignItems: 'center', // Center the title horizontally
    },
    headerTitle: {
      color: '#FFF', // Title color
      fontSize: 24,
      fontWeight: 'bold',
    },
    headerSyle:
    {
        backgroundColor: '#1e202f',
    }
  });
  