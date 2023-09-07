import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './src/Navigation'
import Demo1 from './src/Demo1'
import Demo2 from './src/Demo2'

const App = () => {
  return (
    <View style={{flex:1}} >
      {/* <Text>App Data</Text> */}
      <Navigation />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})