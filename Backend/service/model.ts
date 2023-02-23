export enum Gendertype {
    male = "male",
    female = "female",
}
export interface User {
    id: number;
    email: string;
    password: string;
    username: string;
    avatar: string;
    gender: Gendertype;
    date_of_birth: string;
    mobile: number;
    address: string;
    is_login: boolean
}

export interface Folder {
    id: number;
    user_id: number;
    name: string;
    cover_image: string;
    is_favourite: boolean;
    is_delete: boolean;
}

export enum PurposeType {
    setGoal = "setGoal",
    setTodo = "setTodo",
    setRemainder = "setRemainder",
}

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
    is_delete:boolean   
}

export interface Milestone {
    id: number;
    purpose_id: number;
    title: string;
    description: string;
    start_date: string;
    start_time: string;
    due_date: string;
    due_time: string;
    finished_at: string;
    is_delete: boolean;
}

export enum AttachmentType {
    voice = "voice",
    location = "location",
    image = "image",
    weblink = "weblink",
}

export interface Attachment {
    id: number;
    milestone_id: number;
    purpose_id: number;
    type: AttachmentType;
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

// export interface Voice {
//     id: number;
//     name: string;
//     attachment_id: number;
// }
// export interface Location {
//     id: number;
//     address: string;
//     attachment_id: number;
// }
// export interface Image {
//     id: number;
//     name: string;
//     attachment_id: number;
// }
// export interface Weblink {
//     id: number;
//     url: string;
//     attachment_id: number;
// }