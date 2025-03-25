/** This code was generated with assistance from ChatGPT
 * Prompt: How can I build an Health assessment form?
 */

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HealthAssessment = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    symptom: '',
    duration: '',
    severity: '',
    conditions: '',
    additional: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("healthForm", JSON.stringify(formData));
    router.push("/HealthAssessmentResult");
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="flex flex-row gap-10 w-[90%] max-w-7xl">
        <div className="w-1/2 bg-green-50 p-8 rounded-lg shadow h-fit">
          <h2 className="text-2xl font-bold mb-4 text-[#1B4D3E]">What is Health Assessment?</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            This AI-powered tool helps you quickly check your health status based on a few symptoms.<br /><br />
            Simply answer five questions, and you’ll receive a basic evaluation including possible conditions and medication suggestions.<br /><br />
            ⚠️ This does not replace professional medical advice.
          </p>
        </div>

        <div className="w-1/2 bg-green-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Health Assessment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">1. What symptom are you experiencing?</label>
              <input
                type="text"
                name="symptom"
                value={formData.symptom}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">2. How long have you had this symptom?</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="block mb-1 font-medium">3. How severe is it?</label>
              <select name="severity" value={formData.severity} onChange={handleChange} className="w-full border rounded p-2">
                <option value="">Select</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">4. Any pre-existing medical conditions?</label>
              <input type="text" name="conditions" value={formData.conditions} onChange={handleChange} className="w-full border rounded p-2" />
            </div>

            <div>
              <label className="block mb-1 font-medium">5. Any other symptoms or concerns?</label>
              <input type="text" name="additional" value={formData.additional} onChange={handleChange} className="w-full border rounded p-2" />
            </div>

            <button type="submit" className="bg-[#1B4D3E] text-white px-4 py-2 rounded w-full hover:bg-green-800 mt-4 cursor-pointer">
              Submit & View Result
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HealthAssessment;