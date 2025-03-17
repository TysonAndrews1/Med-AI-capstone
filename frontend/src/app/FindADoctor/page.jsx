"use client";
import { React, useState } from "react";
import Questionnaire from "./components/Questionnaire";

export default function Page() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <div className="text-center px-20 py-10">
      {showQuestionnaire ? (
        <Questionnaire />
      ) : (
        <div>
          <h1 className="text-2xl font-bold"> 👋 Welcome to MediHealth Ai!</h1>
          <p className="text-sm font-light">
            We're going to help you find the perfect doctor in your city. In less
            than 30 seconds, we'll personalize your results by asking a few quick
            questions. Let's get started!
          </p>
          <button
            className="text-white text-sm bg-[#1B4D3E] hover:bg-[#355D47] px-15 py-3.5 rounded-full mt-4"
            onClick={() => setShowQuestionnaire(true)}
          >
            Start!
          </button>
        </div>
      )}
    </div>
  );
}