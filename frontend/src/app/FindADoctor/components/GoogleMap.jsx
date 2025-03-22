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
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}></Map>
        <AdvancedMarker
          position={position}
          icon={pin}
          onClick={() => console.log("Marker clicked")}>

          </AdvancedMarker>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
