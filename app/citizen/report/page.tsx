"use client";
import React, { useState } from "react";
import { useStore } from "../../../lib/store";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const { createComplaint } = useStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Road");
  const [anon, setAnon] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [verifying, setVerifying] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      // Mock image verification
      setVerifying(true);
      setTimeout(() => setVerifying(false), 1200);
    };
    reader.readAsDataURL(f);
  }

  function submit() {
    const c = createComplaint({
      title,
      description: desc,
      category,
      photo,
      anonymous: anon,
    });
    router.push(`/citizen/complaints#${c.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Report an Issue</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded h-28"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      >
        <option>Road</option>
        <option>Garbage</option>
        <option>Streetlight</option>
        <option>Water</option>
        <option>Other</option>
      </select>
      <div className="flex items-center gap-3">
        <input
          id="anon"
          type="checkbox"
          checked={anon}
          onChange={(e) => setAnon(e.target.checked)}
        />
        <label htmlFor="anon">Report anonymously</label>
      </div>
      <div>
        <label className="block mb-2">Upload Photo</label>
        <input type="file" accept="image/*" onChange={handleFile} />
        {verifying && (
          <div className="mt-2 text-sm text-yellow-600">
            Image validation in progress…
          </div>
        )}
        {photo && (
          <img
            src={photo}
            alt="preview"
            className="mt-2 w-48 h-32 object-cover rounded"
          />
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={submit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit
        </button>
        <a href="/citizen/complaints" className="px-4 py-2 bg-gray-200 rounded">
          My Complaints
        </a>
      </div>
    </div>
  );
}
