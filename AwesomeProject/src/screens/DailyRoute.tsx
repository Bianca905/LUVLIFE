import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AppsStyle from '../components/AppsStyle/AppsStyle';
import AddItem from '../components/ControlBtnGroupParts/AddItem';
import ControlBtnGroup from '../components/ControlBtnGroupParts/ControlBtnGroup';
import DailyFolder from '../components/DailyFolder/DailyFolders';
import SearchBar from '../components/DailyFolder/SearchBar';
import {createStackNavigator} from '@react-navigation/stack';
import FolderTemplate from '../components/FolderTemplate/FolderTemplate';
import {NavigationProp} from '@react-navigation/native';
import MyComponent from '../components/FolderTemplate/FolderTemplate';
import RealDaily from './RealDaily';
import Purpose from '../components/Purpose/Purpose';
import Milestone from '../components/Milestone/Milestone';
import PurposeAttachment from '../components/Attachment/PurposeAttachment';
// import Test from '../components/Attachment/PurposeAttachment';
import VoiceTest from '../components/Attachment/VoiceTest';

type Props = {navigation: NavigationProp<{}>};

const Stack = createStackNavigator();
function DailyRoute() {
  // const [folderList, setFolderList] = useState<Array<Object>>([
  //   <DailyFolder title="First folder" />,
  // ]);

  // function updateFolderList() {
  //   setFolderList(currentFolderList => [...currentFolderList, DailyFolder]);
  // }

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name="RealDaily" component={RealDaily} />
        <Stack.Screen name="FolderTemplate" component={FolderTemplate} />
        <Stack.Screen name="Purpose" component={Purpose} />
        <Stack.Screen name="Milestone" component={Milestone} />
        <Stack.Screen name="PurposeAttachment" component={PurposeAttachment} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
        <Stack.Screen name="VoiceTest" component={VoiceTest} />
        
        
      </Stack.Navigator>
    </>

    // <AppsStyle title='Your Daily Folder'>
    //   <SearchBar />

    //   <View style={styles.homePage}>
    //     <Text style={styles.homePageText}>Home Page</Text>
    //     <DailyFolder title='First folder' />
    //     {folderList.map((folder) => <>{folder}</>)}

    //   </View>
    //   <AddItem/>
    //   <ControlBtnGroup />
    // </AppsStyle>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'center', alignItems: 'center'
  },
  // homePageText: {
  //   color: "#000000", fontSize: 30
  // },
});

export default DailyRoute;
