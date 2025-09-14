"use client";
import React from "react";
import { useStore } from "../../../lib/store";

export default function Dashboard() {
  const { complaints, updateStatus, addMessage } = useStore();

  function quickReply(id: string) {
    addMessage(id, {
      from: "authority",
      text: "We have assigned a team. Will update soon.",
    });
    updateStatus(id, "In Progress");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Authority Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.length === 0 && (
          <div className="text-gray-500">No complaints yet.</div>
        )}
        {complaints.map((c) => (
          <div key={c.id} className="bg-white rounded shadow p-3">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-gray-100 overflow-hidden">
                {c.photo ? (
                  <img
                    src={c.photo}
                    alt="photo"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-gray-600">{c.description}</div>
                <div className="text-xs mt-1">
                  Status: <span className="font-medium">{c.status}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(c.id, "In Progress")}
                    className="px-2 py-1 bg-yellow-200 rounded"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(c.id, "Resolved")}
                    className="px-2 py-1 bg-green-200 rounded"
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => quickReply(c.id)}
                    className="px-2 py-1 bg-blue-200 rounded"
                  >
                    Quick Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
