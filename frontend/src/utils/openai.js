import OpenAI from "openai";

export async function getMealRecommendations(userInputs) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API key.");
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Based on the user's inputs: ${JSON.stringify(userInputs)}, suggest meal plans or dietary recommendations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get meal recommendations.");
  }
}
