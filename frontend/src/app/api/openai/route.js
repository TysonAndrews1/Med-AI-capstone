// src/app/api/openai/route.js
import { NextResponse } from "next/server";
import { getMealRecommendations } from "@/utils/openai";

export async function POST(req) {
  try {
    console.log("API Key from env:", process.env.OPENAI_API_KEY);
    console.log("Request received at /api/openai");

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
    }

    const { userInputs } = await req.json();
    const aiResponse = await getMealRecommendations(userInputs);
    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}

