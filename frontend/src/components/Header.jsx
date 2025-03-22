"use client"

import React from "react";
import { useRouter } from "next/navigation";


export default function Header(){

    const router = useRouter();

    const handleAssessmentStart = () => {
      router.push('/HealthAssessment');
    }

    return (
        <div className="flex justify-between items-center p-4  rounded-lg shadow-md w-full h-[18%]">
          {/* Centered Content - Icon, Title, Subtitle */}
          <div className="flex items-center space-x-4 mx-auto bg-custom-color pl-40">
            {/* <icon className="w-6 h-6" /> Adjust icon size as needed */}
            <div className="text-center">
              <p className="text-5xl font-semibold text-[#1B4D3E] ">MediHealth Ai</p>
              <p className="text-xl text-[#1B4D3E]">Your #1 at Home Health Companion</p>
            </div>
          </div>
      
          {/* Button - Right Aligned */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1B4D3E] text-white rounded-lg hover:"
          onClick={handleAssessmentStart}>
            <p>Start Health Assessment</p>
            {/* <icon className="w-5 h-5" /> */}
          </button>
        </div>
      );
      
        
}