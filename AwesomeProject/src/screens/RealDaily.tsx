import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationProp, useIsFocused } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Text, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import AppsStyle from '../components/AppsStyle/AppsStyle';
import AddItem from '../components/ControlBtnGroupParts/AddItem';
import DailyFolders from '../components/DailyFolder/DailyFolders';
// import DailyFolder from '../components/DailyFolder/DailyFolders';
import SearchBar from '../components/DailyFolder/SearchBar';
import { IDailyFolder } from "../components/models"
import { REACT_APP_API_SERVER } from '../redux/store';

// type Props = {navigation: NavigationProp<{}>};

// @ts-ignore

function RealDaily({navigation}) {
  // const [folderList, setFolderList] = useState<Array<Object>>([
  //   <DailyFolders/>,
    
  // ]);

  // function updateFolderList() {
  //   setFolderList(currentFolderList => [...currentFolderList, DailyFolders]);
  // }

  const isFocused = useIsFocused();
  const [folderList, setFolderList] = useState<IDailyFolder[]>();
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_SERVER}/core/getFolder`);
        const data = await res.json();
        console.log(data.result);
        setFolderList(data.result);
      } catch (error) {
        console.log('error!', error);
      }
    };
    if (isFocused) {
      fetchFolder();
    }
  }, [isFocused]);
  console.log("folder check folder", folderList);
  
//   function pressHandler() {
//     navigation.navigate("Purpose")
//   }
  return (
    <AppsStyle title="Your Daily Folder">
      <SearchBar />
      
        <View style={styles.homePage}>
            {/* <Text style={styles.homePageText}>Home Page</Text> */}
            {/* <DailyFolder title='First folder' /> */}
            {/* {folderList.map(folder => (
            <>{folder}</>
            ))} */}
            {/* <DailyFolders onPress={pressHandler}/> */}
            <FlatList style={styles.flatList} numColumns={2} data={folderList} renderItem={({item}) =>
          <TouchableOpacity onPress={() =>
            // console.log(item.id)
            navigation.navigate("Purpose", { id: item.id })
          } style={styles.folder} key={item.id}>
                <View style={styles.folderHeader} >
                    <Text style={styles.folderHeaderTitle}>{item.name}</Text>
                </View>
                <View style={styles.foldermain}>
                  {/* <Text>{item.cover_image}</Text> */}
                  <Image
                    style={styles.cover_image}
                    source={{
                    uri: 'https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg'/*item.item.cover_image*/,
                    }}/>  
                </View>
              </TouchableOpacity>
            } keyExtractor={(item) => `${item.id}`}>
            </FlatList>
        </View>
      
      <View style={styles.allBtnView}>
        {/* <TouchableOpacity style={styles.favouriteBtnView}><FontAwesomeIcon icon={faHeart} style={styles.favouriteBtn} size={40} /></TouchableOpacity> */}
              {/* <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="heart" size={40}
              onPress={() => navigation.navigate('FolderTemplate')} /> */}
        <View style={styles.controlBtnsView}>
          {/* <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faTrash} style={styles.favouriteBtn} size={30} /></TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faPen} style={styles.favouriteBtn} size={30} /></TouchableOpacity> */}
          <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="trash-can" size={40}
              onPress={() => navigation.navigate('FolderTemplate')} />
          <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="pen" size={40}
              onPress={() => navigation.navigate('FolderTemplate')} />
          <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="plus" size={40}
              onPress={() => navigation.navigate('FolderTemplate')} />
          
        </View>
      </View>
          

      {/* <ControlBtnGroup /> */}
    </AppsStyle>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    flexDirection: 'column',
    // marginHorizontal: 30,
    // flexWrap: 'wrap',
    // justifyContent: "center", 
    alignItems: 'center',
    },
  // scrollView: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   },
    allBtnView: {
        flex: 0.1, /*borderColor: "#1eff00", borderWidth: 1,*/ justifyContent: "space-between",
        alignItems: "center", flexDirection: "row",
    },
    favouriteBtnView: {
      backgroundColor: "#000000", opacity: 0.7, width: 120, height: 70,
      borderRadius:10 , alignItems: "center", justifyContent: "center", marginLeft:30,
    },
    favouriteBtn: {
        color: "#ffffff",
    },
    controlBtnsView: {
        flexDirection: "row", marginRight: 30,
    },
    controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 70, height: 70,
        borderRadius: 50, alignItems: "center", justifyContent: "center", margin: 10
    },
  // homePageText: {
  //   color: "#000000", fontSize: 30
  // },
  flatList: {
    flex: 1,
    // paddingLeft: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  folder: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: '#6F83C2',
    margin: 40,
  },
  folderHeader: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#495579',
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderHeaderTitle: {
    color: '#FFFBEB',
  },
  foldermain: {
    flex: 4,
  },
  cover_image: {
    flex: 1,
  },
});

export default RealDaily;

