/** This code was generated with assistance with chatGPT
 * Prompt: How can I build AI chat bot with google gemini?
 */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { getGeminiResponse } from "./GeminiAPI";

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hello! How can I assist you?" },
    ]);
    const [input, setInput] = useState("");

    // Reference message container
    const messagesEndRef = useRef(null);

    const chatContainerRef = useRef(null);

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
    }, [messages]); // ✅ 메시지가 변경될 때만 실행

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
        <div className="w-[calc(100vw-10rem)] h-[calc(100vh-7rem)] flex items-center justify-center bg-gray-100">
            <div className="w-[90vw] h-[80vh] flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex-1 max-h-[65vh] overflow-y-auto p-6 space-y-4 bg-gray-50" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "bot" && (
                                <img src="/chatbot_avatar.png" alt="Bot" className="w-15 h-15 rounded-full mr-2" />
                            )}
                            <div className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-[#1B4D3E] text-white" : "bg-gray-300 text-black"}`}>
                                {msg.text}
                            </div>
                            {msg.sender === "user" && (
                                <img src="/user_avatar.png" alt="User" className="w-15 h-15 rounded-full ml-2" />
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
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
