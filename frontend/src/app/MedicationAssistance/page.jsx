"use client"
import "../Styles.css"
import React, { useEffect, useState } from "react";
import {getDrugId} from "./BackendMethods"
import MedicineForm from "./MedicinePreForm";
import EmailForm from "./EmailForm";

export default function page(){
    const medicineCode = "00000086"; //Testing only
    const [request, setRequest] = useState("")
    const [pageState, setPageState] = useState("")
      useEffect(() => {
            getDrugId(medicineCode).then((e)=>{setRequest(e)});
        }, []);
        
        return (
          <div className="flex flex-1 w-full h-screen">
            {pageState === "" ? (
              <>
                {/* Left Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-8 border-r border-gray-300">
                  <h1 className="CgreenText text-3xl font-bold">Title 1</h1>
                  <button
                    className="basic-button"
                    onClick={() => setPageState("MedicineForm")}
                  >
                    Button 1
                  </button>
                </div>
      
                {/* Right Box */}
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <h1 className="CgreenText text-3xl font-bold">Medicine Reminders</h1>
                  <button
                    className="basic-button"
                    onClick={() => setPageState("EmailForm")}
                  >
                    Go
                  </button>
                </div>
              </>
            ) : pageState === "MedicineForm" ? (
              <MedicineForm />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
              <EmailForm />
              <button className="basic-button" onClick={()=>{setPageState("")}}>Go Back</button>
              </div>
            )}
          </div>
        );
      }