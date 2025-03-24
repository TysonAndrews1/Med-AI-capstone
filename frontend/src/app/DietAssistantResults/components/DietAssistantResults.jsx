"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ResultsComponent() { // This is the component that will display the results of the API. It is separated by tabs to display the different sections of the response.
  const searchParams = useSearchParams();
  const [sections, setSections] = useState({
    Description: [],
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    "Foods To Keep In Your Diet": [],
  });
  const [activeTab, setActiveTab] = useState("Description"); // This is the active tab that will be displayed when results are fetched

  useEffect(() => {
    const fetchResults = async () => { // This is the function that will fetch the results from the API
      try {
        const userInputs = JSON.parse(searchParams.get("data") || "{}");

        const response = await fetch("/api/gemini-diet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInputs }),
        });

        const data = await response.json();
        const content = data.response || "";

        const parsed = parsePlainTextSections(content);
        setSections(parsed);
      } catch (error) {
        console.error("Error fetching Gemini diet results:", error);
      }
    };

    fetchResults();
  }, [searchParams]);

  /* Reference: ChatGPT
  Prompt: I want to separate my results that I fetch from AI to be displayed in different tabs. I have created a prompt that will be sent to the API that will not consist of any markdown.
  The response from the API will be in plain text format and I want a tab for "Description", "Breakfast", "Lunch", "Dinner", and "Foods to Keep In Your Diet"*/
  const parsePlainTextSections = (text) => { // This function will parse the text response from the API into sections for their corresponding tabs
    const lines = text.split("\n");
    const result = {
      Description: [],
      Breakfast: [],
      Lunch: [],
      Dinner: [],
      "Foods To Keep In Your Diet": [],
    };

    let currentSection = null;

    lines.forEach((line) => { // This loop will go through each line of the text response and determine which section it belongs to
      const trimmed = line.trim();

      if ( // This block will check if the line is a section header and set the current section accordingly
        [
          "Description of the recommendation",
          "Breakfast",
          "Lunch",
          "Dinner",
          "Foods To Keep In Your Diet",
        ].includes(trimmed)
      ) {
        if (trimmed === "Description of the recommendation") {
          currentSection = "Description";
        } else {
          currentSection = trimmed;
        }
        return;
      }

      if (trimmed.startsWith("-") && currentSection) {
        result[currentSection].push(trimmed.slice(1).trim());
      }
    });

    return result;
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gray-100 p-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#1B4D3E] mb-6 text-center">
          AI Recommended Meals
        </h2>

        <div className="flex justify-center mb-6 gap-4 flex-wrap">
          {Object.keys(sections).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                activeTab === tab
                  ? "bg-[#1B4D3E] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {sections[activeTab]?.length > 0 ? (
            sections[activeTab].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded-lg border shadow-sm text-gray-800"
              >
                {item}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">
              Loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsComponent />
    </Suspense>
  );
}
