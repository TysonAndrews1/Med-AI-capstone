// Reference: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety
// This reference was used to learn how to store API keys securely in a Next.js app instead of the frontend.

"use client";

import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What are your health goals?",
    options: ["Lose weight", "Gain muscle", "Eat healthier", "Increase energy levels", "Maintain current weight"]
  },
  {
    id: 2,
    question: "Do you have any dietary restrictions or medical conditions?",
    options: ["Vegetarian", "Vegan", "Gluten-Free", "Diabetic", "None"],
  },
  {
    id: 3,
    question: "Do you have any food allergies or intolerances?",
    options: ["Dairy", "Eggs", "Peanuts", "Shellfish", "None"],
  },
  {
    id: 4,
    question: "Are there any foods you avoid or dislike?",
    options: ["Broccoli", "Mushrooms", "Seafood", "Spicy foods", "None"],
  },
  {
    id: 5,
    question: "How physically active are you?",
    options: ["Sedentary", "Lightly active", "Moderately active", "Very active"],
  },
  {
    id: 6,
    question: "What is your height and weight?",
    options: ["Enter Height", "Enter Weight"],
  },
];

export default function DietAssistant() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [aiRecommendation, setAiRecommendation] = useState("");

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => {
      const selectedOptions = prev[questionId] || [];

      if (questionId === 5) { // Only allow the user to select one option for question 5.
        return { ...prev, [questionId]: [option] };
      }

      if (option === "None") { // If the user selects "None", then the other options are removed.
        return selectedOptions.includes("None") ? { ...prev, [questionId]: [] } : { ...prev, [questionId]: ["None"] };
      } else {
        if (selectedOptions.includes("None")) { // If the user selects an option other than "None", then "None" is removed.
          return prev;
        }
        return selectedOptions.includes(option) // If the user selects an option that is already selected, then it is removed.
          ? { ...prev, [questionId]: selectedOptions.filter((item) => item !== option) }
          : { ...prev, [questionId]: [...selectedOptions, option] };
      }
    });
  };

  const handleNext = async () => { // This function is used to handle the next button click.
    if (step < questions.length - 1) {
      setStep(step + 1); // This is used to increment the step to move to the next question.
    } else {
      console.log("User responses:", answers);
  
      const userProfile = {
        Health_Goals: answers[1]?.join(", ") || "Not specified",
        Dietary_Restrictions: answers[2]?.join(", ") || "None",
        Food_Allergies: answers[3]?.join(", ") || "None",
        Foods_Avoided: answers[4]?.join(", ") || "None",
        Activity_Level: answers[5]?.[0] || "Not specified",
        Height: answers[6]?.height || "Not specified",
        Weight: answers[6]?.weight || "Not specified",
        Desired_Weight: answers[6]?.desiredWeight || "Not specified",
        Additional_Details: answers.extra || "None provided",
      };
  
      const encodedData = encodeURIComponent(JSON.stringify(userProfile));
      window.location.href = `/DietAssistantResults?data=${encodedData}`;
    }
  };  

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100 p-10">
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-col justify-center p-10">
          <h2 className="text-2xl font-bold text-[#1B4D3E] mb-4">
            This diet assistant will be able to provide different recipes and suitable food choices based on your needs and medical concerns.
          </h2>
          <p className="text-lg text-gray-700">
            Before we continue, I need to know more about yourself. Please answer the following questions for a more personalized answer.
          </p>
        </div>

        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[550px] h-[700px] bg-white p-6 rounded-lg shadow-lg text-center flex flex-col overflow-hidden">
            <h2 className="text-2xl font-bold text-[#1B4D3E] mb-2">
              {questions[step].question}
            </h2>

            <div className="flex flex-col space-y-3 mt-4 px-2 flex-grow overflow-y-auto">
              {questions[step].id === 6 ? (
                <div className="flex flex-col space-y-4">
                  <input type="text" className="w-full p-3 border rounded-lg text-lg" placeholder="Enter your height (cm)"
                    value={answers[6]?.height || ""} onChange={(e) => setAnswers((prev) => ({ ...prev, 6: { ...prev[6], height: e.target.value } }))} />
                  <input type="text" className="w-full p-3 border rounded-lg text-lg" placeholder="Enter your weight (lbs)"
                    value={answers[6]?.weight || ""} onChange={(e) => setAnswers((prev) => ({ ...prev, 6: { ...prev[6], weight: e.target.value } }))} />
                  <input type="text" className="w-full p-3 border rounded-lg text-lg" placeholder="Enter your desired weight (lbs)"
                    value={answers[6]?.desiredWeight || ""} onChange={(e) => setAnswers((prev) => ({ ...prev, 6: { ...prev[6], desiredWeight: e.target.value } }))} />
                </div>
              ) : (
                questions[step].options.map((option) => (
                  <button key={option} className={`px-6 py-3 text-lg rounded-lg border ${answers[questions[step].id]?.includes(option) ? "bg-[#1B4D3E] text-white" : "bg-gray-100 hover:bg-gray-300"}`}
                    onClick={() => handleSelect(questions[step].id, option)}>{option}
                  </button>
                ))
              )}

              {questions[step].id !== 6 && ( //Reference: ChatGPT. Prompt: "How do I integrate a text box for each question except question 6?"
                <textarea
                  className="w-full p-3 border rounded-lg text-lg h-[120px] max-h-[120px] overflow-y-auto"
                  placeholder="Add additional details..."
                  onChange={(e) =>
                    setAnswers((prev) => ({ ...prev, extra: e.target.value })) // This is used to store the additional details entered by the user.
                  }
                ></textarea>
              )}
            </div>

            <div className="w-full flex justify-center mt-6">
              <button className="w-full px-8 py-3 bg-[#1B4D3E] text-white rounded-lg text-lg" onClick={handleNext}>
                {step < questions.length - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {aiRecommendation && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-[550px]">
          <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">AI Recommended Meals:</h3>
          <p className="text-gray-700 whitespace-pre-line">{aiRecommendation}</p>
        </div>
      )}
    </div>
  );
}
