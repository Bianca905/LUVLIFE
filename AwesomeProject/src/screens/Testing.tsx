

// import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { NavigationProp } from '@react-navigation/native';
// import React, {useState} from 'react';
// import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import {Button, IconButton, MD3Colors} from 'react-native-paper';
// import AppsStyle from '../components/AppsStyle/AppsStyle';
// import AddItem from '../components/ControlBtnGroupParts/AddItem';
// import DailyFolders from '../components/DailyFolder/DailyFolders';
// // import DailyFolder from '../components/DailyFolder/DailyFolders';
// import SearchBar from '../components/DailyFolder/SearchBar';

// // type Props = {navigation: NavigationProp<{}>};

// // @ts-ignore

// function RealDaily({navigation}) {
//   // const [folderList, setFolderList] = useState<Array<Object>>([
//   //   <DailyFolders/>,
    
//   // ]);

//   // function updateFolderList() {
//   //   setFolderList(currentFolderList => [...currentFolderList, DailyFolders]);
//   // }
//   function pressHandler() {
//     navigation.navigate("Purpose")
//   }
//   return (
//     <AppsStyle title="Your Daily Folder">
//       <SearchBar />
      
//         <View style={styles.homePage}>
//             {/* <Text style={styles.homePageText}>Home Page</Text> */}
//             {/* <DailyFolder title='First folder' /> */}
//             {/* {folderList.map(folder => (
//             <>{folder}</>
//             ))} */}
//             <DailyFolders onPress={pressHandler}/>
//         </View>
      
//       <View style={styles.allBtnView}>
//         {/* <TouchableOpacity style={styles.favouriteBtnView}><FontAwesomeIcon icon={faHeart} style={styles.favouriteBtn} size={40} /></TouchableOpacity> */}
//               <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="heart" size={40}
//               onPress={() => navigation.navigate('FolderTemplate')} />
//         <View style={styles.controlBtnsView}>
//           {/* <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faTrash} style={styles.favouriteBtn} size={30} /></TouchableOpacity> */}
//           {/* <TouchableOpacity style={styles.controlBtns}><FontAwesomeIcon icon={faPen} style={styles.favouriteBtn} size={30} /></TouchableOpacity> */}
//           <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="trash-can" size={40}
//               onPress={() => navigation.navigate('FolderTemplate')} />
//           <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="pen" size={40}
//               onPress={() => navigation.navigate('FolderTemplate')} />
//           <IconButton iconColor="#ffffff" style={styles.controlBtns} icon="plus" size={40}
//               onPress={() => navigation.navigate('FolderTemplate')} />
          
//         </View>
//       </View>
          

//       {/* <ControlBtnGroup /> */}
//     </AppsStyle>
//   );
// }

// const styles = StyleSheet.create({
//   homePage: {
//     flex: 1,
//     flexDirection: 'column',
//     // marginHorizontal: 30,
//     // flexWrap: 'wrap',
//     // justifyContent: "center",
//     alignItems: 'center',
//     },
//   // scrollView: {
//   //   flex: 1,
//   //   flexDirection: 'row',
//   //   flexWrap: 'wrap',
//   //   },
//     allBtnView: {
//         flex: 0.1, /*borderColor: "#1eff00", borderWidth: 1,*/ justifyContent: "space-between",
//         alignItems: "center", flexDirection: "row",
//     },
//     favouriteBtnView: {
//       backgroundColor: "#000000", opacity: 0.7, width: 120, height: 70,
//       borderRadius:10 , alignItems: "center", justifyContent: "center", marginLeft:30,
//     },
//     favouriteBtn: {
//         color: "#ffffff",
//     },
//     controlBtnsView: {
//         flexDirection: "row", marginRight: 30,
//     },
//     controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 70, height: 70,
//         borderRadius: 50, alignItems: "center", justifyContent: "center", margin: 10
//     },
//   // homePageText: {
//   //   color: "#000000", fontSize: 30
//   // },
// });

// export default RealDaily;

import React from 'react';
import { useForm, Resolver } from 'react-hook-form';

// type FormValues = {
//     Title: string;
//     Description: string;
//     Start_date: string;
//     Start_time: string;
//     Due_date: string;
//     Due_time: string;
// };

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.Title ? values : {},
//     errors: !values.Title ? { Title: { type: 'required', message: 'This is required.',},}: {},
//   };
// };

// export default function App() {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver })
//   const onSubmit = handleSubmit((data) => console.log(data));
//   console.log(errors);
  
//   return (
//     //   <form onSubmit={handleSubmit(onSubmit)}>
//       <form onSubmit={onSubmit}>
//       <input type="text" placeholder="Title" {...register("Title", {required: true})} />
//       <input type="text" placeholder="Description" {...register("Description", {required: true})} />
//       <input type="datetime" placeholder="Start date" {...register("Start_date", {required: true, maxLength: 10, pattern: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i})} />
//       <input type="time" placeholder="Start Time" {...register("Start_time", {required: true, maxLength: 12})} />
//       <input type="datetime" placeholder="Due date" {...register("Due_date", {required: true, maxLength: 10, pattern: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i})} />
//       <input type="time" placeholder="Due time" {...register("Due_time", {required: true})} />

//       <input type="submit" />
//     </form>
//   );
// }

import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import {  Controller } from 'react-hook-form';
// import Constants from 'expo-constants';

export default function App() {
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
    title: "",
    description: "",
    start_date: "",
    start_time: "",
    due_date: "",
    due_time: "",
    }
  });
  const onSubmit = data => {
    console.log(data);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  console.log('errors', errors);

  return (
    <View style={styles.container}>
        
      <Text style={styles.label}>Title</Text>
      <Controller control={control} render={({field: { onChange, onBlur, value }}) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={value => onChange(value)} value={value} />
        )} name="title" rules={{ required: true }} />
        
      <Text style={styles.label}>Last name</Text>
      <Controller control={control} render={({field: { onChange, onBlur, value }}) => (
          <TextInput style={styles.input} onBlur={onBlur} onChangeText={value => onChange(value)} value={value} />
        )} name="description" rules={{ required: true }} />

      <View style={styles.button}>
        <Button title="Reset" onPress={() => {
            reset({
              title: 'Bill',
              description: 'Luo'
            })
          }}
        />
      </View>

      <View style={styles.button}>
        <Button title="Button" onPress={handleSubmit(onSubmit)} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});