import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../components/ExploreScreen/SearchBar';
import StockGrid from '../components/ExploreScreen/StockGrid';
import useStockTickers from '../hooks/useStockTickers';
import LoadingPlaceholder from '../components/common/LoadingPlaceholder';
import ErrorPlaceholder from '../components/common/ErrorPlaceholder';


const ExploreScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {data, isLoading, error, loadMore, isLoadingMoreTickers} =
    useStockTickers(searchTerm);

 const content = useMemo(() => {
    if (isLoading) {
      return <LoadingPlaceholder />;
    }

    if (error) {
      return <ErrorPlaceholder/>
    }

    return (
      <StockGrid
        onEndReached={loadMore}
        loadingMoreTickers={isLoadingMoreTickers}
        stockTickers={data}
      />
    );
  }, [isLoading, error, data, loadMore, isLoadingMoreTickers]);
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
       <View style={styles.separator} />
      </View>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     {content}
     <Text style={styles.devText}>Dev: Mohamed Raafat Abdelhamid</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181a27',
  },
  header: {
    marginTop: 10,
    backgroundColor: '#181a27',
  },
  separator: {
    height: 1, // Height of the line
    backgroundColor: '#333', // Light gray color for the separator
  },

  logo: {
    width: 100, // Set desired width
    marginStart: 10,
    height: 50, // Set desired height
    resizeMode: 'contain', // Prevent distortion
  },
  devText:{
    color:'#fff',
    marginVertical:10,
    textAlign:'center',

    }
});

export default ExploreScreen;
