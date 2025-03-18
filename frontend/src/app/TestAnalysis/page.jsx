import FileUpload from "./FileUpload";

const page = () => {
    return (
        <div className="flex flex-col items-center justify-center flex-grow p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-[#1B4D3E] mb-4">
                    Medical Test Analysis
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Upload your medical test results to get AI-powered analysis and treatment guidance.
                </p>
                
                <FileUpload />
        
                <div className="mt-6 text-center text-gray-500 text-sm">
                    * This tool is for informational purposes only and does not replace professional medical advice.
                </div>
            </div>
        </div>
    );
};

export default page;