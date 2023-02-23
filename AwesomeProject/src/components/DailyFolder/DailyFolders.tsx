// import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
// import { NavigationActions } from 'react-navigation';
// import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {REACT_APP_API_SERVER} from '../../redux/store';
import {IDailyFolder} from '../models';
// type Props = {navigation: NavigationProp<{}>};

//@ts-ignore
function DailyFolders({onPress}) {
  // (props: React.PropsWithChildren<{ id?: number, name?: string, image?: string, is_favourite?: boolean }>)
  const [folders, setFolders] = useState<IDailyFolder[]>();

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await fetch(`${REACT_APP_API_SERVER}/core/getFolder`);
        const data = await res.json();
        console.log(data.result);
        setFolders(data.result);
      } catch (error) {
        console.log('error!', error);
      }
    };
    fetchFolder();
    // const folder = await data.forEach((element: any) => element);
    // setFolders(currentFolders => [...currentFolders, folder])
  }, []);
  
  return (
    <>
      <FlatList style={styles.flatList} numColumns={2} data={folders} renderItem={item =>
        <TouchableOpacity onPress={onPress} style={styles.folder} key={item.item.id}>
        <View style={styles.folderHeader} >
          <Text style={styles.folderHeaderTitle}>{item.item.name}</Text>
        </View>
        <View style={styles.foldermain}>
          {/* <Text>{item.cover_image}</Text> */}
          <Image
            style={styles.cover_image}
            source={{
              uri: 'https://www.shutterstock.com/image-photo/word-demo-appearing-behind-torn-260nw-1782295403.jpg'/*item.item.cover_image*/,
            }}
            />
            
        </View>
        </TouchableOpacity>
        } keyExtractor={(item) => `${item.id}`}>
      </FlatList>

    </>
  );
}

const styles = StyleSheet.create({
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

export default DailyFolders;
