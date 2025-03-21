"use client";

import { useState } from "react";
import {
    APIProvider,
    Map, 
    AdvancedMarker, 
    pin, 
    InfoWindow,
} from "@vis.gl/react-google-maps";

function GoogleMap() {
    const position = { lat: 53.54, lng: 10 };

    return (<APIProvider>
        <div>React Google Maps</div>
    </APIProvider>);


}

export default GoogleMap;