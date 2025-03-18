"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [aiRecommendation, setAiRecommendation] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      const userInputs = JSON.parse(searchParams.get("data") || "{}");

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInputs }),
      });

      const data = await response.json();
      setAiRecommendation(data.response);
    };

    fetchResults();
  }, [searchParams]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <div className="w-[550px] bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-[#1B4D3E] mb-4">AI Recommended Meals</h2>
        <p className="text-gray-700 whitespace-pre-line">{aiRecommendation || "Loading recommendations..."}</p>
        <button
          className="mt-4 px-6 py-2 bg-[#1B4D3E] text-white rounded-lg"
          onClick={() => window.location.href = "/DietAssistant"}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
