"use client";

import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const pickFile = async (event) => {
        const selectedFile = event.target.files[0];
        
        if (!selectedFile) return;
    
        if (selectedFile.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }
    
        if (selectedFile.size > 10 * 1024 * 1024) { // Limit to 10MB
            alert("File is too large. Please upload a smaller file.");
            return;
        }
    
        setFile(selectedFile);
    };    

    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        setIsUploading(true);
        try {
            const response = await fetch("/api/ai/analyze", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("File upload failed");
            }
    
            const responseData = await response.json();
            console.log("File analysis response:", responseData);
            setResponse(responseData); // Save the response for display
        } catch (error) {
            console.error("Error during file upload:", error);
            setError("An error occurred during file upload."); // Show error message
        } finally {
            setIsUploading(false); // Stop the uploading state
        }
    };
    
    return (
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center">
            <label className="cursor-pointer bg-[#1B4D3E] text-white px-4 py-2 rounded-lg hover:bg-[#5B4D3E] transition">
                Select a PDF File
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={pickFile}
                    className="hidden"
                />
            </label>
            {file && <p className="mt-3 text-gray-700">Selected: {file.name}</p>}
            <button
                onClick={handleFileUpload}
                className="mt-4 bg-[#1B4D3E] text-white px-4 py-2 rounded-lg hover:bg-[#5B4D3E]"
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Upload File"}
            </button>
            {error && <p className="mt-3 text-red-500">{error}</p>}
            {response && <p className="mt-3 text-green-500">AI Analysis Result: {response}</p>}
        </div>
    );
};

export default FileUpload;
