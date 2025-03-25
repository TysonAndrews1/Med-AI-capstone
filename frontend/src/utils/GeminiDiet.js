export async function getGeminiDietRecommendation(userInputs) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Gemini API key in environment variables."); // Error handling
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`; // API URL, using gemini-1.5-flash model

  const prompt = `Based on the user's inputs: ${JSON.stringify( // This is the prompt that will be sent to the API, it is adjusted to provide recommendations.
    userInputs
  )}, you are a diet assistant that provide meal suggestions based on user input.

Please give the response in this format without any markdown or special characters to properly display the response onto the website:

Description of the recommendation
- Description

Breakfast
- Description & recipe
- Description & recipe
- Description & recipe
- Description & recipe

Lunch
- Description & recipe
- Description & recipe
- Description & recipe
- Description & recipe

Dinner
- Description & recipe
- Description & recipe
- Description & recipe
- Description & recipe

Foods To Keep In Your Diet
- Food with description
- Food with description
- Food with description (add more foods as needed)
`;

  const requestBody = { // This is what will be sent to the API
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }], // The prompt is the user's inputs
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, { // This is where the request is made
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    let data; // This is the data that will be returned

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("Gemini response is not valid JSON:", text);
      throw new Error("Invalid response from Gemini API");
    }

    if (data.candidates && data.candidates.length > 0) { // This is the structure of the data that will be returned from the API
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected Gemini response structure:", data);
      throw new Error("Unexpected Gemini response format.");
    }
  } catch (error) {
    console.error("Gemini Diet API Error:", error);
    throw new Error("Failed to get diet recommendation from Gemini.");
  }
}
