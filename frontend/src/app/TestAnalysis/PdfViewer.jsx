"use client";

import React from "react";

const PdfViewer = React.memo(({ file }) => {
    if (!file) return null;

    return (
        <div className="mt-4 w-[800px] h-[750px] border rounded-lg overflow-auto">
            <embed 
                src={URL.createObjectURL(file)} 
                type="application/pdf" 
                className="w-full h-full"
            />
        </div>
    );
});

export default PdfViewer;
