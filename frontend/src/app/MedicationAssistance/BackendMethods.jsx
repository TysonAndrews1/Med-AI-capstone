
const apiURL = "http://localhost:8080/api";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
export async function SendGeminiQuestion(userInput){
    try {

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
}

export async function getDrugId (drugId) {
        try {
            const response = await fetch(`${apiURL}/drug?id=${drugId}`);
            const data = await response.json();
            return data; 
        } catch (error) {
            console.error("Error:", error);
            return null; 
        };
}
export async function getDrugs(){
    try {
        const response = await fetch(`${apiURL}/drugs`);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error:", error);
        return null; 
    };
}


export async function sendEmail (emailObject){
    try{
        const response = await fetch ("http://localhost:8080/email/send" ,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailObject)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        
        }
        console.log(response);
        
        
    }catch (error) {
        console.error("Sorry the email has failed to send", error);
        return { message: "Error, Please try again.", showAssessmentButton: false };
    }

}

export async function UnsubscribeFromEmails (email){
    try{
        const response = await fetch ("http://localhost:8080/email/unsubscribe" ,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(email)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        
        }
        console.log(response);
        
        
    }catch (error) {
        console.error("Sorry the email has failed to send", error);
        return { message: "Error, Please try again.", showAssessmentButton: false };
    }
}