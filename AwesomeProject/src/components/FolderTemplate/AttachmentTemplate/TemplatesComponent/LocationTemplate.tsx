import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function LocationTemplate() {
  return (
    <View><Text style={styles.test}>Location test</Text></View>
  )
}

const styles = StyleSheet.create({
  test: {color: "#000000", fontSize: 20},
})

export default LocationTemplate