import MultiTimePicker from "@/components/MultiTimePicker";
import React from "react"
import { useState,useEffect } from "react";

export default function EmailForm(){
    const [contactType, setContactType] = useState("email");
    const [formData, setFormData] = useState({
      email: "",
      emailContent: "",
      reminderIntervale:""
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
    };
  
    return (
      <div className="w-3/4 mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reminder Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-medium text-gray-700">Preferred Contact Method:</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="contactType"
                  value="email"
                  checked={contactType === "email"}
                  onChange={() => setContactType("email")}
                  className="w-4 h-4"
                />
                <span>Email</span>
              </label>
  
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="contactType"
                  value="phone"
                  checked={contactType === "phone"}
                  onChange={() => setContactType("phone")}
                  className="w-4 h-4"
                />
                <span>Phone</span>
              </label>
            </div>
          </div>
  
          {/* Conditional Input */}
          <div>
            <label className="font-medium text-gray-700">
              {contactType === "email" ? "Email Address" : "Phone Number"}:
            </label>
            <input
              type={contactType === "email" ? "email" : "tel"}
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder={contactType === "email" ? "Enter your email" : "Enter your phone number"}
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
              required
            />
          </div>
  
          <div>
            <label className="font-medium text-gray-700">When would you like to be reminded</label>
            <input 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief description..."
              className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
              rows="4"
              required
            />
          </div>
          <div>
           <MultiTimePicker/>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 basic-button hover:bg-[#1B4D3E] transition"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }