import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

function LoadingPlaceholder() {
  return (
    <View style={styles.container}>
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
   <ActivityIndicator testID='loading-indicator' style={{margin:30}} size={'large'} color={'#fff'} ></ActivityIndicator>
   </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#181a27',
    },
   
  });
export default LoadingPlaceholder