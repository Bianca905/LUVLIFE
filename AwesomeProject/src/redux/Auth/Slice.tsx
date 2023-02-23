import {AuthState} from './State';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {
  editProfileThunk,
  getProfileInfoThunk,
  loginThunk,
  logoutThunk,
  signUpThunk,
} from './thunk';

//step 1-InitState
const initAuthState: AuthState = {
  isAuth: false,
  id: null,
  username: null,
  password: null,
  email: null,
  avatar: null,
  dateOfbirth: null,
  mobile: null,
  gender: null,
  address: null,
};

//step 2 - Slice

const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    signUp: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
      }>,
    ) => {
      state.isAuth = true;
      // state.username = action.payload.username;
      // state.email = action.payload.email;
    },

    editProfile: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        // image: string | null;
        dateOfbirth: string | null;
        mobile: string | null;
        gender: string | null;
      }>,
    ) => {
      state.isAuth = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      // state.image = action.payload.image;
      state.dateOfbirth = action.payload.dateOfbirth;
      state.mobile = action.payload.mobile;
      state.gender = action.payload.gender;
    },
  },

  extraReducers: bulider =>
    bulider

      .addCase(signUpThunk.fulfilled, (state, action) => {
        // state.isAuth = true;

        console.log('check user payload', action.payload);
      })

      .addCase(signUpThunk.pending, (state, action) => {
        console.log('pending', action.payload);
      })

      .addCase(signUpThunk.rejected, (state, action) => {
        console.log('error', action.payload);
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("action.payload username email",action.payload)
        state.isAuth = true;
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.avatar = action.payload.avatar;
        // state.password = action.payload.password;
        state.address = action.payload.address;
        state.gender = action.payload.gender;
        state.mobile = action.payload.mobile;
        state.dateOfbirth = action.payload.dateOfbirth

        
      })

      .addCase(loginThunk.pending, (state, action) => {
        console.log('pending', action.payload);
      })

      .addCase(loginThunk.rejected, (state, action) => {
        console.log('error', action.payload);
      })

      .addCase(getProfileInfoThunk.fulfilled, (state, action) => {
        console.log('get profile info success', action.payload);
      })

      .addCase(getProfileInfoThunk.pending, (state, action) => {
        console.log('pending', action.payload);
      })

      .addCase(getProfileInfoThunk.rejected, (state, action) => {
        console.log('error', action.payload);
      })

      .addCase(editProfileThunk.fulfilled, (state, action) => {
        state.isAuth = true
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.dateOfbirth = action.payload.dateOfbirth;
        state.mobile = action.payload.mobile;
        state.gender = action.payload.gender;
        state.address = action.payload.address;
        state.avatar = action.payload.avatar
        console.log('update profile success', action.payload);
      })

      .addCase(editProfileThunk.pending, (state, action) => {
        console.log('pending', action.payload);
      })

      .addCase(editProfileThunk.rejected, (state, action) => {
        console.log('error', action.payload);
      })

      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isAuth = false;
        console.log('logout success', action.payload);
      })

      .addCase(logoutThunk.pending, (state, action) => {
        console.log('pending', action.payload);
      })

      .addCase(logoutThunk.rejected, (state, action) => {
        console.log('error', action.payload);
      }),
});

//step 3 - Action Creator

export const {signUp, editProfile} = authSlice.actions;

//step 4 - Reducer

export const authReducer = authSlice.reducer;
