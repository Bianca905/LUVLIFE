import {Pressable, View} from 'react-native';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card, Text, IconButton} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import {useRootDispatch, useRootSelector} from '../../redux/store';
import {CompositeNavigationProp, useNavigation,useIsFocused} from '@react-navigation/native';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {TabStackParamList} from '../../navigator/TabNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {
  getAllGoalItemsForLoggedInThunk,
} from '../../redux/GoalItem/thunk';
import {getSelectedGoalItemId} from '../../redux/GoalItem/Slice';

type GoalItemProps = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  is_completed: boolean;
};

export type LoggedInNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Goal'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const AddGoalCard = () => {
  const tw = useTailwind();
  const dispatch = useRootDispatch();
  const navigation = useNavigation<RootStackParamList>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused){
      console.log("fetching")
    dispatch(getAllGoalItemsForLoggedInThunk());}
    console.log("focus change")
  }, [isFocused]);
  const goalItemArr = useRootSelector(state => state.goalItem.goalItems);
  // console.log('check goalItemArr', goalItemArr);

  return (
    <View>
      {goalItemArr.map(goalitem => (
        <Pressable
          key={goalitem.id}
          onPress={() => {
            console.log('hihihi');
            const id: number = goalitem.id!;
            dispatch(getSelectedGoalItemId({id: id}));
            navigation.navigate('GoalItemModal');
          }}>
          <Card style={tw('rounded-lg border-2 border-blue-900 my-2')}>
            <Card.Content style={tw('flex-row items-center')}>
              <View style={tw('flex-row items-center')}>
                <IconButton
                  icon="trophy"
                  iconColor={goalitem.random_color!}
                  size={30}
                  onPress={() => console.log('Pressed')}
                />
                <Text variant="titleLarge">{goalitem.title}</Text>
              </View>

              <View style={tw('ml-20')}>
                <View style={tw('mb-2')}>
                  <Text variant="bodyMedium">
                    {[
                      goalitem.startDate?.toString().slice(0, 10),
                      ' - ',
                      goalitem.endDate?.toString().slice(0, 10),
                    ]}
                  </Text>
                </View>
                <View style={tw('flex-row')}>
                  <Text variant="bodyMedium">
                    Time:{goalitem.startTime}-{goalitem.endTime}
                  </Text>
                </View>
                {/* <View style={tw('flex-row')}>
                  <Text variant="bodyMedium">
                    ID: {goalitem.id}
                  </Text>
                </View> */}

               
              </View>
            </Card.Content>
          </Card>
        </Pressable>
      ))}
    </View>
  );
};

export default AddGoalCard;
