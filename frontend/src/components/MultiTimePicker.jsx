import React, { useState } from "react";

export default function MultiTimePicker() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Generate a list of 24-hour times in 30-minute intervals
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, "0");
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hours}:${minutes}`;
  });

  // Handle time selection
  const toggleTimeSelection = (time) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  return (
    <div className="relative flex-1 w-full max-w-md mx-auto">
      <label className="block text-gray-700 font-medium mb-2">Select Times (24h MST):</label>

      {/* Input Box (Click to Open Dropdown) */}
      <div
        className="w-full p-2 border rounded-md bg-white cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {selectedTimes.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedTimes.map((time) => (
              <span
                key={time}
                className="bg-green-500 text-white px-2 py-1 rounded-md text-sm flex items-center"
              >
                {time}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTimeSelection(time);
                  }}
                  className="ml-1 text-white hover:text-gray-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Click to select times...</span>
        )}
      </div>

      {/* Dropdown List */}
      {dropdownOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white border rounded-md shadow-lg max-h-64 overflow-y-auto z-10">
          {timeOptions.map((time) => (
            <div
              key={time}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 ${
                selectedTimes.includes(time) ? "bg-green-200" : ""
              }`}
              onClick={() => toggleTimeSelection(time)}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
