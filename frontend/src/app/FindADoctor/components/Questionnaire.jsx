import { useState } from "react";
import GoogleMap from "./GoogleMap";
import LocationQ from "./LocationQ";
import Results from "./Results";

// List of questions to help users find doctors
const questions = [
  {
    id: 1,
    question: "I am looking for a doctor specialized in...",
    type: "select",
    field: "specialty",
    options: ["General", "Pediatrics", "Dermatology", "Cardiology"],
  },
  {
    id: 2,
    question: "I am more comfortable seeing a...",
    type: "select",
    field: "gender",
    options: ["Male", "Female", "No Preference"],
  },
  {
    id: 3,
    question: "When is the best time for your visit?",
    type: "select",
    field: "timeOfDay",
    options: ["Morning", "Afternoon", "Evening"],
  },
  {
    id: 4,
    question: "What type of service works best with your schedule?",
    type: "select",
    field: "serviceType",
    options: ["Virtual", "In-person"],
  },
  {
    id: 5,
    question: "Preferred language",
    type: "select",
    field: "language",
    options: ["English", "Spanish", "Mandarin", "French", "Other"],
  },
];

const Questionnaire = () => {
  const [currentQ, setCurrentQ] = useState(null);
  const [answers, setAnswers] = useState({
    location: "",
    specialty: "",
    gender: "",
    timeOfDay: "",
    serviceType: "",
    language: "",
  });
  const [doctorResults, setDoctorResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  

  // Function to handle selecting an option
  const handleSelect = (option, field) => {
    // Update the answers object with the selected option
    setAnswers({
      ...answers,
      [field]: option,
    });
  };

  // Function to go to the next question
  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  // Function to go back to the previous question
  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  // Function to find matching doctors
  const findDoctors = () => {
    // Sample doctor data
    const sampleDoctors = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Pediatrics",
        gender: "Female",
        location: "123 Medical Center Dr",
        coordinates: { lat: 51.0501, lng: -114.0853 },
        distance: "2.4 miles",
        languages: ["English", "Spanish"],
        availability: ["Morning", "Afternoon"],
        serviceTypes: ["In-person", "Virtual"],
        rating: 4.8,
        image: "/api/placeholder/100/100",
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        gender: "Male",
        location: "456 Heart Health Blvd",
        coordinates: { lat: 51.045, lng: -114.0708 },
        distance: "3.7 miles",
        languages: ["English", "Mandarin"],
        availability: ["Afternoon", "Evening"],
        serviceTypes: ["In-person"],
        rating: 4.9,
        image: "/api/placeholder/100/100",
      },
      {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Dermatology",
        gender: "Female",
        location: "789 Skin Care Ave",
        coordinates: { lat: 51.048, lng: -114.066 },
        distance: "5.1 miles",
        languages: ["English", "Spanish"],
        availability: ["Morning", "Evening"],
        serviceTypes: ["Virtual", "In-person"],
        rating: 4.7,
        image: "/api/placeholder/100/100",
      },
    ];

    // ChatGPT Prompt: "I am unable to get my filters to work correctly. Can you help me fix them?"
    // Filter doctors based on user selections
    const matchingDoctors = sampleDoctors.filter((doctor) => {
      let isMatch = true;

      // Check if specialty matches
      if (answers.specialty && answers.specialty !== "General") {
        isMatch = isMatch && doctor.specialty === answers.specialty;
      }

      // Check if gender preference matches
      if (answers.gender && answers.gender !== "No Preference") {
        isMatch = isMatch && doctor.gender === answers.gender;
      }

      // Check if service type matches
      if (answers.serviceType) {
        isMatch = isMatch && doctor.serviceTypes.includes(answers.serviceType);
      }

      // Check if time of day matches
      if (answers.timeOfDay) {
        isMatch = isMatch && doctor.availability.includes(answers.timeOfDay);
      }

      // Check if language matches
      if (answers.language && answers.language !== "Other") {
        isMatch = isMatch && doctor.languages.includes(answers.language);
      }

      return isMatch;
    });

    // Save the results and show them
    setDoctorResults(matchingDoctors);
    setShowResults(true);
  };

  if(showResults){
    return <Results doctors={doctorResults} />;
  }

  return (
    <div className="w-full h-screen">
      <div className="w-md bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-[#355D47] h-2.5 rounded-full"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {currentQ === null ? (
        <>
          <LocationQ
            onLocationSet={(locationCoords) => {
              setAnswers({
                ...answers,
                location: locationCoords,
              });
            }}
          />

          <button
            onClick={() => setCurrentQ(0)}
            disabled={!answers.location}
            className={`mt-4 px-6 py-3 rounded-lg shadow transition text-white w-full ${
              answers.location
                ? "bg-[#1B4D3E] hover:bg-[#163e32]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center">
            {questions[currentQ].question}
          </h2>

          <div className="mt-4 w-full">
            <div className="grid grid-cols-1 gap-2 w-full">
              {questions[currentQ].options.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-4 my-1 border shadow-xs border-gray-200 rounded-xl hover:border-[#355D47] w-full text-left ${
                    answers[questions[currentQ].field] === option
                      ? "bg-[#EAF5F0] border-[#355D47]"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    handleSelect(option, questions[currentQ].field);
                    if (currentQ < questions.length - 1) {
                      setTimeout(() => handleNext(), 300);
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2 w-full">
            {currentQ > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded flex-1"
              >
                Previous
              </button>
            )}

            {currentQ < questions.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-[#1B4D3E] text-white rounded flex-1"
                disabled={!answers[questions[currentQ].field]}
              >
                Next
              </button>
            )}

            {currentQ === questions.length - 1 && (
              <button
                onClick={findDoctors}
                className="px-4 py-2 bg-[#1B4D3E] text-white rounded flex-1"
              >
                Find Doctors
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Questionnaire;
