import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getDrugs } from "./BackendMethods";

const MedicineForm = () => {
    const [drugList, setDrugList] = useState([]);
    const [filteredDrugs, setFilteredDrugs] = useState([]);
    
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

    return (
        <form className="w-full flex-1">
        <Select
            options={filteredDrugs.map(drug => ({ value: drug.drug_code, label: drug.brand_name }))}
            onInputChange={handleInputChange}
            isSearchable
            placeholder="Select Drug"
        />
        </form>
    );
};

export default MedicineForm;
