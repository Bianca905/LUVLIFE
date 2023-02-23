import { FlatList } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import {ScrollView, TouchableOpacity, Alert, Button, Linking, View, Text, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { REACT_APP_API_SERVER } from '../../redux/store'
import { Iattachment, IPurpose } from '../models'
import AppsStyle from '../AppsStyle/AppsStyle'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import VoiceTest from './VoiceTest'
import Sound from 'react-native-sound';

function PurposeAttachment() {
    const route = useRoute()
    //@ts-ignore
  const { id } = route.params
  const [purposeAttachments, setPurposeAttachments] = useState<Iattachment[]>();
  const [purpose, setPurpose] = useState<IPurpose>();

  const requestOption = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      purpose_id: id,
    }),
  };
  const requestOption2 = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      id: id,
    }),
  };
  useEffect(() => {
    const purposeAttachmentFetch = async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/core/getAttachmentBypurposeId`,
        requestOption,
      );
      const data = await res.json();
      setPurposeAttachments(data.result);
    };
    purposeAttachmentFetch();
  }, []);
  useEffect(() => {
    const fetchPurpose = async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/core/getPurposeByPurposeId`,
        requestOption2,
      );
      const data = await res.json();
      // console.log(id)
      setPurpose(data.result[0]);
      console.log("frontend check purpose", data.result[0])
      console.log("check purpose", purpose)
    };

    fetchPurpose();
  }, []);

  const purposeAttachmentShunt = (props: any) => {
    console.log(`check imageFile_name`, props.imageFile_name)
    let link;
    if (props.imageFile_name) {
      link = props.imageFile_name.split("image/")[1];
    }
   

    if (props.type == "image") {
      return  <View style={style.attachmentView}>
                  <Text style={style.imageName}>{props.image_name}</Text>
                  <View style={style.imageContainer}>
                      <Image style={style.image} source={{uri: `${REACT_APP_API_SERVER}/${link}`} }/>
                      {/* <Text style={style.imageName}>{link}</Text> */}
                  </View>
                  <View style={{ marginVertical: 30, alignSelf: "center", width: "80%", height: 1, backgroundColor: 'black' }} />
                  {/* <Image style={style.image} source={{uri: 'https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg'} }/> */}
              </View>
    } if (props.type == "weblink") {
      return  <View>
                {/* <Text style={style.weblink}>{props.weblink_url}</Text> */}
                {/* <LinkPreview textContainerStyle={{color:"#000000"}} renderImage={((PreviewDataImage) => <Image style={style.image} source={{uri : `${PreviewDataImage}`}} />)}  text= {`This link ${props.weblink_url} can be extracted from the text`} /> */}
                <LinkPreview containerStyle={style.previewContainer}
                  // textContainerStyle={style.weblink}
                  enableAnimation
                  // text="https://google.com"
                  text={props.weblink_url}
                  // text='https://flyer.chat' 
                />
                <View style={{ marginVertical: 30, alignSelf: "center", width: "80%", height: 1, backgroundColor: 'black' }} />
                
                <LinkPreview containerStyle={style.previewContainer}
                  enableAnimation
                  text='github.com/flyerhq'
                />
                <View style={{ marginVertical: 30, alignSelf: "center", width: "80%", height: 1, backgroundColor: 'black' }} />
                
                
                
                
                
                  {/* <View style={style.container}>
                      <Text style={{fontSize: 15, color: "#000000",}}>{processing ? 'Processing the initial url from a deep link'
                          : `The deep link is: ${initialUrl || 'None'}`}
                      </Text> */}
                      {/* <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton> */}
                      {/* <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton> */}
                  {/* </View> */}
              </View>
    } if (props.type == "location") {
      return  <View>
                  <Text style={style.location}>{props.location_address}</Text>
              </View>
    // } if (props.type == "voice") {
    //   return <VoiceTest key={props.voice_name} title={props.voice_name} url={`${REACT_APP_API_SERVER}/${props.audioFile_name}`} />;
      //<View>
      //    <Text style={style.voiceName}>{props.voice_name}</Text>
      //</View>
    }
  }
  return (
    <AppsStyle title={`${purpose?.title}`}>
      <FlatList data={purposeAttachments} keyExtractor={item => `${item.id}`} renderItem={({item}) => <>{
        purposeAttachmentShunt(item)
      }</>}></FlatList>
      </AppsStyle>
  )
}


const style = StyleSheet.create({
  imageContainer: {
    borderWidth: 2,
    width: "90%",
    height:300,
  },
  attachmentView: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  // contentContainer: {
  //   paddingHorizontal: 24,
  // },
  previewContainer: {
    backgroundColor: '#000000',
    // color: "#000000",
    borderRadius: 20,
    marginTop: 16,
    overflow: 'hidden',
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  voiceName: {
    fontSize: 15,
    color: '#000000',
  },
  location: {
    fontSize: 15,
    color: '#000000',
  },
  weblink: {
    // fontSize: 15,
    color: '#000000',
  },
  imageName: {
    fontSize: 20,
    color: '#000000',
  },
  image: {
    backgroundColor: "#000000",
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 20,
    color: '#000000',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    scrollContainer: {
    backgroundColor: "#000000"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(111,111,111,1)',
  },
  button: {
    fontSize: 20,
    backgroundColor: 'rgba(000,000,000,1)',
    // backgroundColor: 'rgba(220,220,220,1)',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(80,80,80,0.5)',
    overflow: 'hidden',
    padding: 7,
  },
  header: {
    textAlign: 'left',
  },
  feature: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgb(180,180,180)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(230,230,230)',
  },
});

export default PurposeAttachment