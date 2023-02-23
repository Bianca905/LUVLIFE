import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import LocationTemplate from './TemplatesComponent/LocationTemplate';
import MemoTemplate from './TemplatesComponent/MemoTemplate';
import VoiceRcTemplate from './TemplatesComponent/VoiceRcTemplate';
import WebLinkTemplate from './TemplatesComponent/WebLinkTemplate';

function AttachmentTemplate() {
    
    const [showMemo, setShowMemo] = useState(false);
    function toggleMemoPart() {
        
        setShowWebLink(false)
        setShowLocation(false)
        setShowVoiceRc(false)
        setShowMemo(!showMemo)
    }
    const [showWebLink, setShowWebLink] = useState(false);
    function toggleWebLinkPart() {
        
        setShowMemo(false)
        setShowLocation(false)
        setShowVoiceRc(false)
        setShowWebLink(!showWebLink)
    }
    const [showLocation, setShowLocation] = useState(false);
    function toggleLocationPart() {
        
        setShowMemo(false)
        setShowWebLink(false)
        setShowVoiceRc(false)
        setShowLocation(!showLocation)
    }
    const [showVoiceRc, setShowVoiceRc] = useState(false);
    function toggleVoiceRcPart() {
        
        setShowMemo(false)
        setShowWebLink(false)
        setShowLocation(false)
        setShowVoiceRc(!showVoiceRc)
    }
  //   function toggleRemainderSecondPart() {
  //     setShowRemainderSecondPart(!showRemainderSecondPart)
  // }
  function AttachmentGroup() {
    return <View style={styles.attachmentView}>
    <View style={styles.attachmentTemplateContainer}>
      <TouchableOpacity style={styles.attachmentPlan} onPress={toggleMemoPart}>
        <View style={styles.attachmentPlanHeader}></View>
        <View style={styles.attachmentPlanBody}>
          <Text style={styles.attachmentPlanName}>Image</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.attachmentPlan} onPress={toggleWebLinkPart}>
        <View style={styles.attachmentPlanHeader}></View>
        <View style={styles.attachmentPlanBody}>
          <Text style={styles.attachmentPlanName}>Web Link</Text>
        </View>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.attachmentPlan} onPress={toggleLocationPart}>
        <View style={styles.attachmentPlanHeader}></View>
        <View style={styles.attachmentPlanBody}>
          <Text style={styles.attachmentPlanName}>Location</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.attachmentPlan} onPress={toggleVoiceRcPart}>
        <View style={styles.attachmentPlanHeader}></View>
        <View style={styles.attachmentPlanBody}>
          <Text style={styles.attachmentPlanName}>Voice Rc</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  </View>
  
  }
    return (
      <>
        {<AttachmentGroup />}
        { showMemo&&<MemoTemplate /> || showWebLink&&<WebLinkTemplate /> || showLocation&&<LocationTemplate /> || showVoiceRc&&<VoiceRcTemplate />}
    {/* <TouchableOpacity style={styles.attachmentGrp} onPress={()=><AttachmentGroup />}>
        <IconButton icon="plus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
        <Text style={{ color: "#000000" }}>Add attachment</Text>
        </TouchableOpacity> */}

    </>
  );
}

const styles = StyleSheet.create({
  attachmentView: {justifyContent: 'center', alignItems: 'center',marginTop:10,},
  attachmentTemplateContainer: {
    width: '70%',
    height: 120,
    backgroundColor: '#AAC4FF',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  attachmentPlan: {width: 90, height: '70%', borderRadius: 10},
  attachmentPlanHeader: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#495579',
  },
  attachmentPlanBody: {
    flex: 4,
    backgroundColor: '#6F83C2',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  attachmentPlanName: { color: '#FFFBEB', fontSize: 15 },
  attachmentGrp:{flexDirection:'row', alignItems:"center", justifyContent:"flex-start", marginRight:"60%"},
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 25, height: 25,
        borderRadius: 50,  margin: 10, justifyContent: "center", alignItems: "center",
    },
});

export default AttachmentTemplate;
