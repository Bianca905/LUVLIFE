import React from 'react'
import {faPlus } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { NavigationProp } from '@react-navigation/native';

function AddItem({}) {
    return (
        
        <TouchableOpacity 
        onPress={() => navigation.navigate('Folder')} style={styles.controlBtns}><FontAwesomeIcon icon={faPlus} style={styles.favouriteBtn} size={30} /></TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    favouriteBtn: {color: "#ffffff"},
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 70, height: 70,
    borderRadius:50 , alignItems: "center", justifyContent: "center", margin: 10},
  })

export default AddItem