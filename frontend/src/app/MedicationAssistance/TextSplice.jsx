import React, { useEffect, useState } from 'react';

// Function to process the random string

const DisplayInfo = ({ text }) => {
  const [sections, setSections] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  const processText = (text) => {
    // Split the text by headers (surrounded by asterisks)
    const sectionsArray = text.split(/\*([A-Z\s]+)\*/).filter(Boolean);

    // Create an array of objects with header and content
    const result = [];
    for (let i = 0; i < sectionsArray.length; i++) {
      if (i % 2 === 0) {
        // This is the header
        result.push({
          header: sectionsArray[i],
          content: sectionsArray[i+1] || "", // Content follows header
        });
      }
    }

    return result;
  };

  useEffect(() => {
    const processedSections = processText(text);
    setSections(processedSections);
  }, [text]);

  const toggleSection = (index) => {
    // Toggle the dropdown (open/close)
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {sections.map((section, index) => (
        <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{section.header}</h3>
            <svg
              className={`w-6 h-6 transform transition-transform duration-200 ${
                openSection === index ? 'rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          {openSection === index && (
            <div className="p-4 bg-gray-50 rounded-b-lg">
              <p className="text-gray-600">{section.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayInfo;
