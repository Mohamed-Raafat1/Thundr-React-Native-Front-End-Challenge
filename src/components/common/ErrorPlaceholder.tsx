import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';


const ErrorPlaceholder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/error-icon.png')} style={styles.icon} />
      <Text style={styles.errorMessage}>
        { "Oops! Rate limit has been reached."}
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#1e202f',
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ErrorPlaceholder;
