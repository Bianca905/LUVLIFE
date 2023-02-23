import {View, Text} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import {ParamListBase, RouteProp, useNavigation} from '@react-navigation/native';
import {useRootSelector} from '../redux/store';
import AddMilestoneInput from '../components/AddMilestone/AddMilestoneInput';
import GoalItem from '../components/AddGoal/GoalItem';

export type RootStackParamList = {
  setOptions(arg0: { headerShown: boolean; }): unknown;
  navigate(arg0: string): void;

  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  TabNavigator: undefined;
  AddMilestoneInputModal: undefined;
  GoalItemModal:{
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    startDate:string;
    endDate:string;
    is_completed:boolean;
  }
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuth = useRootSelector(state => state.auth.isAuth);

  return (
    <RootStack.Navigator>
      {isAuth ? (
        <RootStack.Group>
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
        </RootStack.Group>
      ) : (
        <RootStack.Group>
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="SignUp" component={SignUp} />
          <RootStack.Screen name="Login" component={Login} />
        </RootStack.Group>
      )}

      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <RootStack.Screen
          options={{headerShown: false}}
          name="AddMilestoneInputModal"
          component={AddMilestoneInput}
        />
      </RootStack.Group>

      <RootStack.Group
        screenOptions={{
          presentation: 'modal',
        }}>
        <RootStack.Screen
          options={{headerShown: false}}
          name="GoalItemModal"
          component={GoalItem}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
