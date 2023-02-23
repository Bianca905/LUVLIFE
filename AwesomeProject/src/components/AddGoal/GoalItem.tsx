import {useEffect, useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Text,
  List,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import {getAllGoalItemThunk} from '../../redux/GoalItem/thunk';
import {useRootDispatch, useRootSelector} from '../../redux/store';
import {useTailwind} from 'tailwind-rn/dist';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {TabStackParamList} from '../../navigator/TabNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {RootStackParamList} from '../../navigator/RootNavigator';
import {useSelector} from 'react-redux';

// type GoalItemProps = {
//   id: number;
//   title: string;
//   description: string | null;
//   startDate: string;
//   endDate: string;
//   startTime: string;
//   endTime:string;
//   is_completed: boolean
// };

export type GoalItemNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, 'GoalItemModal'>
>;
type AddGoalScreenRouteProp = RouteProp<RootStackParamList, 'GoalItemModal'>;

// {id, title,description,startDate,endDate,startTime,endTime,is_completed}: GoalItemProps
function GoalItem() {
  const goalItemArr = useRootSelector(state => state.goalItem.goalItems);
  const selected_id = useRootSelector(state => state.goalItem.selected_goal_item_id);
  const goalItem = goalItemArr.filter(item => item.id === selected_id);
  const tw = useTailwind();
  const dispatch = useRootDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigation = useNavigation<GoalItemNavigationProp>();
  console.log('params goal item', goalItem);

  // const title = useRootSelector(state => state)

  // useEffect(()=> {goalItemArr.filter(item => {
  //   return (item.id === id)
  // })})

  // useEffect(() => {
  //   dispatch(getAllGoalItemThunk());
  // }, []);
  return (
    <View>
      {goalItem.map(goalItem => (
        <Pressable
          key={selected_id}
          android_ripple={{color: '#dddddd'}}
          // onPress={props.onDeleteItem.bind(props.id)}
          style={({pressed}) => pressed && styles.pressedItem}>
          <View></View>
          <View style={styles.goalItem}>
            <Text style={tw('text-2xl ml-4 mb-2')}>{goalItem.title} </Text>
            <List.Item
              title={goalItem.title}
              description={goalItem.description}
              left={props => <List.Icon {...props} icon="folder" />}
            />

            <List.Item
              title="Start date - End date:"
              description={[
                goalItem.startDate?.toString().slice(0, 10),
                ' - ',
                goalItem.endDate?.toString().slice(0, 10),
              ]}
              left={props => <List.Icon {...props} icon="calendar" />}
            />

            <List.Item
              title="Start time - End time:"
              description={[goalItem.startTime, ' - ', goalItem.endTime]}
              left={props => <List.Icon {...props} icon="clock" />}
            />

            <View style={tw('flex flex-row-reverse')}>
              <IconButton
                icon="delete-outline"
                iconColor={'grey'}
                size={28}
                onPress={() => console.log('Pressed')}
              />

              {/* <IconButton
                icon="file-edit-outline"
                iconColor={'grey'}
                size={25}
                onPress={() => console.log('Pressed')}
                style={tw('')}
              /> */}

              <IconButton
                icon="keyboard-return"
                iconColor={'grey'}
                size={28}
                onPress={navigation.goBack}
              />
              <View>
                <IconButton
                  icon="clipboard-check"
                  iconColor={'grey'}
                  size={25}
                  onPress={() => console.log('Pressed')}
                />
                {/* <Text style={tw('ml-2')}>Done?</Text> */}
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#D2DAFF',
    color: 'black',
    padding: 15,
  },

  pressedItem: {
    opacity: 0.5,
  },

  goalText: {
    color: 'black',
    padding: 8,
  },
});

export default GoalItem;
