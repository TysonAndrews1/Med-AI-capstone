import { useState } from "react";

const questions = [
  { id: 1, question: "Enter your location", type: "text" },
  { id: 2, question: "Choose the physician's specialty", type: "dropdown", options: ["General", "Pediatrics", "Dermatology", "Cardiology"] },
  { id: 3, question: "Select the gender of the physician", type: "radio", options: ["Male", "Female", "Any"] },
  { id: 4, question: "What is your availability range", type: "dropdown", options: ["Morning", "Afternoon", "Evening"] },
  { id: 5, question: "Virtual service or In-person", type: "radio", options: ["Virtual", "In-person"] },
  { id: 6, question: "Preferred language", type: "text" },
];

export default function Questionnaire() {
  

  return (
    <div >
      <h1>Questions</h1>
    </div>
  );
}
