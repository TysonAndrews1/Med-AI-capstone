import { useState } from "react";

// Questions to be displayed to help personalize their search results 
const questions = [
  { id: 1, question: "Let's find your compatible doctor.", description: "Enter your address and we'll find you a great doctor nearby.", options: ["Enter a location"]},
  { id: 2, question: "I am looking for a doctor specialized in...", options: ["General", "Pediatrics", "Dermatology", "Cardiology"] },
  { id: 3, question: "I am more comfortable seeing a...",  options: ["Male doctor", "Female doctor", "No Preference"] },
  { id: 4, question: "When is the best time of day for your visit?", description: "Choose all of the times that work for you.", options: ["Morning", "Afternoon", "Evening"] },
  { id: 5, question: "What type of service works best with your schedule?", options: ["Virtual", "In-person"] },
  { id: 6, question: "Preferred language", options: ["English"] },
];

const Questionnaire = () => {
  const [currentQ, setCurrentQ] = useState(0);
  

  // Function to handle the next question 
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  // Function to handle the previous question
  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  const completeQ = () => {
    // Implement logic to submit the answers to the backend
    console.log("Answers submitted!");
  };


  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-2xl mx-auto">

      {/* Reference: ChatGPT Prompt: "Please create a dynamic progress bar" */}
      {/* Progress Bar */}
      <div className="w-md bg-gray-200 rounded-full h-2.5 mb-6 mx-auto">
        <div 
          className="bg-[#355D47] h-2.5 rounded-full" 
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question and options */}
      <h2 className="text-2xl font-semibold">{questions[currentQ].question}</h2>
      <p className="text-sm p-2 text-gray-500">{questions[currentQ].description}</p>
      <div className="mt-4">
        {questions[currentQ].options.map((option) => (
          <button
            key={option}
            className="px-4 py-4 my-4 mx-1 border shadow-xs border-gray-200 rounded-xl bg-white hover:border-[#355D47]">
            {option}
          </button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="mt-4 flex gap-2">
        {currentQ > 0 && (
          <button onClick={handlePrev} className="px-4 py-2 bg-gray-400 text-white rounded">
            Previous
          </button>
        )}
        {currentQ < questions.length - 1 ? (
          <button onClick={handleNext} className="px-4 py-2 bg-[#1B4D3E] text-white rounded">
            Next
          </button>
        ) : <button onClick={completeQ} className="px-4 py-2 bg-[#1B4D3E] text-white rounded">
        submit
      </button>}
      </div>

    </div>
  );

};
  
export default Questionnaire;
  

