"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

/**
 * Reference used for this page: https://www.youtube.com/watch?v=PfZ4oLftItk&t=154s&ab_channel=GoogleMapsPlatform
 *
 */
function GoogleMap({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const defaultCenter = doctors.length > 0 ? doctors[0].coordinates : { lat: 51.0645, lng: -114.09041 };

  console.log(
    "Google Maps API Key:",
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          zoom={16}
          center={defaultCenter}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {doctors.map((doctor) => (
            <AdvancedMarker
              key={doctor.id}
              position={doctor.coordinates}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <Pin
                background={"#355D47"}
                borderColor={"white"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
          ))}

          {selectedDoctor && (
            <InfoWindow
              position={selectedDoctor.coordinates}
              onCloseClick={() => setSelectedDoctor(null)}
            >
              <div>
                <p className="font-bold">{selectedDoctor.name}</p>
                <p>{selectedDoctor.specialty}</p>
                <p>{selectedDoctor.location}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMap;
