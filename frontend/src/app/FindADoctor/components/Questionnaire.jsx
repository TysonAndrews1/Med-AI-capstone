import { useState } from "react";
import LocationQ from "./LocationQ";


// List of questions to help users find doctors
const questions = [
  {
    id: 1,
    question: "I am looking for a practitioner specialized in...",
    type: "select",
    field: "specialty",
    options: ["General", "Dietician", "Dermatology", "Cardiology"],
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

const Questionnaire = ({ onFinish }) => {
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
  const [userLocation, setUserLocation] = useState(null); 
  const [userAddress, setUserAddress] = useState("");
  

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

  const handleLocationSet = (locationCoords, address) => {
    setUserLocation(locationCoords);
    setUserAddress(address);
  };

  // Function to find matching doctors
  const findDoctors = () => {
    // Sample doctor data
    const sampleDoctors = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "General",
        gender: "Female",
        location: "123 Medical Center Dr",
        coordinates: { lat: 51.0501, lng: -114.0853 },
        distance: "3.2 km",
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
        distance: "3.9 km",
        languages: ["English", "Mandarin"],
        availability: ["Afternoon", "Evening"],
        serviceTypes: ["In-person"],
        rating: 4.9,
        image: "/api/placeholder/100/100",
      },
      {
        id: 3,
        name: "Emily Rodriguez, RD",
        specialty: "Dietician",
        gender: "Female",
        location: "18 Ave NW",
        coordinates: { lat: 51.048, lng: -114.066 },
        distance: "4.5 km",
        languages: ["English", "Spanish"],
        availability: ["Morning", "Evening"],
        serviceTypes: ["Virtual", "In-person"],
        rating: 4.7,
        image: "/api/placeholder/100/100",
      },
      {
        id: 4,
        name: "Sarah Johnson, RD",  
        specialty: "Dietician",
        gender: "Female",
        location: "20 Ave NW",
        coordinates: { lat: 51.043, lng: -114.095 },
        distance: "3.0 km",
        languages: ["English", "French"],
        availability: ["Morning", "Evening"],
        serviceTypes: ["Virtual", "In-person"],
        rating: 4.9,
        image: "/api/placeholder/100/100",
      },
      {
        id: 5,
        name: "Jared Giffin, RD",
        specialty: "Dietician",
        gender: "Female",
        location: "22 Ave NW",
        coordinates: { lat: 51.06, lng: -114.10 },
        distance: "2.2 km",
        languages: ["English", "Mandarin"],
        availability: ["Morning", "Evening"],
        serviceTypes: ["Virtual", "In-person"],
        rating: 4.7,
        image: "/api/placeholder/100/100",
      },
      {
        id: 6,
        name: "Lily Chen, RD",
        specialty: "Dietician",
        gender: "Female",
        location: "17 Ave NW",
        coordinates: { lat: 51.02, lng: -114.09 },
        distance: "3.0 km",
        languages: ["English", "Mandarin"],
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

  if (showResults) {
    onFinish(doctorResults, userLocation, userAddress);
    return null;
  }
  

  return (
    <div className="w-full h-screen ">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-[#355D47] h-2.5 rounded-full"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      {currentQ === null ? (
        <>
          <LocationQ
            onLocationSet={(locationCoords, address) => {
              setAnswers({
                ...answers,
                location: locationCoords,
              });
              setUserLocation(locationCoords);
              setUserAddress(address);
            }}
          />

          <button
            onClick={() => setCurrentQ(0)}
            disabled={!answers.location}
            className={`mt-2 py-3 rounded-3xl shadow transition text-white w-40 block mx-auto ${
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
          <h2 className="text-2xl font-semibold text-center py-4">
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
