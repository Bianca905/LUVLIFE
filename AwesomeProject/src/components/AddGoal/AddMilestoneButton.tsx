import {View, Text} from 'react-native';
import React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { useTailwind } from 'tailwind-rn/dist';

const AddMilestoneButton = () => {
    const tw = useTailwind();
  return (
    <View style={tw('flex-row ')}>
      <IconButton
        icon="plus-circle-outline"
        
        size={40}
        onPress={() => console.log('Pressed')}
      />
      <Text style={tw('text-xl mt-4')}>Add Milestone</Text>
    </View>
  );
};

export default AddMilestoneButton;
