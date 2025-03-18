import OpenAI from "openai";

// DO NOT initialize OpenAI globally if running in Next.js API routes
export async function getMealRecommendations(userInputs) {
  try {
    // Initialize OpenAI inside the function, not globally
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Ensure API key is read only on the server
    });

    const prompt = `Based on the user's inputs: ${JSON.stringify(userInputs)}, suggest meal plans or dietary recommendations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get meal recommendations.");
  }
}
