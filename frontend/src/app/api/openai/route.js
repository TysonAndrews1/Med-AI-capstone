import { NextResponse } from "next/server";
import { getMealRecommendations } from "@/utils/openai";

export async function POST(req) {
  try {
    const { userInputs } = await req.json(); // Extract user inputs
    const aiResponse = await getMealRecommendations(userInputs); // Call OpenAI API to get recommendations

    return NextResponse.json({ response: aiResponse }, { status: 200 });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "Failed to fetch AI recommendations." }, { status: 500 });
  }
}
