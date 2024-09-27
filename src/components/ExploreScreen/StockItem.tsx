// src/components/ExploreScreen/StockItem.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { StockTicker } from '../../api/polygon.ts/types';



interface StockItemProps {
    stockTicker?:StockTicker
}
const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap between items (16)

const StockItem: React.FC<StockItemProps> = ({  stockTicker }) => {
 
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>{stockTicker?.ticker}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.symbol}>{stockTicker?.ticker}</Text>
        <Text numberOfLines={1} style={styles.name}>{stockTicker?.name}</Text>
      </View>
    </View>
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
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#232639',
    borderColor: '#FFF',
    borderWidth:0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
});

export default StockItem;
