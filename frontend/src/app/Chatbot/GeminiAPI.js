/** This code was generated with assistance with chatGPT
 * Prompt: How can I set up Gemini AI with API ?
 */

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const getGeminiResponse = async (userInput) => {
    try {
        console.log("Using API Key:", API_KEY);

        const response = await fetch("http://localhost:8080/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: API_KEY,
                userInput: userInput ,
            }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data); 

         // Extract AI response text properly
         let messageText = "Sorry, I couldn't understand that.";
         if (data && data.candidates && data.candidates.length > 0) {
             messageText = data.candidates[0].content.parts[0].text; // Extract message correctly
         }

        // Check if response suggests using Health Assessment
        const containsHealthAssessmentPrompt = messageText.toLowerCase().includes("health assessment");

        return { message: messageText, showAssessmentButton: containsHealthAssessmentPrompt };


    } catch (error) {
        console.error("Gemini API Error:", error);
        return { message: "Error, Please try again.", showAssessmentButton: false };
    }
};