// Reference: ChatGPT
// Prompt: "How can I securely store my OpenAI API key in a Next.js app?"

import { OpenAI } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { userInputs } = req.body; // Data sent from frontend

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Load API key securely from env file
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a diet assistant that provides food and recipe recommendations based on user input." },
        { role: "user", content: `User selected: ${JSON.stringify(userInputs)}` },
      ],
    });

    return res.status(200).json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
