"use client";

import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const pickFile = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center">
            <label className="cursor-pointer bg-[#1B4D3E] text-white px-4 py-2 rounded-lg hover:bg-[#5B4D3E] transition">
                Select a PDF File
                <input type="file" accept="application/pdf" onChange={pickFile} className="hidden" />
            </label>
            {file && <p className="mt-3 text-gray-700">Selected: {file.name}</p>}
        </div>
    );
};

export default FileUpload;
