import {View, Text, Modal} from 'react-native';
import React from 'react';
import {FormBuilder, Logic} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-navigation';
import {TextInput, Button} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import RangeDatePicker from '../AddGoal/RangeDatePicker';
import TimePicker from '../AddGoal/TimePicker';

const AddMilestoneInput = (props: any) => {
  const tw = useTailwind();
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      tittle: '',
      description: '',
    },
    mode: 'onChange',
  });

  return (
    <Modal visible={props.visible} animationType="slide">
      <ScrollView>
        <Text>Milestone</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'tittle',
              rules: {
                required: {
                  value: true,
                  message: 'Tittle is required',
                },
              },
              textInputProps: {
                label: 'Tittle',
                left: <TextInput.Icon icon={'folder'} />,
              },
            },

            {
              type: 'text',
              name: 'description',

              rules: {
                required: {
                  value: false,
                  message: '',
                },
              },
              textInputProps: {
                label: 'Description',
                left: <TextInput.Icon icon={'pen'} />,
              },
            },
          ]}
        />

        <View style={tw('flex-row mb-5')}>
          <RangeDatePicker />
          <TimePicker hours={null} minutes={null} />
        </View>

        <Button
          mode={'contained'}
          onPress={handleSubmit((data: any) => {
            console.log('onCreate', data);
            // dispatch(createGoalItem(data));
            console.log('dispatch', data);
          })}>
          Create
        </Button>

        <View style={tw('mt-4')}>
          <Button mode="contained" onPress={props.onCancel}>
            Cancel
          </Button>
        </View>
      </ScrollView>
  </Modal>
  );
};

export default AddMilestoneInput;
