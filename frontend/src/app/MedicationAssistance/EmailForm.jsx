import MultiTimePicker from "@/components/MultiTimePicker";
import React, { useState } from "react";
import { sendEmail } from "./BackendMethods";


//the Form that collects the information nessasry to set reoccuring emails and send the proper information to the BackendMethods
export default function EmailForm() {
  const [contactType, setContactType] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    emailContent: "",
    reminderInterval: "",
    phone: "" 
  });
  const [confirm, setConfirm] = useState(false)

  //takes in a key value pair
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //sends info to backend
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const emailObject = {
      to: formData.email,
      subject: "Reminder for medication",
      text: `Do not forget to take your medication at ${formData.reminderInterval} also ${formData.emailContent}`
    };
    console.log(emailObject);

    sendEmail(emailObject);
    setConfirm(true)
  };

  return (
    
    <div className="w-3/4 mx-auto p-6 bg-white rounded-lg shadow-md">
      {confirm == false ? (
        <div>
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
            name={contactType === "email" ? "email" : "contact"}
            value={contactType === "email" ? formData.email : formData.phone}
            onChange={handleChange}
            placeholder={contactType === "email" ? "Enter your email" : "Enter your phone number"}
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
            required
          />
        </div>

        <div>
          <MultiTimePicker onTimeChange={(e) => setFormData(prev => ({ ...prev, reminderInterval: e }))} />
        </div>

        <div>
          <label className="font-medium text-gray-700">Anything else of note that you need to be reminded of:</label>
          <input
            name="emailContent"
            value={formData.emailContent}
            onChange={handleChange}
            placeholder="Enter a brief description..."
            className="w-full p-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4D3E]"
            rows="4"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 basic-button hover:bg-[#1B4D3E] transition"
        >
          Submit
        </button>
      </form></div> ) :<div className="items-center">
        <h1 className="text-3xl bold">Confirmation</h1>
        <p>Email Set up successfully </p>
        </div>}
    </div>
  );
}
