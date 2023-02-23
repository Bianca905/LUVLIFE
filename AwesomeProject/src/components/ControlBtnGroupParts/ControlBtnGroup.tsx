import { faHeart,  } from '@fortawesome/free-regular-svg-icons';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddItem from './AddItem';
import { Header } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

function ControlBtnGroup() {
  return (
    <View style={styles.allBtnView}>
        <TouchableOpacity style={styles.favouriteBtnView}>
          <FontAwesomeIcon icon={faHeart} style={styles.favouriteBtn} size={40} />
        </TouchableOpacity>
        <View style={styles.controlBtnsView}>
          <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faTrash} style={styles.favouriteBtn} size={30} /></TouchableOpacity>
          <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faPen} style={styles.favouriteBtn} size={30} /></TouchableOpacity>

          
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
    allBtnView: {
        flex: 0.1, /*borderColor: "#1eff00", borderWidth: 1,*/ justifyContent: "space-between",
        alignItems: "center", flexDirection: "row",
    },
    favouriteBtnView: {
      backgroundColor: "#000000", opacity: 0.7, width: 120, height: 70,
      borderRadius:10 , alignItems: "center", justifyContent: "center", marginLeft:30,
    },
    favouriteBtn: {color: "#ffffff"},
    controlBtnsView: {flexDirection: "row", marginRight:30,},
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 70, height: 70,
    borderRadius:50 , alignItems: "center", justifyContent: "center", margin: 10},
  })

export default ControlBtnGroup