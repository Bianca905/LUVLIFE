import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function AppsStyle(props: React.PropsWithChildren<{title: any}>) {
  return (
    // <View>
      <>
        <View style={styles.appHeader}><Text style={styles.appHeaderText}>{props.title}</Text></View>
        {props.children}
      </>  
    // </View>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    // flex: 0.1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#D2DAFF',
    backgroundColor: '#263159',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  appHeaderText: {
    textAlign: 'center',
    color: '#D2DAFF',
    // color: '#263159',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
})


export default AppsStyle;
