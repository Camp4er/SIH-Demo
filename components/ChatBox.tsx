"use client";
import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../lib/store";

export default function ChatBox({ 
  complaintId, 
  userType 
}: { 
  complaintId: string;
  userType: "citizen" | "authority";
}) {
  const { complaints, addMessage } = useStore();
  const comp = complaints.find((c) => c.id === complaintId);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comp?.messages]);

  if (!comp)
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-gray-400 mb-1">⚠️</div>
          <div>Complaint not found</div>
        </div>
      </div>
    );

  function sendMessage() {
    if (!text.trim()) return;
    addMessage(complaintId, { from: userType, text: text.trim() });
    setText("");
    inputRef.current?.focus();
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const getSenderLabel = () => {
    return userType === "citizen" ? "👤 You" : "🏛️ Official";
  };

  const getSenderButtonColor = () => {
    return userType === "citizen" 
      ? "bg-blue-600 hover:bg-blue-700" 
      : "bg-green-600 hover:bg-green-700";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`px-4 py-3 border-b border-gray-200 ${
        userType === "citizen" 
          ? "bg-gradient-to-r from-blue-50 to-indigo-50" 
          : "bg-gradient-to-r from-green-50 to-emerald-50"
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-medium text-gray-800">
            {userType === "citizen" ? "Citizen Support Chat" : "Authority Communication"}
          </h3>
          <span className="text-xs text-gray-500">#{complaintId.slice(-6)}</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {comp.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              userType === "citizen" ? "bg-blue-100" : "bg-green-100"
            }`}>
              <span className="text-xl">💬</span>
            </div>
            <p className="text-sm text-gray-500">No messages yet.</p>
            <p className="text-xs text-gray-400 mt-1">Start a conversation below</p>
          </div>
        ) : (
          <>
            {comp.messages.map((m, index) => (
              <div
                key={m.id}
                className={`flex ${m.from === userType ? "justify-end" : "justify-start"} animate-fadeIn`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`max-w-xs lg:max-w-md ${m.from === userType ? "order-2" : "order-1"}`}>
                  {/* Message bubble */}
                  <div
                    className={`inline-block p-3 rounded-2xl text-sm shadow-sm transition-all duration-200 hover:shadow-md ${
                      m.from === userType
                        ? m.from === "citizen"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-green-600 text-white rounded-br-md"
                        : m.from === "citizen"
                        ? "bg-blue-100 text-blue-900 border border-blue-200 rounded-bl-md"
                        : "bg-green-100 text-green-900 border border-green-200 rounded-bl-md"
                    }`}
                  >
                    <div className="break-words">{m.text}</div>
                  </div>
                  {/* Timestamp */}
                  <div className={`text-xs text-gray-400 mt-1 px-2 ${m.from === userType ? "text-right" : "text-left"}`}>
                    {new Date(m.time).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  m.from === "citizen" 
                    ? "bg-blue-600 text-white" 
                    : "bg-green-600 text-white"
                } ${m.from === userType ? "order-1 mr-2" : "order-2 ml-2"}`}>
                  {m.from === "citizen" ? "👤" : "🏛️"}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full p-3 pr-12 border rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all duration-200 resize-none ${
                userType === "citizen"
                  ? "border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                  : "border-green-300 focus:ring-green-500 focus:border-green-500"
              }`}
              placeholder={`Type your message as ${userType}...`}
              maxLength={500}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              {text.length}/500
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!text.trim()}
            className={`px-6 py-3 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-sm hover:shadow-md disabled:shadow-none flex items-center gap-2 ${getSenderButtonColor()}`}
          >
            <span>{getSenderLabel()}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        
        {/* Quick actions - only for authority */}
        {userType === "authority" && (
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => setText("We have received your complaint and are investigating.")}
              className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors duration-150"
            >
              Acknowledge
            </button>
            <button 
              onClick={() => setText("Your complaint has been resolved. Thank you for reporting this issue.")}
              className="text-xs px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors duration-150"
            >
              Mark Resolved
            </button>
          </div>
        )}

        {/* Quick actions - only for citizen */}
        {userType === "citizen" && (
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => setText("Can you provide an update on my complaint?")}
              className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition-colors duration-150"
            >
              Request Update
            </button>
            <button 
              onClick={() => setText("Thank you for your assistance.")}
              className="text-xs px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full transition-colors duration-150"
            >
              Say Thanks
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}