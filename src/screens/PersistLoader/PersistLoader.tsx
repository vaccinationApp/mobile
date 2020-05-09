import React from 'react';
import { View, Text , ActivityIndicator, StyleSheet } from 'react-native';

class PersistLoader extends React.Component {
  public render() {
    return (
      <View style={styles.container}>
      <ActivityIndicator size={'large'} color={'grey'} />
      <Text style={styles.title}>Loading...</Text>
    </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 20,
    backgroundColor:'red'
  },
  title: {
    color: 'black',
    marginTop: 10
  }
});

export default PersistLoader;
