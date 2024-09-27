import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Image, StatusBar } from 'react-native';
import SearchBar from '../components/ExploreScreen/SearchBar';
import StockGrid from '../components/ExploreScreen/StockGrid';
import useStockTickers from '../hooks/useStockTickers';



const ExploreScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isLoading, error, loadMore, isLoadingMoreTickers } = useStockTickers(searchTerm);

    const Separator: React.FC = () => {
      return <View style={styles.separator} />;
    };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
      <Image style={styles.logo} source={require('../assets/logo.png')}  />
  <Separator />
      </View>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <StockGrid onEndReached={loadMore} loadingMoreTickers={isLoadingMoreTickers} stockTickers={data} />
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181a27',
  },
  header: {
    padding: 0,
    backgroundColor: '#181a27',
  },separator: {
    height: 1,              // Height of the line
    backgroundColor: '#333', // Light gray color for the separator

  },
  
  logo:{ width: 100, // Set desired width
    marginStart:10,
  height: 50, // Set desired height
  resizeMode: 'contain', // Prevent distortion
}
});

export default ExploreScreen;