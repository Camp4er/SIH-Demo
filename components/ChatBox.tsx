"use client";
import React, { useState } from "react";
import { useStore } from "../lib/store";

export default function ChatBox({ complaintId }: { complaintId: string }) {
  const { complaints, addMessage } = useStore();
  const comp = complaints.find((c) => c.id === complaintId);
  const [text, setText] = useState("");
  if (!comp)
    return <div className="text-sm text-gray-500">Complaint not found</div>;

  function sendAsCitizen() {
    if (!text.trim()) return;
    addMessage(complaintId, { from: "citizen", text: text.trim() });
    setText("");
  }

  return (
    <div className="border rounded p-3 bg-white">
      <div className="h-40 overflow-auto space-y-2 mb-3">
        {comp.messages.map((m) => (
          <div
            key={m.id}
            className={m.from === "citizen" ? "text-right" : "text-left"}
          >
            <div
              className="inline-block p-2 rounded-md text-sm"
              style={{
                background: m.from === "citizen" ? "#dcfce7" : "#e2e8f0",
              }}
            >
              {m.text}
            </div>
            <div className="text-xs text-gray-400">
              {new Date(m.time).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {comp.messages.length === 0 && (
          <div className="text-xs text-gray-400">No messages yet.</div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message"
        />
        <button
          onClick={sendAsCitizen}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
