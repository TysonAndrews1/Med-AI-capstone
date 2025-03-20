"use client";

import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    // Lets the user uploads a PDF file with a max capacity of 10MB
    const pickFile = async (event) => {
        const selectedFile = event.target.files[0];
        
        if (!selectedFile) return;
        
        // Makes sure the file is a PDF
        if (selectedFile.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }
    
        // Makes sure the file is smaller than 10MB
        if (selectedFile.size > 10 * 1024 * 1024) {
            alert("File is too large. Please upload a smaller file.");
            return;
        }
    
        setFile(selectedFile);
    };

    // Sends uploaded PDF to the backend springboot server
    const handleFileUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        setIsUploading(true);
        setError(null); // Reset previous error
        
        try {
            const response = await fetch("http://localhost:8080/api/ai/analyze", {
                method: "POST",
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error("File upload failed");
            }
    
            const responseData = await response.text();
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
            {response && (
                <div className="mt-3 text-green-500">
                    <h3>AI Analysis Result:</h3>
                    <pre className="whitespace-pre-wrap">{response}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
