import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {
  CalendarDate,
  
} from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useTailwind } from 'tailwind-rn/dist';
import { createGoalItem, getDateRange } from '../../redux/GoalItem/Slice';

export default function RangeDatePicker() {
  const tw = useTailwind();
  const dispatch = useDispatch();
  const [range, setRange] = React.useState<any>({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = React.useState(false);

  

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({
      startDate,
      endDate,
    }: {
      startDate: CalendarDate;
      endDate: CalendarDate;
    }) => {
      setOpen(false);
      setRange({startDate, endDate});
      
    //  const newDateRangeString = JSON.stringify(newDateRange)

    const newDateRange = {startDate:startDate!.toLocaleDateString('sv'), endDate:endDate!.toLocaleDateString('sv')}
    dispatch(getDateRange(newDateRange))
    console.log("date range", newDateRange)
      
    },
    [setOpen, setRange],
    
   
  );
 
  const startDate =range.startDate?.toLocaleDateString('sv')
  const endDate =range.endDate?.toLocaleDateString('sv')
  
 
  return (
    <SafeAreaProvider>
      <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
      <Text style={tw('my-2 text-lg text-black ')}>Start date </Text>
        <Text style={tw('text-black  text-lg mb-2')}>{startDate}</Text>
        <Text style={tw('my-2 text-lg text-black mt-4')} >End date</Text>
        <Text style={tw('text-black  text-lg mb-14')}>{endDate}</Text>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick date range
        </Button>
        <DatePickerModal
          locale="en"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
          
        />
        
      </View>
    </SafeAreaProvider>
  );
}
