import {createAsyncThunk} from '@reduxjs/toolkit';
import {useState} from 'react';
import {REACT_APP_API_SERVER} from '../store';

import {GoalItem, GoalItemState, PurposeType} from './State';

const hostname = '192.168.160.95';
const port = 8080;

export interface Purpose {
  id: number;
  // user_id: number;
  folder_id: number;
  type: PurposeType;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  due_date: string;
  due_time: string;
  finished_at: string;
  is_favourite: boolean;
  is_delete: boolean;
  random_color: string | null;
}

export const postGoalItemThunk = createAsyncThunk<
  {
    folder_id: number;
    id: number;
    type: PurposeType;
    tittle: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    is_favourite: boolean;
  },
  {
    folderName: string;
    type: PurposeType;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    is_favourite: boolean;
    cover_image: string | undefined;
  },
  {rejectValue: string}
>(
  'goalItem/postGoalItem',
  async (
    {
      folderName,
      type,
      title,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      is_favourite,
      cover_image,
    },
    thunkAPI,
  ) => {
    try {
      console.log('check folder input ', folderName);

      const formData = new FormData();
      formData.append('name', folderName);
      formData.append('is_favourite', is_favourite);
      formData.append('cover_image', cover_image);
      const resInsertFolder = await fetch(
        `${REACT_APP_API_SERVER}/core/insertFolder`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const insertFolderResult: {message: string; result: Array<{id: number}>} =
        await resInsertFolder.json();
      console.log('insert folder result', insertFolderResult);
      const folder_id = insertFolderResult.result[0].id;

      // const goalItemFormData = new FormData()
      // goalItemFormData.append("folder_id",folder_id)
      // goalItemFormData.append("type",type)
      // goalItemFormData.append("title",title)
      // goalItemFormData.append("description",description)
      // goalItemFormData.append("startDate",startDate)
      // goalItemFormData.append("endDate",endDate)
      // goalItemFormData.append("startTime",startTime)
      // goalItemFormData.append("endTime",endTime)
      // goalItemFormData.append("is_favourite",startDate)
      console.log(
        'check before fetch ',
        startDate,
        endDate,
        startTime,
        endTime,
      );
      const res: any = await fetch(
        `${REACT_APP_API_SERVER}/core/insertPurpose`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder_id: folder_id,
            type: type,
            title: title,
            description: description,
            start_date: startDate,
            start_time: startTime,
            due_date: endDate,
            due_time: endTime,
            is_favourite: is_favourite,
          }),
        },
      );
      const result = await res.json();
      console.log('check dispatch thunk param', result);

      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue('Goal items cannot post');
    }
  },
);

// this was suppposed to get all setGoal type purpose of user
export const getAllGoalItemThunk = createAsyncThunk<
  Array<GoalItem>,
  void,
  {rejectValue: string}
>('goalItem/getAllGoalItem', async (_, thunkAPI) => {
  try {
    const getFolderRes = await fetch(`${REACT_APP_API_SERVER}/core/getFolder`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const folderInfoResult = await getFolderRes.json();
    console.log('folder info result', folderInfoResult);

    const resp = await fetch(`${REACT_APP_API_SERVER}/core/getPurpose`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folder_id: [],
      }),
    });
    const response = await resp.json();
    const result: Purpose[] = response.result;
    console.log('check fetched data', result);

    const random_color_gen = ()=>{
      let randomColor =
      'rgb(' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ')';
      return randomColor
    }
    let color_array:Array<string>=[];

    result.forEach(element => {
      console.log("hihihi",element)
      color_array.push(random_color_gen());
    })
    console.log("important",color_array)
    const data: Array<GoalItem> = [];

    result.forEach((element,index) => {
 
      let mappedElement: GoalItem = {
        id: element.id,
        folder_id: element.folder_id,
        type: element.type,
        title: element.title,
        description: element.description,
        startDate: element.start_date,
        endDate: element.due_date,
        startTime: element.start_time,
        endTime: element.due_time,
        is_completed: element.finished_at ? true : false,
        finished_at: element.finished_at,
        is_favourite: element.is_favourite,
        is_delete: element.is_delete,
        random_color: color_array[index],
      };
      console.log('check thunk pushing item', mappedElement);
      data.push(mappedElement);
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Goal items cannot be fetched');
  }
});

export const getAllGoalItemsForLoggedInThunk = createAsyncThunk<
  Array<GoalItem>,
  void,
  {rejectValue: string}
>('goalItem/getGoalItemsForLoggedIn', async (_, thunkAPI) => {
  try {
    const resp = await fetch(`${REACT_APP_API_SERVER}/core/getGoalItems`);
    const response = await resp.json();
    const result: Purpose[] = response.result;
    console.log('check fetched data', result);
    const random_color_gen = ()=>{
      let randomColor =
      'rgb(' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ',' +
      Math.floor(Math.random() * 255) +
      ')';
      return randomColor
    }
    let color_array:Array<string>=[];

    result.forEach(element => {
      console.log("hihihi",element)
      color_array.push(random_color_gen());
    })
    console.log("important",color_array)

    const data: Array<GoalItem> = [];
    result.forEach((element,index) => {
      let mappedElement: GoalItem = {
        id: element.id,
        folder_id: element.folder_id,
        type: element.type,
        title: element.title,
        description: element.description,
        startDate: element.start_date,
        endDate: element.due_date,
        startTime: element.start_time,
        endTime: element.due_time,
        is_completed: element.finished_at ? true : false,
        finished_at: element.finished_at,
        is_favourite: element.is_favourite,
        is_delete: element.is_delete,
        random_color: color_array[index],
      };
      console.log('check thunk pushing item', mappedElement);
      data.push(mappedElement);
    });

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Goal items cannot be fetched');
  }
});

export const getAllGoalItemDateRangeThunk = createAsyncThunk<
  {id: number; startDate: string; endDate: string}, // return id:goal item id,start_date,end_date
  void,
  {rejectValue: string}
>('goalItem/getAllGoalItemDateRange', async (_, thunkAPI) => {
  try {
    const res = await fetch(
      `${REACT_APP_API_SERVER}/core/getPurposeDateRange`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      },
    );
    const getGoalItemDateRange = await res.json();
    console.log('check goal item date range', getGoalItemDateRange);
    return getGoalItemDateRange;
  } catch (error) {
    return thunkAPI.rejectWithValue('goal item date range cannot get');
  }
});

// select start_date,due_date from purposes where type='setGoal',id=1;

export const deleteGoalItemThunk = createAsyncThunk<
  void,
  {id: number},
  {rejectValue: string}
>('goalItem/deleteGoalItem', async ({id}, thunkAPI) => {
  try {
    console.log('check dispatch thunk delete goal item', id);
    const res = await fetch(`${REACT_APP_API_SERVER}/core/deletePurpose`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const deleteGoalItemResult = await res.json();
    console.log('check delete goalitem response', deleteGoalItemResult);
    return deleteGoalItemResult;
  } catch (error) {
    return thunkAPI.rejectWithValue('goal item cannot delete');
  }
});

// select folders.id as folder_id,type,title,description,start_date,start_time,due_date,due_time,purposes.is_favourite from folders join purposes on folders.id=purposes.folder_id where user_id=3 and purposes.type='setGoal';

export const postReminderThunk = createAsyncThunk<
  {
    folder_id: number;
    id: number;
    type: PurposeType;
    tittle: string;
    description: string;
    is_favourite: boolean;
  },
  {
    folderName: string;
    type: PurposeType;
    title: string;
    description: string;
    is_favourite: boolean;
    cover_image: string | undefined;
    selected_image: string | null;
    image_name: string;
  }, { rejectValue: string }>(
    'reminder/postReminder',
    async ({ folderName, type, title, description, is_favourite, cover_image, selected_image, image_name}, thunkAPI,) => {
      try {
        const formData = new FormData();
        formData.append("name", folderName)
        formData.append("is_favourite", is_favourite)
        formData.append("cover_image", cover_image)

        const folderRes = await fetch(`${REACT_APP_API_SERVER}/core/insertFolder`,
          {
            method: "POST",
            body: formData,
          })
        const folderData: { message: string; result: Array<{ id: number }> } = await folderRes.json()
        const folder_id = folderData.result[0].id;
        
        const purposeRes = await fetch(`${REACT_APP_API_SERVER}/core/insertPurpose`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folder_id: folder_id,
            type: type,
            title: title,
            description: description,
            is_favourite: is_favourite,
          })
        })
        const purposeData = await purposeRes.json()
        console.log('check insert purpose response', purposeData.result[0].id)
        const attachmentFormData = new FormData();
        attachmentFormData.append('purpose_id', purposeData.result[0].id);
        attachmentFormData.append('type', "image")
        attachmentFormData.append('title','testImageTitle')
        attachmentFormData.append('image_name', image_name)
        attachmentFormData.append('imageFile_name', { uri: selected_image, type: 'image/jpg' })
        console.log("check attachment formdata",attachmentFormData)
        const attachmentRes = await fetch(`${REACT_APP_API_SERVER}/core/insertPurposeAttachment`, {
          method: 'POST',
          body: attachmentFormData
        })
        const attachmentData = await attachmentRes.json()
        console.log(attachmentData)

        return purposeData
      } catch (err) {
        return thunkAPI.rejectWithValue("cannot post reminder")
      }
    }
  );