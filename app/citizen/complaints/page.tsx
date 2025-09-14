"use client";
import React from "react";
import { useStore, Status } from "../../../lib/store";
import ComplaintCard from "../../../components/ComplaintCard";
import ChatBox from "../../../components/ChatBox";

export default function MyComplaints() {
  const { complaints, updateStatus } = useStore();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">My Complaints</h2>
      <div className="space-y-3">
        {complaints.length === 0 && (
          <div className="text-gray-500">
            No complaints yet. Create one from the report page.
          </div>
        )}
        {complaints.map((c) => (
          <div key={c.id} id={c.id} className="space-y-2">
            <ComplaintCard c={c} />
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(c.id, "In Progress")}
                className="px-3 py-1 bg-yellow-300 rounded"
              >
                Mark In Progress
              </button>
              <button
                onClick={() => updateStatus(c.id, "Resolved")}
                className="px-3 py-1 bg-green-300 rounded"
              >
                Mark Resolved
              </button>
              {c.status === "Resolved" && (
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Confirm Resolution
                </button>
              )}
            </div>
            <ChatBox complaintId={c.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
