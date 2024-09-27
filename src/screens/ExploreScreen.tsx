import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import SearchBar from '../components/ExploreScreen/SearchBar';
import StockGrid from '../components/ExploreScreen/StockGrid';
import { useGetStockTickersQuery, useLazyLoadMoreTickersQuery } from '../api/polygon.ts/api';
import { StockTicker } from '../api/polygon.ts/types';
import useStockTickers from '../hooks/useStockTickers';

const ExploreScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, error, loadMore, isLoadingMoreTickers } = useStockTickers(searchTerm);



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>N Nasdaq</Text>
      </View>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StockGrid onEndReached={loadMore} loadingMoreTickers={isLoadingMoreTickers} stockTickers={data} />
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e202f',
  },
  header: {
    padding: 10,
  },
  logo: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ExploreScreen;