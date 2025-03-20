
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
