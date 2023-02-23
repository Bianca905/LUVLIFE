import {configureStore} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook , useSelector} from 'react-redux'
import {AuthState, authReducer} from '../redux/Auth/index'
import { GoalItemState, goalItemReducer } from '../redux/GoalItem/Index'
import { REACT_APP_API } from "@env";
import { GoogleMaplocationState } from "./GoogleMapLocation/State";
import { googleMapLocationReducer } from "./GoogleMapLocation/Slice";


// export const REACT_APP_API_SERVER  = REACT_APP_API
export const REACT_APP_API_SERVER  = `http://192.168.160.95:8080`
// export const REACT_APP_API_SERVER  = `http://192.168.1.186:8080`
// export const REACT_APP_API_SERVER  = `http://192.168.0.188:8080`

console.log("check env variables",REACT_APP_API_SERVER)
//step 1- RootState
export interface RootState {
    auth:AuthState;
    goalItem: GoalItemState;
    googleMapLocation: GoogleMaplocationState;
}

// step 2 - Reducer (function)
const rootReducer = {auth: authReducer,goalItem: goalItemReducer,googleMapLocation:googleMapLocationReducer }
  
// step 3 - configureStore

export const store = configureStore ({
    reducer: rootReducer,
    devTools : process.env.NODE_ENV !== "production",
})

// step 4 - ActionDispatch

export type RootDispatch = typeof store.dispatch;


//step 5 -useRootSelector

export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;



