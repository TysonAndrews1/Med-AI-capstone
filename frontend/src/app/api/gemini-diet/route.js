//This was made for the Diet Assistant feature. Adjust the code to fit your needs.
import { NextResponse } from "next/server";
import { getGeminiDietRecommendation } from "@/utils/GeminiDiet";

export async function POST(req) {
  try {
    const { userInputs } = await req.json(); // Get the user inputs from the request body
    const result = await getGeminiDietRecommendation(userInputs); // Get the diet recommendation from the Gemini API

    return NextResponse.json({ response: result });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Failed to get diet recommendation." }, { status: 500 });
  }
}
