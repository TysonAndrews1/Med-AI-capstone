/**
 * ChatGPT Prompt: "How can I adjust the UI to render the results page to fill the full screen"
 */

"use client";
import React, { useState } from "react";
import Questionnaire from "./components/Questionnaire";
import Results from "./components/Results";

export default function Page() {
  const [showResults, setShowResults] = useState(false);
  const [doctorResults, setDoctorResults] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");

  return (
    <>
      {showResults ? (
        // Full-screen Results
        <div className="min-h-screen w-full bg-gray-100">
          <Results
            doctors={doctorResults}
            userLocation={userLocation}
            userAddress={userAddress}
          />
        </div>
      ) : (
        // Two-column Layout (Questionnaire Mode)
        <div className="flex items-start justify-center min-h-screen bg-gray-100 p-10">
          {/* Left Side - Description */}
          <div className="w-1/2 pr-8 mt-50">
            <h1 className="text-2xl font-bold text-[#1B4D3E] mb-4">
              👋 Welcome to MediHealth Ai!
            </h1>
            <p className="text-lg text-gray-700">
              We're going to help you find the perfect practitioner in your city. In
              less than 30 seconds, we'll personalize your results by asking a
              few quick questions. Let's get started!
            </p>
          </div>

          {/* Right Side - Questionnaire */}
          <div className="w-1/2 bg-white border border-gray-300 rounded-lg p-6 shadow-md">
            <Questionnaire
              onFinish={(doctors, location, address) => {
                setDoctorResults(doctors);
                setUserLocation(location);
                setUserAddress(address);
                setShowResults(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
