// src/components/ExploreScreen/StockItem.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StockTicker } from '../../api/polygon.ts/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/navigation';
type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Explore'>;


interface StockItemProps {
    stockTicker:StockTicker
}
const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; 

const StockItem: React.FC<StockItemProps> = ({  stockTicker }) => {

const navigation = useNavigation<ProfileScreenNavigationProp>();


const handlePress = () => {
  navigation.navigate('TickerDetailsScreen', { stockTicker });
}

 
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{stockTicker?.ticker}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.symbol}>{stockTicker?.ticker}</Text>
        <Text numberOfLines={1} style={styles.name}>{stockTicker?.name}</Text>
        <Text style={styles.pressableText}>Click for more Info</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {

    width: itemWidth,
    aspectRatio: 1,marginRight: 16,
    backgroundColor: '#232639',
    borderRadius: 12,
    padding: 16,

    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 60,
    height:60,
    borderRadius: 10,
    paddingHorizontal:5,
    backgroundColor: '#232639',
    borderColor: '#FFF',
    borderWidth:0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 5  ,
  },
  logoText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },
  symbol: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  name: {
    color: '#aeb1c4',
    fontSize: 12,
    textAlign: 'center',
  },
  pressableText:
  { marginTop:10,
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center'
  }

});

export default StockItem;
