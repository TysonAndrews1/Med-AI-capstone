"use client"
import "../Styles.css"
import React, { useEffect, useState } from "react";
import {getDrugId} from "./BackendMethods"
import MedicineForm from "./MedicineForm";
import EmailForm from "./EmailForm";

// for (let index = 0;index < array.length; index++) {
    
// }

export default function page(){

    const medicineCode = "00000086"; //Testing only
    const [request, setRequest] = useState("")
    const [pageState, setPageState] = useState("")
      useEffect(() => {
            getDrugId(medicineCode).then((e)=>{setRequest(e)});
        }, []);
        
        return (
          <div className="flex flex-1 w-full h-screen bg-gray-100 ">
            {pageState === "" ? (
              <>
                {/* Left Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-gray-300 bg-white">
                  <h1 className="CgreenText text-3xl font-bold">Medication Learning</h1>
                  <h3 className="CgreenText text-xl">Learn more about a specific medication</h3>
                  <button
                    className="basic-button"
                    onClick={() => setPageState("MedicineForm")}
                  >
                    Learn more
                  </button>
                </div>
      
                {/* Right Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <h1 className="CgreenText text-3xl font-bold">Medication Reminders</h1>
                  <h3 className="CgreenText text-xl">Set email reminders so you never miss a dose</h3>
                  <button
                    className="basic-button"
                    onClick={() => setPageState("EmailForm")}
                  >
                    Go
                  </button>
                </div>
              </>
            ) : pageState === "MedicineForm" ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
              <MedicineForm />
              <button className="basic-button" onClick={()=>{setPageState("")}}>Go Back</button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
              <EmailForm />
              <button className="basic-button" onClick={()=>{setPageState("")}}>Go Back</button>
              </div>
            )}
          </div>
        );
      }
