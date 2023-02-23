import { GoogleMaplocationState } from "./State";
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';


const initGoogleMapLocationState: GoogleMaplocationState = {
    id: null,
    title: "",
    origin: "",
    destination:"",
    description:"",
    location_lat: 37.78825,
    location_lng: -122.4324,

}

const googleMapLocationSlice = createSlice ({
    name: 'googleMapLocation',
    initialState:initGoogleMapLocationState,
    reducers:{
        // setOrigin : (state,action:PayloadAction<{origin:string; description:string,location_lat:number,location_lng:number}>,) => {
        //     // state.origin = action.payload
        //     state.description = action.payload.description
        //     state.location_lat = action.payload.location_lat
        //     state.location_lng = action.payload.location_lng
            
        // },

        setOrigin : (state,action) => {
            console.log("setOrgin???",action.payload )
            state.description = action.payload.description
            state.location_lat = action.payload.location_lat
            state.location_lng = action.payload.location_lng 
            
          
            
        },
        setDestination : (state,action) => {
            state.destination = action.payload
        }
    }
})

export const{setDestination, setOrigin} = googleMapLocationSlice.actions;

export const googleMapLocationReducer = googleMapLocationSlice.reducer;