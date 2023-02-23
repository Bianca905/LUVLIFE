import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { REACT_APP_API_SERVER } from '../../redux/store'
import { Iattachment } from '../models'

function MilestoneAttachment(props: any) {
  const [milestoneAttachment, setMilestoneAttachment] =useState<Iattachment>()
  const route = useRoute()
  //@ts-ignore
  const { id } = route.params;
  console.log("check milestone id ~~", id)
  useEffect(() => {
    const milestoneAttachmentFetch = async () => {
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          milestone_id: id
        })
      }
      const res = await fetch(`${REACT_APP_API_SERVER}/core/getAttachmentByMilestoneId`, requestOption)
      const data = await res.json();
      setMilestoneAttachment(data.result)
    }
    milestoneAttachmentFetch();
  }, [])
  
  function ImageAttachment() {
    return (
      <View>
        <Image style={style.image} source={props.id} />
      </View>
    )
  }


  return (
    <>{
      <View></View>
    }</>
      
  )
}

const style = StyleSheet.create({
  image: {
    width: 100,
    height:100,
  },
})

export default MilestoneAttachment