require('dotenv').config()

import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'
import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

const GoogleMap = () => {
    // default location
    let cur_position = {lat:14.1651, lng:121.2402}
    
    // TODO: should change location when geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position, cur_position) => {
            cur_position = {lat:position.coords.latitude, lng: position.coords.longitude}
        }, () => {
            console.log("Unable to retrieve your location");
        });
    } else {
        console.log("Geolocation not supported");
    }


    return (
      <APIProvider apiKey={process.env.GOOGLEMAPAPI}>
        <Map center={cur_position} zoom={10}>
          <Marker position={cur_position} />
        </Map>
      </APIProvider>
    );
}

export default GoogleMap