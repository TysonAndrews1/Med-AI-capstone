/**
 * ChatGPT Prompt: "How do I create an autocomplete search bar for users to enter their location?"
 */

'use client';

import { useRef, useState } from 'react';
import { Autocomplete, LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const AutocompleteWrapper = ({ onPlaceSelect }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const onLoad = (auto) => {
    setAutocomplete(auto);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onPlaceSelect(location, place.formatted_address);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your location"
          className="border p-3 w-full rounded-lg mb-6"
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default AutocompleteWrapper;
