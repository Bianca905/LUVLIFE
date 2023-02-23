import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Button} from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AddMilestoneInput from '../components/AddMilestone/AddMilestoneInput';
import { RootStackParamList } from '../navigator/RootNavigator';
// import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';






export type HomeStackParamList ={
  Login: undefined
  SignUp: undefined

  
}

function Home() {
  const tw = useTailwind();

  
  

  const navigation = useNavigation<RootStackParamList>();
    useLayoutEffect (() => {
        navigation.setOptions({
            headerShown:false,
        })
    })

  return (
   
      <ScrollView>
        <View style={styles.mainContainer}>

          <Image source={require('../assets/image/icon1.png')} style={styles.logo}/>
          
          <View style={tw('mb-8 w-10/12')}>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
              Login
            </Button>
          </View>
          <View style={tw('mb-8 w-10/12')}>
            <Button mode="contained" onPress={() => navigation.navigate("SignUp")}>
              Sign up
            </Button>
          </View>
          
        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  image: {
    flex: 1,
    justifyContent: 'center',
  },

  logo: {
    width: 400,
    height: 600,
    backgroundColor: 'white',
    margin:30,
  },
  text: {
    marginLeft: '45%',
  },

  button: {
    width: 250,
    height: 47,
    // backgroundColor: "#D9D9D9",
    marginTop: 20,

    justifyContent: 'center',
  },
});

export default Home;
