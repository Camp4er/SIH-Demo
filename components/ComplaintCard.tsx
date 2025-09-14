"use client";
import React from "react";
import { Complaint } from "../lib/store";
import Link from "next/link";

export default function ComplaintCard({ c }: { c: Complaint }) {
  return (
    <div className="bg-white rounded shadow p-4">
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
          <div className="text-xs mt-2">
            Category: {c.category} • Status:{" "}
            <span className="font-medium">{c.status}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">
            {new Date(c.createdAt).toLocaleString()}
          </div>
          <Link
            href={`/citizen/complaints#${c.id}`}
            className="mt-2 inline-block text-sm text-blue-600"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
