"use client";

import React, { useState } from "react";

const questions = [ // Examples for now, will refine later
  {
    id: 1,
    question: "What is your health goal?",
    options: ["Lose weight", "Gain muscle", "Eat healthier", "Increase energy levels"],
  },
  {
    id: 2,
    question: "How physically active are you?",
    options: ["Sedentary", "Lightly active", "Moderately active", "Very active"],
  },
  {
    id: 3,
    question: "Do you have any dietary restrictions or medical conditions?",
    options: ["Vegetarian", "Vegan", "Gluten-Free", "Diabetic", "None"],
  },
];

export default function DietAssistant() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("User responses:", answers);
      alert("Submitting responses...");
      // This is where I should but the API
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-grow justify-center items-center">
        <div className="w-[60%] max-w-3xl bg-white p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-[#1B4D3E] mb-6">
            {questions[step].question}
          </h2>
          <div className="flex flex-col space-y-4">
            {questions[step].options.map((option) => (
              <button
                key={option}
                className={`px-6 py-3 text-lg rounded-lg border ${
                  answers[questions[step].id] === option
                    ? "bg-[#1B4D3E] text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
                onClick={() => handleSelect(questions[step].id, option)}
              >
                {option}
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-3 border rounded-lg mt-6 text-lg"
            placeholder="Add additional details..."
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, extra: e.target.value }))
            }
          ></textarea>
          <button
            className="mt-6 px-8 py-3 bg-[#1B4D3E] text-white rounded-lg text-lg"
            onClick={handleNext}
          >
            {step < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
