/** This code was generated with assistance with chatGPT
 * Prompt: How can I build AI chat bot with google gemini?
 */
"use client";

import React, { useState } from "react";
import { getGeminiResponse } from "./GeminiAPI";

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I help you?" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // User enters messages
        const userMessage = { sender: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);

        // Ask AI response
        const botReply = await getGeminiResponse(input);
        const botMessage = { sender: "bot", text: botReply };

        // Add AI response
        setMessages((prev) => [...prev, botMessage]);

        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="w-[calc(100vw-10rem)] mt-8 h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-100">
            <div className="w-[90vw] h-[90vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "bot" && (
                                <img src="/bot-avatar.png" alt="Bot" className="w-10 h-10 rounded-full mr-2" />
                            )}
                            <div className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#1B4D3E] text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>
                            {msg.sender === "user" && (
                                <img src="/user-avatar.png" alt="User" className="w-10 h-10 rounded-full ml-2" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-white flex items-center border-t">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter message..."
                    />
                    <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-[#1B4D3E] text-white rounded-lg">Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
