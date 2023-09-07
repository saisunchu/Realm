import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Demo2 from './Demo2';

const Welcome = ({navigation}) => {
  const Demo1 = () => {
    navigation.navigate('Demo1');
  };

  const Demo2 = () => {
    navigation.navigate('Demo2');
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={Demo1}>
        <Text style={styles.buttonText}>Demo1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={Demo2}>
        <Text style={styles.buttonText}>Demo2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome;
