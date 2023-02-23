import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'

function ToggleBtn() {
  return (
    <TouchableOpacity style={styles.attachmentGrp} >
        <IconButton icon="plus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
        <Text style={{ color: "#000000" }}>Add attachment</Text>
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    attachmentGrp:{flexDirection:'row', alignItems:"center", justifyContent:"flex-start", marginRight:"60%"},
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 25, height: 25,
        borderRadius: 50,  margin: 10, justifyContent: "center", alignItems: "center",
    },
})

export default ToggleBtn