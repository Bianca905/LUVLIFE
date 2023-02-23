import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import {FormBuilder, Logic} from 'react-native-paper-form-builder';
import {TextInput, IconButton, MD3Colors, Button} from 'react-native-paper';
import RangeDatePicker from '../../../AddGoal/RangeDatePicker';
import TimePicker from '../../../AddGoal/TimePicker';
import {useTailwind} from 'tailwind-rn/dist';
import AddMilestoneInput from '../../../AddMilestone/AddMilestoneInput';
import {useRootDispatch, useRootSelector} from '../../../../redux/store';
import {postGoalItemThunk} from '../../../../redux/GoalItem/thunk';
import {tr} from 'react-native-paper-dates';
import AttachmentTemplate from '../AttachmentTemplate';
import { PurposeType } from '../../../models';

const FolderTemplateGoalInput = () => {
  const tw = useTailwind();
  const startTime = useRootSelector(state => state.goalItem.input_start_time);
  const startDate = useRootSelector(state => state.goalItem.input_start_date);
  const endDate = useRootSelector(state => state.goalItem.input_end_date);
  const endTime = useRootSelector(state => state.goalItem.input_end_time);

  const [showRemainderSecondPart, setShowRemainderSecondPart] = useState(false);
  function toggleRemainderSecondPart() {
    setShowRemainderSecondPart(!showRemainderSecondPart)
}

  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      title: '',
      description: '',
      // cover_image: "",
      folderName:"",
    },
    mode: 'onChange',
  });
  const dispatch = useRootDispatch();

  return (
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
                // mode: 'flat',
                underlineColor: '#ffffff',
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
                // mode: 'flat',
                multiline: true,
                numberOfLines: 4,
                underlineColor: '#ffffff',
                // selectionColor:'#D2DAFF',
                left: <TextInput.Icon icon={'pen'} />,
              },
            },
          ]}
      />
      {/* <View>

      </View> */}

      <View style={tw('flex-row mb-5')}>
        <RangeDatePicker />
        <TimePicker />
      </View>
      <TouchableOpacity style={styles.attachmentGrp} onPress={toggleRemainderSecondPart}>
          <IconButton icon="plus" iconColor='#ffffff' style={styles.controlBtns} ></IconButton>
          <Text style={{ color: "#000000" }}>Add attachment</Text>
      </TouchableOpacity>
      {showRemainderSecondPart && <AttachmentTemplate />}

      {/* <TouchableOpacity style={tw('my-2')}>
        <View style={tw('flex-row ')}>
          <IconButton
            icon="plus-circle-outline"
            size={40}
            // onPress={startAddMilestone}
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
        onPress={handleSubmit(({title, description,folderName}) => {
          console.log('onCreate', title, description,folderName);
          const title_input = title;
          const description_input = description;
          const folderName_input = folderName;
          dispatch(
            postGoalItemThunk({
              folderName: folderName_input,
              type: PurposeType.setGoal,
              title: title_input,
              cover_image: "",
              description: description_input,
              startDate: startDate,
              startTime: startTime,
              endDate: endDate,
              endTime: endTime,
              is_favourite: false,
            }),
          );
          // dispatch(createGoalItem(data));
          // console.log('dispatch', data);
        })}>
        Create
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  attachmentGrp: { flexDirection: 'row', alignItems: "center", justifyContent: "flex-start", marginRight: "60%" },
  controlBtns: {backgroundColor: "#000000", opacity: 0.7, width: 25, height: 25,
        borderRadius: 50,  margin: 10, justifyContent: "center", alignItems: "center",
    },
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

  backgound: {
    backgroundColor: '#D2DAFF',
  },
});

export default FolderTemplateGoalInput;
