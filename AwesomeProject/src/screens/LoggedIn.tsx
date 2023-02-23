import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {useSelector} from 'react-redux';
import AddGoal from './AddGoal';
import CalendarPicker from '../components/AddGoal/Calendar';
import {IconButton, MD3Colors} from 'react-native-paper';
import {useRootDispatch, useRootSelector} from '../redux/store';
import GoalInput from '../components/AddGoal/GoalInput';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import TabNavigator, {TabStackParamList} from '../navigator/TabNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '../navigator/RootNavigator';
import AddGoalCard from '../components/AddGoal/AddGoalCard';
import ShowAddGoalCardArea from '../components/AddGoal/ShowAddGoalCardArea';
import AddMilestoneInput from '../components/AddMilestone/AddMilestoneInput';
import GoalItem from '../components/AddGoal/GoalItem';
import {ScrollView} from 'react-native-gesture-handler';
import {getAllGoalItemsForLoggedInThunk} from '../redux/GoalItem/thunk';
import AppsStyle from '../components/AppsStyle/AppsStyle';

type currentDailyGoals = {
  text: string;
  id: number;
};

export type LoggedInNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Goal'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const LoggedIn = () => {
  const username = useRootSelector(state => state.auth.username);
  // const goalItem = useSelector((state:RootState) => state.goalItem)
  const dispatch = useRootDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const tw = useTailwind();
  const navigation = useNavigation<LoggedInNavigationProp>();
  const is_created = useRootSelector(state => state.goalItem.is_created);

  useEffect(() => {
    console.log('fetching');
    dispatch(getAllGoalItemsForLoggedInThunk());
  }, [modalIsVisible]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    <AppsStyle title="Goal">
    <ScrollView style={tw('p-6')}>
      <CalendarPicker />
      <Text 
      // style={tw('text-2xl my-6')}
      style={{fontSize: 20, color: "#000000"}}
      >Wellcome,{username}</Text>

      {/* {is_created? ( <ShowAddGoalCardArea/>) : (
            <View style={styles.addNewGoalContainer}>
            <Text style={tw('text-2xl mt-2')}>Let setup some Goals ! </Text>
            <IconButton
              icon="plus-circle-outline"
              iconColor={'#000099'}
              size={100}
              onPress={startAddGoalHandler}
            />
          </View>

      )} */}

      <View style={styles.addNewGoalContainer}>
        <Text 
        // style={tw('text-2xl mt-2')}
        style={{fontSize: 20, color: "#000000"}}
        >Let setup some Goals ! </Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={'#000099'}
          size={100}
          onPress={startAddGoalHandler}
        />
      </View>
      <ShowAddGoalCardArea />
      <View style={tw('my-4')}></View>

      {/* <GoalItem /> */}

      {/* <View style={styles.addNewGoalContainer}>
        <Text style={tw('text-2xl mt-2')}>Let setup something to do !</Text>
        <IconButton
          icon="plus-circle-outline"
          iconColor={'#000099'}
          size={100}
          // onPress={}
        />
      </View> */}
      <GoalInput
        visible={modalIsVisible}
        onAddGoal={AddGoal}
        onCancel={endGoalHandler}
      />
      </ScrollView>
    </AppsStyle>
  );
};

const styles = StyleSheet.create({
  addNewGoalContainer: {
    backgroundColor: 'whites',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#000099',
  },
});

export default LoggedIn;
