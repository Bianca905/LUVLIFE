import {View, Text} from 'react-native';
import React from 'react';
import {IconButton, MD3Colors, Button} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
// import { launchImageLibrary} from 'react-native-image-picker';

const AddAttachmentButton = async() => {
  const tw = useTailwind();

  // const result = await launchImageLibrary({mediaType:'photo'});

  return (
    <View style={tw('flex-row text-xl mt-4 ')}>
      
      <IconButton
        icon="camera"
        size={40}
        onPress={() => console.log('Pressed')}
      />
      <Text style={tw('text-xl mt-4')}>Pick an image from camera roll</Text>
    </View>
  );
};

export default AddAttachmentButton;
