import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useGetTickerDetailsQuery } from '../api/polygon.ts/api';
import { TickerDetailsResponse } from '../api/polygon.ts/types';
import { RootStackParamList } from '../navigation/navigation';

type TickerDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TickerDetailsScreen'>;

const TickerDetailsScreen: React.FC = () => {
  const route = useRoute<TickerDetailsScreenRouteProp>();
  const { stockTicker } = route.params;
  const ticker = stockTicker?.ticker;
  const { data: tickerDetails, isLoading, error } = useGetTickerDetailsQuery({ ticker });

  if (isLoading) {

    return <View style={styles.container}><ActivityIndicator style={{margin:30}} size={'large'} color={'#fff'} ></ActivityIndicator></View>;
  }

  // Handle error state
  if (error) {
    return <Text>Error fetching ticker details</Text>;
  }

  if (!tickerDetails || !tickerDetails.results) {
    return <Text>No details available for this ticker.</Text>;
  }

  // Ensure tickerDetails is typed correctly
  const {
    name,
    market_cap,
    address,
    phone_number,
    description,
  } = tickerDetails.results as TickerDetailsResponse['results'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>

      <Image source={{ uri: "https://placehold.co/600x600.png" }} style={styles.logo} />

      <Text style={styles.ticker}>{ticker}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.marketCap}>
        Market Cap: ${market_cap ? market_cap.toLocaleString() : "N/A"}
      </Text>
      {address && (
        <>
          <Text style={styles.addressTitle}>Address:</Text>
          <Text style={styles.address}>
            {address.address1}, {address.city}, {address.state} {address.postal_code}
          </Text>
        </>
      )}
      {phone_number && (
        <>
          <Text style={styles.phoneTitle}>Phone:</Text>
          <Text style={styles.phone}>{phone_number}</Text>
        </>
      )}
      {description && (
        <>
          <Text style={styles.descriptionTitle}>Description:</Text>
          <Text style={styles.description}>{description}</Text>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e202f',
    padding: 20,

  },
  scrollContainer: {
    flexGrow: 1, // Allows content to grow
    paddingBottom: 50, // Add padding to the bottom for better scrolling
  },
  logo: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,

    resizeMode: 'contain',
    marginBottom: 20,
  },
  ticker: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  name: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 10,
  },
  marketCap: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  address: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
  },
  phoneTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 22,
  },
});

export default TickerDetailsScreen;
