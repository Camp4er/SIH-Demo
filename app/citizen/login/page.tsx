"use client";
import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Citizen Login (mock)</h2>
      <p className="mb-6 text-sm text-gray-600">
        This is a demo: clicking continue will take you to the report form.
      </p>
      <Link
        href="/citizen/report"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue as Citizen
      </Link>
    </div>
  );
}
