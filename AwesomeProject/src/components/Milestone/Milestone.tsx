import { REACT_APP_API } from '@env'
import { useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Purpose } from '../../redux/GoalItem/thunk'
import { REACT_APP_API_SERVER } from '../../redux/store'
import AppsStyle from '../AppsStyle/AppsStyle'
import { Imilestone } from '../models'

function Milestone() {
    const route = useRoute();
    //@ts-ignore
    const { id } = route.params
    // console.log("check milestone id", id)
    const [milestoneList, setMilestoneList] = useState<Imilestone[]>()
    const [purpose, setPurpose] = useState<Purpose>()
    
    const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            purpose_id: id
        })
    }
    const requestOption2 = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id
        })
    }
    useEffect(()=>{
        const fetchPurpose = async () => {
            const res = fetch(`${REACT_APP_API_SERVER}/core/getPurposeByPurposeId`, requestOption2)
            const data = await (await res).json()
            // console.log(id)
            setPurpose(data.result[0])
            // console.log("frontend check purpose", data.result)
            // console.log("check purpose", purpose)
        }
        
        fetchPurpose()
    }, [])
    
    useEffect(() => {
        const fetchMilestone = async () => {
            
            const res = await fetch(`${REACT_APP_API_SERVER}/core/getMilestone`, requestOption)
            const data = await res.json()
            // console.log("check milestone data", data)
            setMilestoneList(data.result)
        }
        fetchMilestone();
    }, [])
    console.log("frontend check purpose title!!!!", typeof purpose?.title)
    const [purposeTitle, setPurposeTitle] = useState(`${purpose?.title}`)
    console.log(purposeTitle)
     return (
         <AppsStyle title={purpose?.title}>
             <View style={style.purpose}>
                 <TextInput style={style.purposeTitleInput} onChangeText={setPurposeTitle} value={purposeTitle} placeholder={purpose?.title}></TextInput>
                 <Text style={style.text}>Start date and time:</Text>
                 <View style={style.timeDaateView}>
                     <View style={style.boxStyle}>
                        <Text style={style.timeDateText}>{moment(purpose?.start_date).format("YYYY-MM-DD")}</Text>
                     </View>
                     <View style={style.boxStyle}>
                        <Text style={style.timeDateText}>{(purpose?.start_time)}</Text>
                     </View>
                 </View>
                 <Text style={style.text}>Due date and time:</Text>
                 <View style={style.timeDaateView}>
                     <View style={style.boxStyle}>
                        <Text style={style.timeDateText}>{moment(purpose?.due_date).format("YYYY-MM-DD")}</Text>
                    </View>
                     <View style={style.boxStyle}>
                        <Text style={style.timeDateText}>{purpose?.due_time}</Text>
                    </View>
                 </View>
                 <View style={style.descriptionView}>
                     <Text style={style.descriptionText}>{purpose?.description}</Text>
                 </View>
             </View>

             <View style={{ marginVertical: 30, alignSelf: "center", width: "80%", height: 1, backgroundColor: 'black' }} />
             
             <FlatList data={milestoneList} keyExtractor={item => `${item.id}`} renderItem={({ item }) => <>{
                 <View style={style.purpose}>
                        <View>
                            <Text  style={style.purposeTitleInput}>{item.title}</Text>
                        </View>
                        <Text style={style.text}>Start date and time:</Text>
                    <View style={style.timeDaateView}>
                        <View style={style.boxStyle}>
                           <Text style={style.timeDateText}>{moment(item.start_date).format("YYYY-MM-DD")}</Text>
                        </View>
                        <View style={style.boxStyle}>
                           <Text style={style.timeDateText}>{(item.start_time)}</Text>
                        </View>
                    </View>
                    <Text style={style.text}>Due date and time:</Text>
                    <View style={style.timeDaateView}>
                        <View style={style.boxStyle}>
                           <Text style={style.timeDateText}>{moment(item.due_date).format("YYYY-MM-DD")}</Text>
                       </View>
                        <View style={style.boxStyle}>
                           <Text style={style.timeDateText}>{item.due_time}</Text>
                       </View>
                    </View>
                    <View style={style.descriptionView}>
                        <Text style={style.descriptionText}>{item.description}</Text>
                    </View>
                 </View>
                 
             }</>}>
                 
             </FlatList>
        </AppsStyle>
  )
}

const style = StyleSheet.create({
    descriptionView: {
        width: "80%",
        backgroundColor: "#D2DAFF",
        borderRadius: 10,
        height: 100,
        maxHeight: 300,
        borderWidth: 1,
    },
    descriptionText: {
        fontSize: 15,
        color: "#000000",
    },
    boxStyle: {
        padding: 5,
        borderWidth: 1,//
        elevation: 1,
        shadowColor: "#D2DAFF",
        backgroundColor: "#D2DAFF",
        borderRadius: 10,
    },
    timeDaateView: {
        flexDirection: "row", 
        justifyContent: "space-around",
        // borderWidth: 1,//
        width: "70%",
        margin: 10,
    },
    timeDateText: {
        fontSize: 18,
        color: "#000000",
    },
    purposeTitleInput: {
        color: "#000000",
        textDecorationLine: "underline",
        maxWidth: "50%",
        alignSelf: "center",
        height: 50,
        margin: 12,
        // borderWidth: 1,//
        padding: 10,
        elevation: 1,
        shadowColor: "#D2DAFF",
        fontSize: 25,
    },
    text: {
        fontSize: 20,
        color: "#000000",
    },
    purpose: {
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Milestone