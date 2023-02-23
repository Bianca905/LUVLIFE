export interface IDailyFolder {
    id: number;
    name: string;
    cover_image: string;
    is_favourite: boolean;
    // is_deleted: boolean;
}

export enum PurposeType {
    setGoal = "setGoal",
    setTodo = "setTodo",
    setRemainder = "setRemainder",
}

export interface IPurpose {
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
    // finished_at: string;
    is_favourite: boolean;
    is_delete: boolean;
}

export interface Imilestone {
    id: number;
    purpose_id: number;
    title: string;
    description: string;
    start_date: string;
    start_time: string;
    due_date: string;
    due_time: string;
    // finished_at: string;
    // is_favourite: boolean;
    is_delete: boolean;
}
export enum MilestoneType {
    image = "image",
    weblink = "weblink",
    location = "location",
    voice = "voice"
}
export interface Iattachment {
    id: number;
    milestone_id: number;
    purpose_id: number;
    type: MilestoneType
    title: string;
    voice_name: string;
    audioFile_name: string;
    location_address: string;
    image_name: string;
    imageFile_name: string;
    weblink_url: string;
    description: string;
    is_delete: boolean;
}