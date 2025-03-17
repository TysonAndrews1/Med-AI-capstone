/** This code was generated with assistance with chatGPT
 * Prompt: How can I build AI chat bot with google gemini?
 */
"use client";

import React, { useState } from "react";
import "./ChatScreen.css";
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
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "user" ? "user-msg" : "bot-msg"}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="Enter message" />
            </div>
        </div>
    );
};

export default ChatScreen;
