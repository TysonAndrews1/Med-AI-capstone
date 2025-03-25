"use client";

import React, { useState, useRef, useEffect } from "react";
import PdfViewer from "./PdfViewer";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [displayedText, setDisplayedText] = useState("");
    const pdfRef = useRef(null);

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

        setResponse(null);
        setDisplayedText("");
        setError(null);
    
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

            pdfRef.current?.scrollIntoView({ behavior: "smooth" });

        } catch (error) {
            console.error("Error during file upload:", error);
            setError("An error occurred during file upload."); // Show error message
        } finally {
            setIsUploading(false); // Stop the uploading state
        }
    };

    useEffect(() => {
        if (response && typeof response === "string") {
            let index = 0;
            const chunkSize = 10;

            const interval = setInterval(() => {
                if (index < response.length) {
                    const nextChunk = response.slice(index, index + chunkSize);

                    // Append only if the chunk is valid
                    if (nextChunk) {
                        setDisplayedText((prev) => prev + nextChunk);
                    }
    
                    index += chunkSize;
                } else {
                    clearInterval(interval);
                }
            }, 5); // Change speed

            return () => clearInterval(interval);
        }
    }, [response]);
    
    return (
        <div className="flex h-screen">
            
            {/* Left Side - PDF Preview */}
            <div className="w-1/2 bg-white border-t border-l border-b overflow-auto">
                <div className="p-6 items-center justify-center flex flex-grow flex-col">
                    <div className="flex item-center gap-4">
                        <label className="cursor-pointer bg-[#1B4D3E] mt-4 text-white px-4 py-2 rounded-lg hover:bg-[#5B4D3E] transition">
                            Select a PDF File
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={pickFile}
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={handleFileUpload}
                            className="mt-4 bg-[#1B4D3E] text-white px-4 py-2 rounded-lg hover:bg-[#5B4D3E] transition"
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload & Analyze"}
                        </button>
                    </div>

                    {file && (
                        <div className="mt-4">
                            <p className="text-gray-700 text-center">Selected: {file.name}</p>

                            <PdfViewer file={file} />
                        </div>
                    )}

                    {error && <p className="mt-3 text-red-500">{error}</p>}
                </div>
            </div>

            {/* Right Side - AI Analysis */}
            <div className="w-1/2 bg-white border p-6 overflow-auto" ref={pdfRef}>
                <h2 className="text-2xl font-bold text-[#1B4D3E]">AI Analysis</h2>
                
                {isUploading && (
                    <p className="mt-4 text-gray-500">Analyzing PDF, please wait...</p>
                )}

                {response && (
                    <div className="mt-4 p-4 bg-gray-50 border rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-green-600">Analysis Result:</h3>
                        <pre className="whitespace-pre-wrap text-gray-700">{displayedText}</pre>
                    </div>
                )}

                {!response && !isUploading && (
                    <p className="mt-4 text-gray-400">Upload a file to see the AI analysis result.</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
