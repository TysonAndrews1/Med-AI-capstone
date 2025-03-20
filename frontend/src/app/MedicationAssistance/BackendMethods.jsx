
const apiURL = "http://localhost:8080/api";


export async function getDrugId (drugId) {
        try {
            const response = await fetch(`${apiURL}/drug?id=${drugId}`);
            const data = await response.json();
            console.log("Fetched Data:", data); 
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