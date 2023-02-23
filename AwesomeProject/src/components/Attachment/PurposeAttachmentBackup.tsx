import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-navigation';
import {REACT_APP_API_SERVER} from '../../redux/store';
import AppsStyle from '../AppsStyle/AppsStyle';
import {Iattachment} from '../models';
import {Purpose} from '../../redux/GoalItem/thunk';

function PurposeAttachment() {
  const route = useRoute();
  const [purposeAttachments, setPurposeAttachments] = useState<Iattachment[]>();
  const [purpose, setPurpose] = useState<Purpose>();
  //@ts-ignore
  const {id} = route.params;
  const requestOption2 = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      purpose_id: id,
    }),
  };
  const requestOption = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      purpose_id: id,
    }),
  };
  useEffect(() => {
    const fetchPurpose = async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/core/getPurposeByPurposeId`,
        requestOption2,
      );
      const data = await res.json();
      // console.log(id)
      setPurpose(data.result[0]);
      // console.log("frontend check purpose", data.result)
      // console.log("check purpose", purpose)
    };

    fetchPurpose();
  }, []);
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
  function AttachmentShunt() {
      for (const purposeAttachment of purposeAttachments!) {
          if (purposeAttachment?.type == "image") {
              return (
                  <View>
                      <Text style={style.imageName}>{purposeAttachment.image_name}</Text>
                      <Image style={style.image} source={{uri: `data:${purposeAttachment.imageFile_name}`} }/>
                  </View>
              )
          }
          else if (purposeAttachment?.type == "weblink") {
              return (
                  <View>
                      <Text style={style.weblink}>{purposeAttachment.weblink_url}</Text>
                  </View>
              )
          }
          else if (purposeAttachment?.type == "location") {
              return (
                  <View>
                      <Text style={style.location}>{purposeAttachment.location_address}</Text>
                  </View>
              )
          }
          else if (purposeAttachment?.type == "voice") {
              <View>
                  <Text style={style.voiceName}>{purposeAttachment.voice_name}</Text>
              </View>
          }
          return <View></View>
      }

  }
  return (
    <AppsStyle title={purpose?.title}>
      {/* <Text style={style.attachmentTitle}>{purposeAttachments?.title}</Text> */}
      <FlatList
        data={purposeAttachments}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <>
            {
              item.type == 'image' ? <Text>hi image</Text> : <></>
              ||
              item.type == "weblink" ? <Text>hi image</Text> : <></>||
              item.type == "location" ? <Text>hi image</Text> : <></>||
              item.type == "voice" ? <Text>hi image</Text>: <></>
            }
          </>
        )}></FlatList>
    </AppsStyle>
  );
}

const style = StyleSheet.create({
  voiceName: {
    fontSize: 15,
    color: '#000000',
  },
  location: {
    fontSize: 15,
    color: '#000000',
  },
  weblink: {
    fontSize: 15,
    color: '#000000',
  },
  imageName: {
    fontSize: 15,
    color: '#000000',
  },
  image: {
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 20,
    color: '#000000',
  },
});

export default PurposeAttachment;
