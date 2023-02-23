// import {createSlice} from '@reduxjs/toolkit'
// import type {PayloadAction} from "@reduxjs/toolkit"

export interface AuthState {
    isAuth :boolean;
    id:number | null;
    username : string | null
    password:string | null
    email: string | null
    avatar:string | null
    dateOfbirth:string | null
    mobile: string | null
    gender : string | null
    address: string | null

}

