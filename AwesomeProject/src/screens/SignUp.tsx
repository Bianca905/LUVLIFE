import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {FormBuilder, Logic} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';

import {useTailwind} from 'tailwind-rn';
import {Button, TextInput} from 'react-native-paper';
import LoggedIn from './LoggedIn';
import {useRootSelector, useRootDispatch} from '../redux/store';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import {signUp} from '../redux/Auth';
import AddGoal from './AddGoal';
import RootNavigator, {RootStackParamList} from '../navigator/RootNavigator';
import TabNavigator from '../navigator/TabNavigator';
import {signUpThunk} from '../redux/Auth/thunk';

function SignUp() {
  const tw = useTailwind();
  const navigation = useNavigation<RootStackParamList>();
  const dispatch = useRootDispatch();
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const isAuth = useRootSelector(state => state.auth.isAuth);
  return (
    <ScrollView>
      {isAuth ? (
        <TabNavigator />
      ) : (
        <View style={styles.mainContainer}>
          <Text style={tw('mb-8 text-4xl')}>Sign up</Text>
          <Text style={tw('mb-20 text-xl')}>
            Please fill information to create an account and sign up to continue
          </Text>
          <FormBuilder
            control={control}
            setFocus={setFocus}
            formConfigArray={[
              {
                type: 'text',
                name: 'username',
                rules: {
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                },
                textInputProps: {
                  label: 'Username',
                  left: <TextInput.Icon icon={'account'} />,
                },
              },

              {
                type: 'email',
                name: 'email',

                rules: {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                },
                textInputProps: {
                  label: 'Email',
                  left: <TextInput.Icon icon={'email'} />,
                },
              },
              {
                type: 'password',
                name: 'password',
                rules: {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                },
                textInputProps: {
                  label: 'Password',
                  left: <TextInput.Icon icon={'lock'} />,
                },
              },
            ]}
          />

          <View style={tw('mt-6')}>
            <Button
              mode={'contained'}
              onPress={handleSubmit(({username, email, password}) => {
                console.log(username, email, password);
                const username_input = username;
                const email_input = email;
                const password_input = password;

                dispatch(
                  signUpThunk({
                    username: username_input,
                    email: email_input,
                    password: password_input,
                  }),
                );


                navigation.navigate('Login')
              })}>
              Sign Up
            </Button>
          </View>

          <View style={tw('mt-4  flex-row ')}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={tw('text-blue-600')}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //   justifyContent: "center",
    // alignItems: "center",
    padding: 15,
  },

  inputContainer: {
    marginTop: 100,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },

  text: {
    marginTop: 20,
  },

  button: {
    marginTop: 40,
  },
});

export default SignUp;
