import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'
import React from 'react';
import {createRoot} from 'react-dom/client';
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
      <APIProvider apiKey={"AIzaSyA44xmzC3vZZMsYy6M9nySvZEV-iFmYx90"}>
        <Map center={cur_position} zoom={10}>
          <Marker position={cur_position} />
        </Map>
      </APIProvider>
    );
}

export default GoogleMap