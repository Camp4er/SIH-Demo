"use client";
import React from "react";
import { Complaint } from "../lib/store";
import Link from "next/link";

export default function ComplaintCard({ c }: { c: Complaint }) {
  return (
    <Link
      href={`/citizen/complaints/${c.id}`}
      className="block bg-white rounded shadow p-4"
    >
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center overflow-hidden">
          {c.photo ? (
            <img
              src={c.photo}
              alt="photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-sm text-gray-500">No Photo</div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{c.title}</h3>
          <div className="text-sm text-gray-600">{c.description}</div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span
              className={`px-2 py-1 rounded text-white ${
                c.status === "Pending"
                  ? "bg-gray-400"
                  : c.status === "In Progress"
                  ? "bg-yellow-500"
                  : "bg-green-600"
              }`}
            >
              {c.status}
            </span>
            <span className="text-gray-400">📍 Location detected</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
