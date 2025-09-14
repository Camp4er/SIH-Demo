"use client";
import Link from "next/link";

export default function AuthorityLogin() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Authority Login (mock)</h2>
      <p className="mb-6 text-sm text-gray-600">
        Demo login for municipality official.
      </p>
      <Link
        href="/authority/dashboard"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Continue as Authority
      </Link>
    </div>
  );
}
