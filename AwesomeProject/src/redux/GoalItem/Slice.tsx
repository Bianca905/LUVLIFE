import {GoalItem, GoalItemState, PurposeType} from './State';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getAllGoalItemDateRangeThunk, postGoalItemThunk,getAllGoalItemThunk, getAllGoalItemsForLoggedInThunk} from './thunk';
import {useRootSelector} from '../store';

const initGoalItemState: GoalItemState = {
  goalItems: [
    // {
    //   id: 1,
    //   tittle: 'travel around the world',
    //   description: 'Japan',
    //   startDate:'2023-01-01',
    //   endDate: '2023-02-02',
    //   startTime: '11:25',
    //   is_completed: false,
    // },
    
  ],
  inputfield: undefined,
  history: [],
  loading: false,
  error: undefined,
  is_created: false,
  input_start_time: '',
  input_end_time: '',
  input_start_date: '',
  input_end_date: '',
  input_finished_at:'',
  input_is_favourite:false,
  input_is_delete: false,
  input_folder_id:null,
  input_type: null,
  input_image:null,
  selected_goal_item_id: null,
  input_imageName: '',
  
  
  

};

////////////////
// Thunk
////////////////

////////////////
// Slice
////////////////

const goalItemSlice = createSlice({
  name: 'goalItem',
  initialState: initGoalItemState,
  reducers: {
    getStartTime: (state, action: PayloadAction<{startTime: string}>) => {
      state.input_start_time = action.payload.startTime;
    },

    getEndTime: (state, action: PayloadAction<{endTime: string}>) => {
      state.input_end_time = action.payload.endTime;
    },
    getDateRange: (
      state,
      action: PayloadAction<{startDate: string; endDate: string}>,
    ) => {
      // const newDateRange = {
      //   startDate: action.payload.startDate,
      //   endDate: action.payload.endDate,
      // };
      // console.log('date range', newDateRange);
      state.input_start_date = action.payload.startDate;
      state.input_end_date = action.payload.endDate;
    },

    getSelectedGoalItemId:(state, action:PayloadAction<{id:number}> ) => {
      console.log("selected for details id",action.payload.id)
      state.selected_goal_item_id = action.payload.id
       
    },
    getSelectedImage: (state,action:PayloadAction<{image_uri:string}>) => {
      console.log("selected image uri:", action.payload)
      state.input_image = action.payload.image_uri;
    },
    getSelectedImageName: (state,action:PayloadAction<{image_name:string}>) => {
      console.log("selected image uri:", action.payload)
      state.input_imageName = action.payload.image_name;
    }
    ,
    createGoalItem: (
      state,
      action: PayloadAction<{
        id: number;
        folder_id: number;
        type: PurposeType;
        tittle: string;
        description: string;
        startDate: string;
        endDate: string;
        startTime: string;
        endTime: string;
        is_completed: boolean;
        finished_at: string | null;
        is_favourite: boolean;
        is_delete: boolean;
        random_color: string | null
        
      }>,
    ) => {
      const newGoalItem = {
        id: (state.goalItems.length - 1 || 0) + 1,
        title: action.payload.tittle,
        folder_id: (state.goalItems.length - 1 || 0) + 1,
        type: action.payload.type,
        description: action.payload.description,
        startDate: state.input_start_date,
        endDate: state.input_end_date,
        startTime: state.input_start_time,
        endTime: state.input_end_time,
        is_completed: false,
        finished_at: '',
        is_favourite: false,
        is_delete: false,
        random_color: null
       
        
      };

      state.goalItems.push(newGoalItem);
    },

    editGoalItem: (state, action: PayloadAction<GoalItem>) => {
      let targetIdx = state.goalItems.findIndex(
        item => item.id === action.payload.id,
      );
      state.goalItems[targetIdx] = {...action.payload};
    }
  },

  extraReducers: builder =>
    builder

      .addCase(postGoalItemThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.input_folder_id=action.payload.folder_id

        console.log('check action payload', action.payload);
   
        
      })

      .addCase(postGoalItemThunk.pending, state => {
        state.loading = true;
      })

      .addCase(postGoalItemThunk.rejected, (state, action) => {
        state.loading = false;
        console.log('error', action.payload);
      })


      .addCase(getAllGoalItemThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.is_created =true;
        console.log('check action payload', action.payload);
        state.goalItems = action.payload;
      })

      .addCase(getAllGoalItemThunk.pending, state => {
        state.loading = true;
      })

    

      .addCase(getAllGoalItemThunk.rejected, (state, action) => {
        state.loading = false;
        console.log('error', action.payload);
      })

      .addCase(getAllGoalItemsForLoggedInThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.is_created =true;
        console.log('check action payload get all goal items', action.payload);
        state.goalItems = action.payload;
      })

      .addCase(getAllGoalItemsForLoggedInThunk.pending, state => {
        state.loading = true;
      })

      .addCase(getAllGoalItemsForLoggedInThunk.rejected, (state, action) => {
        state.loading = false;
        console.log('error', action.payload);
      })

      .addCase(getAllGoalItemDateRangeThunk.fulfilled, (state, action) => {
        state.loading = false;
        // state.is_created =true;
        console.log('check action payload', action.payload);
        
        state.input_end_date = action.payload.endDate;
        state.input_start_date = action.payload.startDate;
      })

      .addCase(getAllGoalItemDateRangeThunk.pending, state => {
        state.loading = true;
      })

      .addCase(getAllGoalItemDateRangeThunk.rejected, (state, action) => {
        state.loading = false;
        console.log('error', action.payload);
      }),

     
});

export const {
  createGoalItem,
  editGoalItem,
  getDateRange,
  getStartTime,
  getEndTime,
  getSelectedGoalItemId,
  getSelectedImage
} = goalItemSlice.actions;



export const goalItemReducer = goalItemSlice.reducer;
