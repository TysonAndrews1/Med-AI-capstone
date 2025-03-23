import AutocompleteWrapper from "./AutocompleteWrapper";

const LocationStep = ({ onLocationSet }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Let's find you the most compatible doctor.
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Enter your location and we'll find doctors nearby.
        </p>
  
        <AutocompleteWrapper
          onPlaceSelect={(locationCoords, address) => {
            onLocationSet(locationCoords);
          }}
        />
      </div>
    );
  };
  
  export default LocationStep;
  