import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import AddGoalCard from './AddGoalCard';
import {IconButton} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';

const ShowAddGoalCardArea = () => {
  const tw = useTailwind();
  return (
    <ScrollView >
      <View style={tw('flex-row items-center ')}>
        <Text style={tw('text-xl')}>Goals:</Text>
        <View style={tw('ml-auto')}>
        {/* <IconButton
          icon="plus-circle-outline"
          iconColor={'#000099'}
          size={30}
          onPress={() => console.log('Pressed')}
        /> */}
        </View>
      
      </View>
   
      <AddGoalCard />
    
    </ScrollView>
  );
};

export default ShowAddGoalCardArea;
