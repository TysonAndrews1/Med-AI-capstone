import { useState } from "react";

// Questions to be displayed to help personalize their search results 
const questions = [
  { id: 1, question: "Enter a location", options: ["location"] },
  { id: 2, question: "Choose the physician's specialty", type: "dropdown", options: ["General", "Pediatrics", "Dermatology", "Cardiology"] },
  { id: 3, question: "Select the gender of the physician", type: "radio", options: ["Male", "Female", "Any"] },
  { id: 4, question: "What is your availability range", type: "dropdown", options: ["Morning", "Afternoon", "Evening"] },
  { id: 5, question: "Virtual service or In-person", type: "radio", options: ["Virtual", "In-person"] },
  { id: 6, question: "Preferred language", options: ["location"] },
];

const Questionnaire = () => {
  const [currentQ, setCurrentQ] = useState(0);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

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
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold">{questions[currentQ].question}</h2>
      <div className="mt-4">
        {questions[currentQ].options.map((option) => (
          <button
            key={option}
            className="px-4 py-2 m-2 border rounded bg-gray-200 hover:bg-gray-300"
          >
            {option}
          </button>
        ))}
      </div>
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
  

