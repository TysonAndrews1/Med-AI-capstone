import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getDrugs, SendGeminiQuestion } from "./BackendMethods";
import DisplayInfo from "./TextSplice";
const MedicineForm = () => {
    const [drugList, setDrugList] = useState([]);
    const [filteredDrugs, setFilteredDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState("")
    const [response, setResponse] = useState("")
    const [disclaimer, setDisclaimer] = useState("")
    useEffect(() => {
        getDrugs().then((data) => {
            const limitedDrugs = data.slice(0, 50); // Show only first 50 items initially
            setDrugList(data); 
            setFilteredDrugs(limitedDrugs);
        });
    }, [getDrugs]);

    const handleInputChange = (input) => {
        if (!input) {
            setFilteredDrugs(drugList.slice(0, 50)); // Reset to first 50 items if empty
            return;
        }
        const filtered = drugList.filter(drug =>
            drug.brand_name.toLowerCase().includes(input.toLowerCase())
        );
        setFilteredDrugs(filtered.slice(0, 50)); // Show only first 50 matches
    };

    const handleChange = (selectedOption) => {
        setSelectedDrug(selectedOption);
        console.log("Selected Drug:", selectedOption); // Log selected value
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        let question = `I would like to know more about my medication ${selectedDrug.label}. 
        Could you please explain in easy-to-understand language: its ingredients, where its name comes from, 
        its purpose, and its most common side effects? Then, at the end, include all disclaimers about consulting with medical professionals.
        Please present the section headers using a single asterisk *HEADER* only and All Capitals , not double asterisks **HEADER**. 
        Do not use any bold or other markdown formatting in the response.`;
        
        SendGeminiQuestion(question).then((e) => {
            setResponse(e.message)
            // After receiving the response, split out the disclaimer text
            const disclaimerText = textSplice(e.message);
            setDisclaimer(disclaimerText);
        });
    };

    const textSplice = (text) => {
        const disclaimerIndex = text.indexOf("*IMPORTANT DISCLAIMERS*");
        if (disclaimerIndex !== -1) {
          const result = text.substring(disclaimerIndex + "*IMPORTANT DISCLAIMERS*".length).trim();
        //   setResponse(text.substring(0, disclaimerIndex).trim())
          return result;
        }
        return ''; // Return empty string if the disclaimer is not found
      };
      
    return (
<form 
  className="w-3/4  mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4 flex flex-col min-h-[400px]"
  onSubmit={handleSubmit}
>
  <h4 className="text-lg font-semibold text-gray-700 text-center">
    Please type in the Medicine you would like a simple analysis for
  </h4>

  <Select
    options={filteredDrugs.map(drug => ({ 
      value: drug.drug_code, 
      label: `${drug.brand_name} (${drug.company_name})` 
    }))}
    onInputChange={handleInputChange}
    onChange={handleChange} // Capture the selected option
    isSearchable
    placeholder="Select Drug"
    className="w-full"
  />

  <button 
    type="submit" 
    className="w-full basic-button"
  >
    Get Assessment
  </button>

  {/* Responsive and contained response box */}
  <div className="relative overflow-hidden">
    {response !== "" && (
      <div className="max-h-[300px] overflow-auto p-4 border-t border-gray-300">
        <DisplayInfo text={response} />
      </div>
    )}
  </div>
</form>
    );
};

export default MedicineForm;
