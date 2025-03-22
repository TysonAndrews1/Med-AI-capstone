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

  console.log("Google Maps API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh" }}>
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
