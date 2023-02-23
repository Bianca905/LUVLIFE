import {View, StyleSheet, Modal, Image, Text, ScrollView} from 'react-native';
import {useState} from 'react';
import {TextInput, IconButton, MD3Colors, Button} from 'react-native-paper';
import {useTailwind} from 'tailwind-rn/dist';
import RangeDatePicker from './RangeDatePicker';
import TimePicker from './TimePicker';
import {FormBuilder, Logic} from 'react-native-paper-form-builder';
import {useController, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {postGoalItemThunk} from '../../redux/GoalItem/thunk';
import {useRootDispatch, useRootSelector} from '../../redux/store';
import {PurposeType} from '../../redux/GoalItem/State';

type formData = {
  folderName: string;
  type: PurposeType;
};

function GoalInput(props: any) {
  const tw = useTailwind();
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const dispatch = useRootDispatch();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigation = useNavigation();
  const startTime = useRootSelector(state => state.goalItem.input_start_time);
  const startDate = useRootSelector(state => state.goalItem.input_start_date);
  const endDate = useRootSelector(state => state.goalItem.input_end_date);
  const endTime = useRootSelector(state => state.goalItem.input_end_time);
  
  function startAddMilestone() {
    setModalIsVisible(true);
  }

  function finishCreateGoalItem() {
    setModalIsVisible(false);
  }

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      title: '',
      description: '',
      folderName: '',
    },
    mode: 'onChange',
  });

  // const handleClick = () => resetField("title","description","folderName");
  // https://react-hook-form.com/api/useform/resetfield

  return (
    <Modal visible={props.visible} animationType="slide">
      <ScrollView style={styles.inputContainer}>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'folderName',
              // statau={field.value}
              rules: {
                required: {
                  value: true,
                  message: 'Title is required',
                },
              },
              textInputProps: {
                label: 'Folder Name',
                left: <TextInput.Icon icon={'folder'} />,
                mode: 'flat',

                underlineColor: '#ffffff',
              },
            },

            {
              type: 'text',
              name: 'title',
              rules: {
                required: {
                  value: true,
                  message: 'Title is required',
                },
              },
              textInputProps: {
                label: 'Title',
                left: <TextInput.Icon icon={'folder'} />,
                mode: 'flat',

                underlineColor: '#ffffff',
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
                mode: 'flat',
                left: <TextInput.Icon icon={'pen'} />,
                multiline: true,
                numberOfLines: 4,
                underlineColor: '#ffffff',
              },
            },
          ]}
        />

        <View style={tw('flex-row my-4 bg-violet-200/50 p-6')}>
          <RangeDatePicker />

          <TimePicker />
        </View>
        {/* <TouchableOpacity style={tw('my-2')}>
          <View style={tw('flex-row ')}>
            <IconButton
              icon="plus-circle-outline"
              size={40}
              onPress={startAddMilestone}
            />
            <Text style={tw('text-xl mt-4')}>Add Milestone</Text>
          </View>
        </TouchableOpacity> */}

        {/* <AddMilestoneInput
          visible={modalIsVisible}
          // onAddGoal={AddGoal}
          onCancel={endAddMilestone}
        /> */}

        {/* <View style={tw('ml-auto')}>
          <IconButton
            icon="plus-circle-outline"
            size={60}
            onPress={() => console.log('Pressed')}
          />
        </View> */}
        <Button 
          mode={'contained'}
          
          onPress={handleSubmit(({title, description, folderName}) => {
            console.log('onCreate', title, description, folderName);
            const title_input = title;
            const description_input = description;
            const folderName_input = folderName;
            console.log("check",startTime,endTime,startDate,endDate)
            dispatch(
              postGoalItemThunk({
                folderName: folderName_input,
                type: PurposeType.setGoal,
                title: title_input,
                description: description_input,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                endTime: endTime,
                is_favourite: false,
                cover_image:"",
              }),
            );
            
            
            
          })}

          
          >
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
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 16,
    // justifyContent: "center",
    margin: 10,
    // alignItems: "center",
    borderBottomColor: '#cccccc',
  },

  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
  },

  button: {
    width: 100,
    margin: 16,
    marginHorizontal: 8,
    flex: 1,
  },

  content: {
    height: 100,
  },
});

export default GoalInput;
function resetField(arg0: string) {
  throw new Error('Function not implemented.');
}

