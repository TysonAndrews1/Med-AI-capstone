"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function ResultsComponent() {
  const searchParams = useSearchParams();
  const [aiRecommendation, setAiRecommendation] = useState("Loading recommendations...");

  useEffect(() => {
    if (!searchParams) return;

    const fetchResults = async () => {
      try {
        const userInputs = JSON.parse(searchParams.get("data") || "{}");

        const response = await fetch("/api/gemini-diet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInputs }),
        });

        const data = await response.json();
        setAiRecommendation(data.response || "Failed to get recommendations.");
      } catch (error) {
        setAiRecommendation("Error loading recommendations.");
        console.error("Error fetching AI recommendation:", error);
      }
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <div className="w-[550px] bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#1B4D3E] mb-4">AI Recommended Meals</h2>
        <p className="text-gray-700 whitespace-pre-line">{aiRecommendation}</p>
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
