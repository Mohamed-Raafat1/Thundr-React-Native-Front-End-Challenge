// src/components/ExploreScreen/StockList.tsx
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import StockItem from './StockItem';
import { StockTicker } from '../../api/polygon.ts/types';


interface StockListProps {
  stockTickers?:StockTicker[]
  onEndReached: () => void
  loadingMoreTickers:boolean
  }


const StockList: React.FC<StockListProps> = ({stockTickers,onEndReached,loadingMoreTickers}) => {

  return (
    <FlatList
      data={stockTickers}
      numColumns={2}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.9}
      ListFooterComponent={loadingMoreTickers ? <ActivityIndicator size='large' color="white" /> : null}
      renderItem={({ item }) => (
        <StockItem
            stockTicker={item} 
        />
      )}
      keyExtractor={(item) => item.ticker}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
  },
});

export default StockList;
