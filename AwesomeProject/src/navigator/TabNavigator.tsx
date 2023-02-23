import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect} from 'react';
import DailyRoute from '../screens/DailyRoute';
import Profile from '../screens/Profile';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalendarCheck,
  faHeart,
  faUser,
  faMap,
 faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoggedIn from '../screens/LoggedIn';
import {useNavigation} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import GoogleMapLocation from '../screens/GoogleMapLocation';

export type TabStackParamList = {
  Daily: undefined;
  Goal: undefined;
  Profile: undefined;
  Location: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  return (
    <Tab.Navigator
      initialRouteName="Goal" 
      barStyle={styles.appBottomBar}
      activeColor="#000000"
      inactiveColor="#ffffff" 
      shifting={true}>
      <Tab.Screen
        name="Daily"
        component={DailyRoute}
        options={{
          tabBarColor: "#ffffff",
          tabBarIcon: () => (
            <FontAwesomeIcon
              icon={faHeart}
              style={styles.appBottomBtn}
              size={20}
              color={btnColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Goal"
        component={LoggedIn}
        options={{
          title: "Goal", 
          
          tabBarColor: "#ffffff",
          tabBarIcon: () => (
            <FontAwesomeIcon
              icon={faCalendarCheck}
              style={styles.appBottomBtn}
              size={20}
              color={btnColor}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Location"
        component={GoogleMapLocation}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon
              icon={faMapLocationDot}
              style={styles.appBottomBtn}
              size={25}
              color={btnColor}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        //@ts-ignore
        component={Profile}
        options={{
          tabBarColor: "#ffffff",
          tabBarIcon: () => (
            <FontAwesomeIcon
              icon={faUser}
              style={styles.appBottomBtn}
              size={20}
              color={btnColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const btnColor = '#FFFBEB';
const styles = StyleSheet.create({
  appBottomBar: {
    // backgroundColor: '#D2DAFF',
    backgroundColor: '#263159',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    color: '#FFFBEB',
  },
  appBottomBtn: {
    color: '#FFFBEB',
  },
  label: {
    color: "#ffffff"
  },
});
export default TabNavigator;
