import { faCalendar, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faHeart as Heart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useRoute } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from "react-native"
import { FlatList } from 'react-native-gesture-handler';
import { REACT_APP_API_SERVER } from '../../redux/store';
import AppsStyle from '../AppsStyle/AppsStyle';
import { IDailyFolder, IPurpose } from '../models';

//@ts-ignore
function Purpose({navigation}) {
    // console.log("hhihihihihih",props)
    // const idd = props.params?.id
    const route = useRoute()
    //@ts-ignore
    const { id } = route.params
    console.log("!!!!!!!!", id)
    const [purposeList, setPurposeList] = useState<IPurpose[]>()

    useEffect(() => {
        // console.log("!!!!",idd)
        const fetchPurpose = async () => {
            // const res2 = await fetch(`${REACT_APP_API_SERVER}/core/getFolder`)
            // const data2 = await res2.json()
            // setFolderId(data2.result)
            // console.log("check folder",data2.result.id);
            
            // console.log("check folderid",folderId);
            
            const requestOption = {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    folder_id: id
                })
            }
            const res = await fetch(`${REACT_APP_API_SERVER}/core/getPurpose`, requestOption)
            const data = await res.json();
            console.log("check purpose data",data)
            setPurposeList(data.result)
        }
        fetchPurpose();
    }, [])
    

    console.log("check purposeList",purposeList);
    
    return (
        <AppsStyle title="test">
            {/* <FlatList data={purposeList} renderItem={({ item }) => } keyExtractor={ }></FlatList> */}
            <FlatList data={purposeList} keyExtractor={item => `${item.id}`} renderItem={({ item }) => <>{
                item.type == "setGoal" ? 
                <View style={styles.touchBox}>
                    <View style={styles.typeBox}>
                        <FontAwesomeIcon icon={faCalendar} size={50} />
                    </View>
                    <View style={styles.contentBox}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.title}</Text>
                            <TouchableOpacity style={styles.heartBox}>
                                {item.is_favourite == true ? <FontAwesomeIcon icon={Heart} size={30} /> : <FontAwesomeIcon icon={faHeart} size={30} />}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate(("Milestone"), {id: item.id})}>
                            <View style={styles.dateTimeBox}>
                                <View style={styles.startBox}>
                                    <Text style={styles.mainText}>start date:{"\n"}{item.start_date}</Text>
                                    <Text style={styles.mainText}>start time:{"\n"}{item.start_time}</Text>
                                </View>
                                <View style={styles.dueBox}>
                                    <Text style={styles.mainText}>due date:{"\n"}{item.due_date}</Text>
                                    <Text style={styles.mainText}>due time:{"\n"}{item.due_time}</Text>
                                </View>
                            </View>
                            <View style={styles.descriptionBox}>
                                <Text style={styles.descriptionTitle}>Description: </Text>
                                <Text style={styles.descriptionText}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            : 
            <View style={styles.touchBox}>
            <View style={styles.typeBox}>
                <FontAwesomeIcon icon={faBagShopping} size={50} />
            </View>
            <View style={styles.contentBox}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity style={styles.heartBox}>
                        {item.is_favourite == true ? <FontAwesomeIcon icon={Heart} size={30} /> : <FontAwesomeIcon icon={faHeart} size={30} />}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate(("PurposeAttachment"), {id: item.id})}>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionTitle}>Description: </Text>
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
            }</>}>

            </FlatList>
            
        </AppsStyle>
  )
}

const styles = StyleSheet.create({
    touchBox: {
        marginTop: 30,
        width: "80%",
        height: 400,
        margin: 10,
        backgroundColor: "#AAC4FF",
        opacity: 0.5,
        borderRadius: 10,
        flexDirection: "row",
        borderWidth: 2,
        alignSelf: 'center',
    },
    typeBox: {
        flex: 1,
        borderRightWidth: 2,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: "#6F83C2",
        justifyContent: "center",
        alignItems: "center",
        opacity:0.8,
    },
    typeText: {
        fontSize: 20,
        color: "#000000",
    },
    contentBox: {
        flex: 8,
        flexDirection: "column",
    },
    titleBox: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 2,
        borderTopRightRadius: 8,
        backgroundColor: "#495579",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        flex: 6,
        fontSize: 30,
        color: "#000000",
        textDecorationLine: 'underline',
        textAlign: "center",
    },
    heartBox: {
        flex:1,
        alignSelf: "center",
    },
    mainBox: {
        flex: 6,
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
    },
    dateTimeBox: {
        width: "90%",
        // borderWidth: 1,
        justifyContent: "flex-start",
        alignContent: "flex-start",
        padding: 10,
    },
    mainText: {
        fontSize: 15,
        color: "#000000",
        // textDecorationLine:"underline",
    },
    startBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        margin: 5,
    },
    dueBox: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around',
        margin: 5,
    },
    descriptionBox: {
        margin: 10,
        width: "90%",
        // borderWidth: 1,
    },
    descriptionTitle: {
        fontSize: 20,
        color: "#000000",
    },
    descriptionText: {
        fontSize: 15,
        color: "#000000",
    },
    // touchBox: {},
})

export default Purpose