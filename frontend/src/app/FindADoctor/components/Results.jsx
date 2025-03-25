import GoogleMap from "./GoogleMap";
import React, { useState } from "react";


const Results = ({ doctors, userLocation, userAddress }) => {
  const [highlightDoctor, setHighlightDoctor] = useState(null);

  return (
    <div className="flex justify-center h-screen w-full overflow-hidden ">
      {/* Sidebar Doctor Results */}
      <div className="w-[600px] overflow-y-auto p-6 hide-scrollbar">
        {/* The user's location + Modify search */}
        <div className="space-y-6">
          <div className="border border-gray-300 bg-white p-4 rounded-lg mb-6">
            <div className="mb-4">
              <p>
                Showing results near:{" "}
                <span className="font-semibold">{userAddress}</span>
              </p>
            </div>
            <button className="w-full bg-[#1B4D3E] text-white py-2 rounded">
              Modify your Search
            </button>
          </div>
        </div>

        {/* Doctor profile */}
        {doctors.length > 0 ? (
          <div className="space-y-6">
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="border border-gray-300 bg-white p-6 rounded-xl shadow-md relative group transition hover:shadow-lg hover:border-[#1B4D3E]"
                onMouseEnter={() => setHighlightDoctor(doctor.id)}
                onMouseLeave={() => setHighlightDoctor(null)}
              >
                {/* Numbered profile */}
                <div className="absolute -top-3 -left-3 bg-[#1B4D3E] text-white w-8 h-8 flex items-center justify-center rounded-full shadow">
                  {index + 1}
                </div>

                {/* Name & Specialty */}
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-[#1B4D3E]">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>

                {/* Location and Review */}
                <div className="mb-2">
                  <p className="text-gray-500 text-sm">
                  📍 {doctor.location} | {(doctor.distance)}
                  </p>
                </div>

                {/* rating */}
                <div className="mb-4">
                  <p className="text-sm">
                     ⭐{" "}
                    {doctor.rating}
                  </p>
                </div>

                {/* Services */}
                <div className="mb-3">
                  <p className="font-bold">Available Service Types</p>
                  <p className="text-sm"> ✔️ {doctor.serviceTypes.join(", ")}</p>
                  <p className="text-sm"> ✔️ {doctor.languages.join(", ")}</p>
                </div>
              
               
                <p className="text-left">
                  Availability: {doctor.availability.join(", ")}
                </p>
                
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors match your criteria.</p>
        )}
      </div>

      {/* Map Section */}
      <div className="w-[500px] h-[450px] p-4">
        <div className="w-full h-full rounded-lg overflow-hidden shadow">
          <GoogleMap
            doctors={doctors}
            userLocation={userLocation}
            highlightDoctor={highlightDoctor}
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
