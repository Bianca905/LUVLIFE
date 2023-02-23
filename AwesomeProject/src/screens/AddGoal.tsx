

import {View,Text,SafeAreaView,TouchableOpacity,Image,StyleSheet,FlatList,ScrollView,} from 'react-native';

import React from 'react';
import {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import GoalInput from '../components/AddGoal/GoalInput';
import GoalItem from '../components/AddGoal/GoalItem';
import {IconButton, MD3Colors} from 'react-native-paper';
import {
  faHeart,
  faUser,
  faCalendarCheck,
} from '@fortawesome/free-regular-svg-icons';
import {NavigationContainer} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
type currentDailyGoals = {
  text: string;
  id: number;
};
import DailyRoute from './DailyRoute';
import Profile from './Profile';



const AddGoal = () => {
  const Tab = createMaterialBottomTabNavigator();
  const tw = useTailwind();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [dailyGoals, setDailyGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endGoalHandler() {
    setModalIsVisible(false);
  }

  // function addGoalHandler(enteredGoalText:string) {
  //   setDailyGoals((currentDailyGoals) => [
  //     ...currentDailyGoals,
  //     { text: enteredGoalText, id: Math.random().toString() },
  //   ]);
  //   endGoalHandler();
  // }

  // function deleteGoalHandle(id) {
  //   setDailyGoals(currentDailyGoals => {
  //     return currentDailyGoals.filter(goal => goal.id !== id);
  //   });
  // }

  return (
    <View style={styles.appContainer}>
      <ScrollView>
        <View style={tw('p-4 ')}>

          <Text style={tw('text-4xl ')}>Let's Begin! </Text>
          <View style={styles.addNewGoalContainer}>
            <IconButton icon="plus-circle-outline" iconColor={'#000099'} size={100} onPress={startAddGoalHandler} />
            <Text style={tw('text-xl')}>Add New Goal</Text>
          </View>

           
         
          <GoalInput 
            visible={modalIsVisible}
            onAddGoal={AddGoal}
            onCancel={endGoalHandler} 
          />
        </View>

        <View style={styles.goalsContainer}>
          {/* <FlatList
          data={dailyGoals}
          renderItem={itemData => {
            return (
              <GoalItem
                text={itemData.item.text}
                id={itemData.item.id}
                // onDeleteItem={deleteGoalHandle}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}></FlatList> */}
        </View>
      </ScrollView>
      <Tab.Navigator >
                <Tab.Screen name="Daily" component={DailyRoute} options={{ tabBarIcon: () => (
                <FontAwesomeIcon icon={faHeart} style={styles.appBottomBtn} size={20} />),
                }} />
                <Tab.Screen name="Goals" component={AddGoal} options={{ tabBarIcon: () => (
                <FontAwesomeIcon icon={faCalendarCheck} style={styles.appBottomBtn} size={20} />),
                }} />
                <Tab.Screen name="Profile" component={Profile} options={{  tabBarIcon: () => (
                <FontAwesomeIcon icon={faUser} style={styles.appBottomBtn} size={20} />),
                }} />
       </Tab.Navigator>
      
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // paddingTop: 50,
    // paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 10,
    marginTop: 20,
  },

  addNewGoalContainer: {
    backgroundColor: '#CCCCFF',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',

    borderColor: '#808080',
  },

  image: {
    height: 110,
    width: 120,
    marginTop: 10,
  },

  text: {
    marginTop: 10,
  },

  appBottomBar: {
    backgroundColor: '#263159',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  appBottomBtn: {
    color: '#FFFBEB',
  },
});

export default AddGoal;
