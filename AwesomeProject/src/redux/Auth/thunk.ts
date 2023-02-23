import {createAsyncThunk} from '@reduxjs/toolkit';
import {editProfile} from './Slice';
import {AuthState} from './State';
import {REACT_APP_API_SERVER} from '../store';
const hostname = '192.168.160.95';
const port = 8080;

console.log('check', process.env);
export const signUpThunk = createAsyncThunk<
  void,
  {
    username: string;
    email: string;
    password: string;
  },
  {rejectValue: string}
>('auth/signUp', async ({username, email, password}, thunkAPI) => {
  try {
    console.log('check dispatch thunk sign up', username, email, password);
    const res = await fetch(`${REACT_APP_API_SERVER}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });

    const signUpResult = await res.json();
    console.log('check response', signUpResult);
    return signUpResult;

    // const userInfo = await fetch(`http://${hostname}:${port}/users/profile`,{
    //   method : "GET",
    //   headers : {
    //     "Content-Type" : "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId : 2
    //   })

    // })

    // return userInfo
  } catch (error) {
    return thunkAPI.rejectWithValue('User cannot post');
  }
});

export const loginThunk = createAsyncThunk<
  {
    id: number;
    username: string;
    // password: string;
    email: string;
    gender: string;
    avatar: string;
    dateOfbirth: string;
    mobile: string;
    address: string;
    // isAuth:boolean
  },
  {email: string; password: string},
  {rejectValue: string}
>('auth/login', async ({email, password}, thunkAPI) => {
  try {
    console.log('check dispatch thunk login');
    console.log('check api in login', REACT_APP_API_SERVER);
    const res = await fetch(`${REACT_APP_API_SERVER}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const result = await res.json();
    console.log('check response', result);

    const resUserInfo = await fetch(`${REACT_APP_API_SERVER}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userInfoResult = await resUserInfo.json();

    const user_id_input = userInfoResult.result.id;
    const user_username_input = userInfoResult.result.username;
    const user_email_input = userInfoResult.result.email;
    const user_avatar_input = userInfoResult.result.avatar;
    const user_gender_input = userInfoResult.result.gender;
    const user_dateOfbirth_input = userInfoResult.result.date_of_birth;
    const user_mobile_input = userInfoResult.result.mobile;
    const user_address_input = userInfoResult.result.address;
    // const user_password_input = userInfoResult.result.password;

    console.log(
      'check userInfoResult',
      user_email_input,
      user_username_input,
      user_id_input,
      user_address_input,
      user_avatar_input,
      user_dateOfbirth_input,
      user_gender_input,
      user_mobile_input,
    );
    return {
      email: user_email_input,
      id: user_id_input,
      username: user_username_input,
      // password: user_password_input,
      avatar: user_avatar_input,
      gender: user_gender_input,
      dateOfbirth: user_dateOfbirth_input,
      mobile: user_mobile_input,
      address: user_address_input,
    };
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('user cannot fetch');
  }
});

export const editProfileThunk = createAsyncThunk<
  {
    username: string;
    email: string;
    dateOfbirth: string;
    mobile: string;
    gender: string;
    address: string;
    avatar: string;
  },
  {
    id: number;
    username: string;
    password:string,
    email: string;
    dateOfbirth: string| undefined;
    mobile: string;
    gender: string;
    address: string;
    avatar: string;
  },
  {rejectValue: string}
>(
  'auth/editPofile',
  async (
    {id,password, username, email, dateOfbirth, mobile, gender, address, avatar},
    thunkAPI,
  ) => {
    try {
      const formData= new FormData();
      formData.append("password",password)
      formData.append("username",username)
      formData.append("email",email)
      formData.append("date_of_birth",dateOfbirth)
      formData.append("mobile",mobile)
      formData.append("gender",gender)
      formData.append("address:",address)
      formData.append("avatar",avatar)
      
      const res = await fetch(
        `http://${hostname}:${port}/users/updateProfile`,
        {
          method: 'PUT',
          body: formData
        },
      );

     console.log('edit profile form data', formData)
      const updatedUserInfoData = await res.json();
      console.log('update user info thunk', updatedUserInfoData);
      

      const getUserInfoRes = await fetch(`${REACT_APP_API_SERVER}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await getUserInfoRes.json();
      console.log("user info result",result);
      return result;

    


    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue('edit profile fail');
    }
  },
);

export const logoutThunk = createAsyncThunk<
  {is_login: boolean},
  void,
  {rejectValue: string}
>('auth/logout', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${REACT_APP_API_SERVER}/users/logout`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    console.log(result);
    const data = {is_login: false};
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('logout fail');
  }
});

export const getProfileInfoThunk = createAsyncThunk<
  {userId: number},
  void,
  {rejectValue: string}
>('auth/getProfileInfo', async (_, thunkAPI) => {
  try {
    const res = await fetch(`${REACT_APP_API_SERVER}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue('get profile info fail');
  }
});
