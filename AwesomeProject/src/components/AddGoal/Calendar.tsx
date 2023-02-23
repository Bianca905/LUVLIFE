import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {useRootDispatch, useRootSelector} from '../../redux/store';
import {useIsFocused} from '@react-navigation/native';
import {getAllGoalItemsForLoggedInThunk} from '../../redux/GoalItem/thunk';
import moment from 'moment';
import GoalItem from './GoalItem';
const CalendarPicker = () => {
  const dispatch = useRootDispatch();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log('fetching');
      dispatch(getAllGoalItemsForLoggedInThunk());
    }
    console.log('focus change');
  }, [isFocused]);
  const goalItemArr = useRootSelector(state => state.goalItem.goalItems);
  // console.log('check goalItemArr in calendar', goalItemArr);

 

  const getMarked = () => {
    let marked: any = {};

    
    // console.log("check goalItemArr",goalItemArr)
    if (goalItemArr.length > 0) {
      let DEMO_ARRAY = goalItemArr;
  
      let global_count = 0
      for (let i = 0; i < goalItemArr.length; i++) {
        console.log(
          'check single start:',
          DEMO_ARRAY[i].startDate,
          'signle end',
          DEMO_ARRAY[i].endDate,
        );

        const start_parse = new Date(DEMO_ARRAY[i].startDate!);
        console.log('start date object', start_parse);
        const startYear = start_parse.getUTCFullYear();
        const startMonth = start_parse.getUTCMonth() + 1;
        const startDate = start_parse.getUTCDate();
        console.log(
          'check start concat',
          startYear + '-' + startMonth + '-' + startDate,
        );
        const daysInStartMonth = moment(
          `${startYear}+'-'+${startMonth}`,
          'YYYY-MM',
        ).daysInMonth();
        // console.log('days in month:', daysInStartMonth);

        const end_parse = new Date(DEMO_ARRAY[i].endDate!);
        // console.log('end date object', end_parse);
        const endYear = end_parse.getUTCFullYear();
        const endMonth = end_parse.getUTCMonth() + 1;
        const endDate = end_parse.getUTCDate();
        console.log(
          'check start concat',
          endYear + '-' + endMonth + '-' + endDate,
        );
        const daysInEndMonth = moment(
          `${endYear}+'-'+${endMonth}`,
          'YYYY-MM',
        ).daysInMonth();
        // console.log('days in month:', daysInEndMonth);
        const moment_end_date = moment([endYear, endMonth - 1, endDate]);
        const moment_start_date = moment([
          startYear,
          startMonth - 1,
          startDate,
        ]);
        const days_diff = moment_end_date.diff(moment_start_date, 'days');
        // console.log('day difference', days_diff);

        // console.log(moment_start_date.add(days_diff,'days'))
        moment_start_date.subtract(1, 'days');


        for (let i = 0; i <= days_diff; i++) {
          let day = i.toString().padStart(2, '0');
          let count_reference = moment_start_date;
          // console.log("before add",count_reference)
          count_reference.add(1, 'days');
        
          let periods = [
            {
              startingDay: false,
              endingDay: false,
              color: DEMO_ARRAY[global_count].random_color,
            },

          
          ];
          let processed_month;
          if (count_reference.month() < 10) {
            processed_month = (count_reference.month() + 1)
              .toString()
              .padStart(2, '0');
          } else {
            processed_month = count_reference.month() + 1;
          }

          let processed_date;
          if (count_reference.date() < 10) {
            processed_date = count_reference.date().toString().padStart(2, '0');
          } else {
            processed_date = count_reference.date();
          }

     
          if( marked[
            `${count_reference.year()}-${processed_month}-${processed_date}`
          ] != null ){
            marked[
              `${count_reference.year()}-${processed_month}-${processed_date}`].periods.push(periods[0])
          }else{
            marked[
              `${count_reference.year()}-${processed_month}-${processed_date}`
            ] = {
              periods,
            };
          }
        
        }
        // console.log(marked);

        // const test_parse = new Date(goalItemArr[0].startDate!)
        // console.log(test_parse.getFullYear(),test_parse.getMonth(),test_parse.getDate())
        // const test_slice = test_parse.toISOString().slice(0, 10)
        // console.log("check slice",test_slice)
        // console.log("check converted",test_parse.toLocaleString('en-CA'))
        // for (let i = startDate; i <= daysInStartMonth; i++) {
        //   let day = i.toString().padStart(2, '0');
        //   let periods = [
        //     {
        //       startingDay: i == startDate,
        //       endingDay: i == 10,
        //       color: 'teal',
        //     },
        //     // i >= 2 &&
        //     //   i <= 6 && {
        //     //     startingDay: i == 2,
        //     //     endingDay: i == 6,
        //     //     color: 'orange',
        //     //   },
        //   ];
        //   marked[`2022-${startMonth}-${day}`] = {
        //     periods,
        //   };
        // }
        global_count +=1
      }
    }

    return marked;

  };

  return (
    <View>
      <Calendar
        initialDate="2023-02-01"
        markingType="multi-period"
        markedDates={getMarked()}
      />
    </View>
  );
};

export default CalendarPicker;

// https://blog.logrocket.com/create-customized-shareable-calendars-react-native/
