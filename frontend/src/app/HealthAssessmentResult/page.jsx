/** This code was generated with assistance from ChatGPT
 * Prompt: How can I return the AI response with Possible causes, treatment, prevention tips?
 */

"use client";
import React, { useEffect, useState } from 'react';
import { getGeminiResponse } from "../Chatbot/GeminiAPI"; 

const HealthAssessmentResult = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const requestGeminiSummary = async (userData) => {
    const prompt = `The user submitted the following symptoms through a structured health assessment form:

    Symptom: ${userData.symptom}
    Duration: ${userData.duration}
    Severity: ${userData.severity}
    Pre-existing conditions: ${userData.conditions}
    Additional symptoms: ${userData.additional}
    
    Based on these inputs, please generate a summary in 3 clear paragraphs:
    
    **Possible Causes**:\nWhat are the potential diseases or causes related to the symptoms?
    **Treatment Suggestions**:\nHow can the symptoms be relieved or treated at home (e.g., rest, hydration, exercise, common over-the-counter medications)? Do not prescribe specific prescription drugs.
    **Prevention Tips**:\nWhat actions can the user take in daily life to avoid these symptoms in the future?
    
    Respond in a calm, supportive tone. Do not recommend using a health assessment tool again. Do not include any diagnosis disclaimers. Just informative and helpful content.`;
    

    const ai = await getGeminiResponse(prompt);
    setAiSummary(ai.message);
    setIsLoading(false);
  };

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("healthForm"));
    if (formData) {
      requestGeminiSummary(formData);
    } else {
      setAiSummary("No health form data found.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="p-6 w-full flex justify-center items-start">
      <div className="bg-green-50 p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Assessment Results</h2>

        {isLoading ? (
          <p className="text-gray-500 italic text-center">Analyzing your symptoms...</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-700 whitespace-pre-wrap">{aiSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAssessmentResult;
