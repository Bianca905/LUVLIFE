import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {useTailwind} from 'tailwind-rn';
import {Button, TextInput, Snackbar, Checkbox, List} from 'react-native-paper';
import AvatarImage from '../components/Avatar';
import GenderButton from '../components/AddGoal/GenderButton';
import {FormBuilder, Logic} from 'react-native-paper-form-builder';
import {useController, useForm} from 'react-hook-form';
import {useRootDispatch, useRootSelector} from '../redux/store';
import {editProfile} from '../redux/Auth';
import {editProfileThunk, logoutThunk} from '../redux/Auth/thunk';
import {LogicProps} from 'react-native-paper-form-builder/dist/Types/Types';
import AppsStyle from '../components/AppsStyle/AppsStyle';

function Profile(props: LogicProps) {
  const tw = useTailwind();
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const [text, setText] = React.useState('');
  const dispatch = useRootDispatch();
  const username = useRootSelector(state => state.auth.username!);
  console.log('profile username', username);
  const password = useRootSelector(state => state.auth.password!);
  const email = useRootSelector(state => state.auth.email!);
  const dob = useRootSelector(state=> state.auth.dateOfbirth);
  let dateOfbirth;
  if(dob){
    dateOfbirth = dob.toString().slice(0,10);
  }else{
    dateOfbirth = undefined;
  }
  const mobile = useRootSelector(state => state.auth.mobile!);
  const gender = useRootSelector(state => state.auth.gender!);
  const address = useRootSelector(state => state.auth.address!);
  const id = useRootSelector(state => state.auth.id!);
  const avatar = useRootSelector(state => state.auth.avatar!);
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      id: id,
      avatar: avatar,
      username: username,
      email: email,
      dateOfbirth: dateOfbirth,
      mobile: mobile,
      gender: gender,
      address: address,
      password: password,
    },
    mode: 'onChange',
  });
  

  
  
  return (
    <AppsStyle title="Profile">
    <ScrollView>
      <View style={tw('p-6 ')}>
        <View style={tw('mb-10 ')}>
          <AvatarImage />
        </View>

        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'text',
              name: 'username',
              // defaultValue= {formValue.username},
              textInputProps: {
                label: 'Username',
                placeholder: username,
                mode: 'flat',
                left: <TextInput.Icon icon={'account'} />,
              },
            },

            {
              type: 'email',
              name: 'email',

              textInputProps: {
                label: 'Email',
                placeholder: email,
                mode: 'flat',
                left: <TextInput.Icon icon={'email'} />,
              },
            },

            {
              type: 'text',
              name: 'dateOfbirth',

              textInputProps: {
                label: 'Date of birth',
                placeholder: dateOfbirth,
                mode: 'flat',
                left: <TextInput.Icon icon={'cake-variant'} />,
              },
            },

            {
              type: 'text',
              name: 'mobile',

              textInputProps: {
                label: 'Mobile',
                placeholder: mobile,
                mode: 'flat',
                left: <TextInput.Icon icon={'cellphone'} />,
              },
            },

            {
              type: 'select',
              name: 'gender',

              textInputProps: {
                label: 'Gender',
                placeholder: gender,
                mode: 'flat',
                left: <TextInput.Icon icon={'gender-male-female-variant'} />,
              },

              options: [
                {
                  value: 'female',
                  label: 'Female',
                },
                {
                  value: 'male',
                  label: 'Male',
                },
              ],
            },

            {
              type: 'text',
              name: 'address',

              textInputProps: {
                label: 'Address',
                // placeholder:mobile,
                mode: 'flat',
                left: <TextInput.Icon icon={'home'} />,
              },


            },


         
       
          ]}
        />
        <View style={tw('mt-14')}>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Go back',
              onPress: () => {
                // Do something
              },
            }}>
            Sucess upload profile info
          </Snackbar>
        </View>

        <View style={tw('mt-2')}>
          <Button
            mode={'contained'}
            onPress={handleSubmit(
              ({username, email, dateOfbirth, mobile, address, gender}) => {
                // console.log('profile data', data);
                dispatch(
                  editProfileThunk({
                    id,
                    password,
                    username,
                    email,
                    dateOfbirth,
                    mobile,
                    address,
                    gender,
                    avatar,
                  }),
                );
                console.log(
                  'diapatch profile data',
                  id,
                  username,
                  password,
                  email,
                  dateOfbirth,
                  mobile,
                  address,
                  gender,
                );

                onToggleSnackBar();
              },
            )}>
            Comfirm edit
            {visible ? '' : ''}
          </Button>
        </View>

        <View style={tw('mt-6')}>
          <Button
            onPress={() => {
              dispatch(logoutThunk());
            }}
            mode={'contained'}>
            Logout
          </Button>
        </View>
        
      
      </View>
      </ScrollView>
    </AppsStyle>
  );
}




const styles = StyleSheet.create({});

export default Profile;
