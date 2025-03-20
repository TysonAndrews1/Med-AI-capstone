/** This code was generated with assistance from ChatGPT
 * Prompt: How can I build an AI chatbot with Google Gemini?
 */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { getGeminiResponse } from "./GeminiAPI";
import { useRouter } from "next/navigation"; // Corrected navigation import for Next.js

const ChatScreen = () => {
    // Initial chat messages (Welcoming message from the bot)
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you?" },
    ]);
    const [input, setInput] = useState(""); // User input field state
    const [showAssessmentButton, setShowAssessmentButton] = useState(false); // Controls visibility of Health Assessment button

    // References for scrolling functionality
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const router = useRouter(); // Use Next.js router for navigation

    // Scroll to the bottom whenever new messages are added
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // Runs whenever `messages` change

    // Sends user input and gets AI response
    const sendMessage = async () => {
        if (!input.trim()) return; // Prevent empty input submission

        // Add user's message to the chat
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        // Fetch AI response
        const botReply = await getGeminiResponse(input);

        // AI Response
        const botMessage = { sender: "bot", text: botReply.message };
        setMessages((prev) => [...prev, botMessage]);

        // If Health Assessment is suggested, show button
        setShowAssessmentButton(botReply.showAssessmentButton);

        setInput(""); // Clear input field
    };

    // Handles Enter key to send a message
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    // Navigates to Health Assessment page when button is clicked
    const goToHealthAssessment = () => {
        router.push("/HealthAssessment"); // Corrected navigation for Next.js
    };

    return (
        <div className="w-[calc(100vw-10rem)] h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-100">
            {/* Chat container */}
            <div className="w-[90vw] h-[80vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                
                {/* Chat messages display area */}
                <div className="flex-1 max-h-[65vh] overflow-y-auto p-6 space-y-4 bg-gray-50" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {/* Bot avatar */}
                            {msg.sender === "bot" && (
                                <img src="/chatbot_avatar.png" alt="Bot" className="w-15 h-15 rounded-full mr-2" />
                            )}
                            
                            {/* Chat message bubble */}
                            <div className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#1B4D3E] text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>

                            {/* User avatar */}
                            {msg.sender === "user" && (
                                <img src="/user_avatar.png" alt="User" className="w-15 h-15 rounded-full ml-2" />
                            )}
                        </div>
                    ))}
                    
                    {/* Scroll to bottom anchor */}
                    <div ref={messagesEndRef} />

                    {/* Display Health Assessment button when needed */}
                    {showAssessmentButton && (
                        <div className="flex justify-center mt-4">
                            <button 
                                onClick={goToHealthAssessment} 
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                                Use Health Assessment Tool
                            </button>
                        </div>
                    )}
                </div>

                {/* Chat input section */}
                <div className="p-4 bg-white flex items-center border-t">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter message..."
                    />
                    <button 
                        onClick={sendMessage} 
                        className="ml-2 px-4 py-2 bg-[#1B4D3E] text-white rounded-lg hover:bg-green-700">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
