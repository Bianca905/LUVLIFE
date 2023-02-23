import {View, Text, StyleSheet, Image} from 'react-native';
import React, { useRef, useState } from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useTailwind} from 'tailwind-rn/dist';
import MapView, {LatLng, Marker} from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
// import { GOOGLE_MAPS_APIKEY } from '@env';
import {setDestination, setOrigin} from '../redux/GoogleMapLocation/Slice';
import {useRootSelector} from '../redux/store';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { set } from 'react-hook-form';

const GoogleMapLocation = (
) => {
  const tw = useTailwind();
  const dispatch = useDispatch();
  // const origin = useRootSelector(state => state.googleMapLocation.origin);
  const location_lat = useRootSelector(
    state => state.googleMapLocation.location_lat,
  );
  const location_lng = useRootSelector(
    state => state.googleMapLocation.location_lng,
  );
  
  const description = useRootSelector(state=> state.googleMapLocation.description)

  console.log('origin data',location_lat,location_lng,description,description);

 const mapRef = useRef<MapView>(null)
 const moveTo = async (position: LatLng) =>{
   const camera = await mapRef.current?.getCamera()
   if (camera) {
     camera.center = position;
     mapRef.current?.animateCamera(camera, {duration: 1000})

   }
 }
 const changeDescriptionDetail = (description:string) => {
  const [descriptionDetail, setDescriptionDetail] = useState("");
 }
 

  return (
    <View style={tw('p-4 h-full')}>
  

     
      <MapView
        style={tw('h-1/2')}
        
        ref={mapRef}
        initialRegion={{
          latitude: location_lat,
          longitude: location_lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}

       
       >
       <Marker coordinate={{
          latitude: location_lat,
          longitude: location_lng,
        }} 
        title="Your favorite place"
        description={description!}
        // identifier="origin"
        />
             {/* <Image source={require('../assets/image/chopper.jpg')} style={{height: 35, width:35 }}  */}
        {/* </Marker> */}
         
      </MapView>

      {/* style={tw('flex-row bg-white border mt-6  ')} */}
      <View style={tw('flex-row bg-white border mt-6  ')}> 
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          minLength={2}
          placeholder="Search"
          fetchDetails={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          enablePoweredByContainer={false}
          
          
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const description = data.description;
            const location_lat =details?.geometry.location.lat;
            const location_lng = details?.geometry.location.lng
            console.log(
              'data?',
              typeof data.description,
              typeof details?.geometry.location.lat,
              typeof details?.geometry.location.lng,
            );


            dispatch(
              setOrigin({
              
                location_lat,
                location_lng,
                description

             
                
              }),
              
            );
           
            dispatch(setDestination(null));

            const position ={
              latitude:details?.geometry.location.lat as number,
              longitude:details?.geometry.location.lng as number
            }

           

            moveTo(position)
            // changeDescriptionDetail(description)
            // console.log("description???",description)
          }}
          query={{
            key: 'AIzaSyDRKUGu2wWAYwcjs_PWqb8_mEGhDHHQ3F8',
            language: 'en',
          }}
      
        />
      </View>

    </View>
  );
};

const style = StyleSheet.create({
  textInput:{
    backgroundColor:"grey",
    elevation:4,
    shadowRadius:6,
    shadowColor:"black",
    width:"95%",
    shadowOffset: {width:1, height:1},
    shadowOpacity:0.5,
    borderRadius:6,
    borderColor:"black",
    borderWidth:1,
    height:50,
    marginTop:20,
    marginLeft:14
   
    
  }
})

export default GoogleMapLocation;

// {"northeast": {"lat": 22.3695914802915, "lng": 114.1233236302915}, "southwest": {"lat": 22.3668935197085, "lng": 114.1206256697085}}
// 22.3736668 114.1061254