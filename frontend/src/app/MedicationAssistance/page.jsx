"use client"

import React, { useEffect, useState } from "react";
import {getDrugId} from "./BackendMethods"
import MedicineForm from "./MedicinePreForm";

export default function page(){
    const medicineCode = "00000086"; //Testing only
    const [request, setRequest] = useState("")
    const [pageState, setPageState] = useState("")
      useEffect(() => {
            getDrugId(medicineCode).then((e)=>{setRequest(e)});
        }, []);
    return(
    
    
    <div>
        {pageState == "" ? 
  <div className="flex h-screen">
  {/* Left Box */}
  <div className="flex-1 flex items-center justify-center ">
    <div className="text-center">
      <h1 className=" CgreenText text-3xl font-bold">Title 1</h1>
      <button className="mt-4 px-6 py-2 CgreenBg rounded-lg shadow-md">
        Button 1
      </button>
    </div>
  </div>

  {/* Right Box */}
  <div className="flex-1 flex items-center justify-center ">
    <div className="text-center">
      <h1 className="CgreenText text-3xl font-bold">Title 2</h1>
      <button className="mt-4 px-6 py-2 CgreenBg  rounded-lg shadow-md">
        Button 2
      </button>
    </div>
  </div>
</div>:<></>}
        <MedicineForm/>        
        <p>{JSON.stringify( request)}</p>

    </div>)
}