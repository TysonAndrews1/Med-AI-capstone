/**
 * Reference used for this page: https://www.youtube.com/watch?v=PfZ4oLftItk&t=154s&ab_channel=GoogleMapsPlatform
 *
 */

"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

function GoogleMap({ doctors, userLocation, highlightDoctor }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectUserLocation, setSelectUserLocation] = useState(false);

  const defaultCenter =
    doctors.length > 0
      ? doctors[0].coordinates
      : { lat: 51.0645, lng: -114.09041 };

  console.log(
    "Google Maps API Key:",
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Map
          zoom={12}
          center={defaultCenter}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          gestureHandling="greedy"
          disableDefaultUI={false}
          scrollwheel={true}
          zoomControl={true}
        >
          {userLocation && (
            <AdvancedMarker
              position={userLocation}
              onClick={() => setSelectUserLocation(true)}
            >
              <Pin
                background={"blue"}
                borderColor={"white"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
          )}

          {selectUserLocation === true && (
            <InfoWindow
              position={userLocation}
              onCloseClick={() => setSelectUserLocation(false)}
            >
              <div>
                <p className="font-bold">Your Location</p>
              </div>
            </InfoWindow>
          )}

          {doctors.map((doctor) => {
            const isHighlighted = doctor.id === highlightDoctor;
            console.log("Hovered doctor ID:", highlightDoctor);

            return (
              <AdvancedMarker
                key={doctor.id}
                position={doctor.coordinates}
                onClick={() => setSelectedDoctor(doctor)}
              >
                {isHighlighted ? (
                  <Pin
                    background="red"
                    borderColor="white"
                    glyphColor="white"
                    scale={isHighlighted ? 1.5 : 1}
                  />
                ) : (
                  <Pin
                    background="#355D47"
                    borderColor="white"
                    glyphColor="white"
                  />
                )}
              </AdvancedMarker>
            );
          })}

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
