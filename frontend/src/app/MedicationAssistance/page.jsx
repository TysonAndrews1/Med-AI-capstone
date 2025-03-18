"use client"

import React, { useEffect, useState } from "react";
import {getDrugId} from "./APICallsDrug"
import MedicineForm from "./MedicinePreForm";

export default function page(){
    const medicineCode = "00000086"; //Testing only
    const [request, setRequest] = useState("")
      useEffect(() => {
            getDrugId(medicineCode).then((e)=>{setRequest(e)});
        }, []);
    return(
    
    
    <div>
        <MedicineForm/>        
        <p>{JSON.stringify( request)}</p>

    </div>)
}