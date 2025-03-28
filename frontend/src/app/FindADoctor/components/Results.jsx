import GoogleMap from "./GoogleMap";
import React, { useState } from "react";

const sampleAvailability = [
  {
    day: "Thu",
    date: "Mar 27",
    appointments: 12,
    times: ["8:00 am", "8:30 am", "9:00 am", "9:30 am", "10:00 am", "11:00 am"],
  },
  { day: "Fri", date: "Mar 28", appointments: 8, times: [] },
  { day: "Sat", date: "Mar 29", appointments: 11, times: [] },
  { day: "Sun", date: "Mar 30", appointments: 8, times: [] },
  { day: "Mon", date: "Mar 31", appointments: 5, times: [] },
  { day: "Tue", date: "Apr 1", appointments: 6, times: [] },
  { day: "Wed", date: "Apr 2", appointments: 12, times: [] },
];

const Results = ({ doctors, userLocation, userAddress }) => {
  const [highlightDoctor, setHighlightDoctor] = useState(null);
  const [selected, setSelected] = useState(sampleAvailability[0]);

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
                    📍 {doctor.location} | {doctor.distance}
                  </p>
                </div>

                {/* rating */}
                <div className="mb-4">
                  <p className="text-sm">⭐ {doctor.rating}</p>
                </div>

                {/* Services */}
                <div className="mb-4">
                  <p className="font-bold">Available Service Types</p>
                  <p className="text-sm">
                    {" "}
                    ✔️ {doctor.serviceTypes.join(", ")}
                  </p>
                  <p className="text-sm"> ✔️ {doctor.languages.join(", ")}</p>
                </div>

                {/* Date Selector */}
                <div className="flex items-center space-x-2 overflow-x-auto mb-4  pb-2">
                  {sampleAvailability.map((slot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelected(slot)}
                      className={`min-w-[80px] px-3 py-2 text-center border border-[#438571] rounded-lg cursor-pointer
            ${
              selected.date === slot.date
                ? "bg-[#1B4D3E] text-white"
                : "bg-white text-gray-800"
            }
            hover:border-[#1B4D3E] transition`}
                    >
                      <p className="text-sm font-semibold">{slot.day}</p>
                      <p className="text-xs">{slot.date}</p>
                      <p className="text-xs font-bold mt-1">
                        {slot.appointments} appts
                      </p>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Request a time on {selected.day}, {selected.date}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {selected.times.length > 0 ? (
                      selected.times.map((time, idx) => (
                        <button
                          key={idx}
                          className="px-4 py-2 rounded bg-[#438571] hover:bg-[#1B4D3E] text-sm text-white font-medium"
                        >
                          {time}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No times available.
                      </p>
                    )}
                  </div>
                </div>
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
