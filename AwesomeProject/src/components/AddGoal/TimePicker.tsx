import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {useTailwind} from 'tailwind-rn/dist';
import {
  createGoalItem,
  getEndTime,
  getStartTime,
} from '../../redux/GoalItem/Slice';
import {GoalItem} from '../../redux/GoalItem/State';
import {useRootDispatch, useRootSelector} from '../../redux/store';

export default function TimePicker() {
  const tw = useTailwind();
  const [visible, setVisible] = React.useState(false);
  const [endVisible, setEndVisible] = React.useState(false);
  const [startTimeConcat, setStartTimeConcat] = React.useState('');
  const [endTimeConcat, setEndTimeConcat] = React.useState('');

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const dispatch = useRootDispatch();

  const onEndTimeDismiss = React.useCallback(() => {
    setEndVisible(false);
  }, [setEndVisible]);

  const onConfirm = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setVisible(false);

      const hoursString = hours.toString();
      const minutesString = minutes.toString();
      const startTimeString = {
        startTime: hoursString.concat(':', minutesString),
      };
      setStartTimeConcat(startTimeString.startTime);
      console.log(startTimeString.startTime);
      dispatch(getStartTime(startTimeString));
      console.log('dispatch start time', startTimeString);
    },
    [setVisible],
  );

  const onConfirmEndTime = React.useCallback(
    ({hours, minutes}: {hours: number; minutes: number}) => {
      setEndVisible(false);

      const hoursString = hours.toString();
      const minutesString = minutes.toString();
      const endTimeString = {endTime: hoursString.concat(':', minutesString)};
      setEndTimeConcat(endTimeString.endTime);
      console.log(endTimeString.endTime);
      dispatch(getEndTime(endTimeString));
      console.log('dispatch end time', endTimeString);
    },
    [setEndVisible],
  );

  return (
    <SafeAreaProvider>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
        <Text style={tw('my-2 text-lg text-black')}>Start time</Text>
        <Text style={tw('text-black text-lg mb-2')}>{startTimeConcat}</Text>
        <Button
          onPress={() => setVisible(true)}
          uppercase={false}
          mode="outlined">
          Pick time
        </Button>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
        
        <Text style={tw('my-2 text-lg text-black mt-6')}>End Time</Text>
        <Text style={tw('text-black  text-lg mb-2')}>{endTimeConcat}</Text>
        <Button
          onPress={() => setEndVisible(true)}
          uppercase={false}
          mode="outlined">
          Pick time
        </Button>

        <TimePickerModal
          visible={endVisible}
          onDismiss={onEndTimeDismiss}
          onConfirm={onConfirmEndTime}
          hours={15}
          minutes={16}
        />
      </View>
    </SafeAreaProvider>
  );
}
