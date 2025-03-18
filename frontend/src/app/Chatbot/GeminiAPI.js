/** This code was generated with assistance with chatGPT
 * Prompt: How can I set up Gemini AI with API ?
 */

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`;

export const getGeminiResponse = async (userInput) => {
    try {
        console.log("Sending request to:", GEMINI_API_URL); 

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: { text: userInput },
            }),
        });

        const data = await response.json();
        console.log("API Response:", data); 

        if (data && data.candidates && data.candidates.length > 0) {
            return data.candidates[0].output;
        } else {
            return "Sorry, I can't receive responses.";
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error, Please try again.";
    }
};