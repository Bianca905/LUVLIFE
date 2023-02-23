
export interface Folder {
  id: number;
  user_id: number;
  name: string;
  is_favourite: boolean;
  is_delete: boolean;
  cover_image:string
}

export enum PurposeType {
  setGoal = "setGoal",
  setTodo = "setTodo",
  setRemainder = "setRemainder",
}



export interface GoalItem {
    id: number | null;
    folder_id: number;
    type: PurposeType;
    title: string;
    description: string | null; 
    startDate: string | null;
    endDate : string | null;
    startTime: string | null;
    endTime: string | null;
    is_completed: boolean ;
    finished_at: string | null;
    is_favourite: boolean;
    is_delete:boolean;
    random_color: string | null
    
    
}

export interface GoalItemState {
  goalItems: Array<GoalItem>; 
  inputfield: string | undefined | null;
  history:Array<string>;
  loading:boolean;
  error: string | undefined;
  is_created : boolean;
  input_start_time:string;
  input_start_date:string;
  input_end_date:string;
  input_end_time:string;
  input_finished_at:string | null;
  input_is_favourite:boolean;
  input_is_delete: boolean;
  input_folder_id:number | null;
  input_type: PurposeType | null;
  input_image: string | null;
  selected_goal_item_id:number | null;
  input_imageName: string;

  
}
  
