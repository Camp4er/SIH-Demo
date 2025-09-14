"use client";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "../../../../lib/store";
import ChatBox from "../../../../components/ChatBox";

export default function ComplaintDetails() {
  const { id } = useParams<{ id: string }>();
  const { complaints } = useStore();
  const complaint = complaints.find((c) => c.id === id);
  const router = useRouter();

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">❌</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Complaint Not Found</h3>
            <p className="text-gray-600 mb-6">
              The complaint you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "⏳";
      case "In Progress":
        return "🔄";
      case "Resolved":
        return "✅";
      default:
        return "📋";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Road":
        return "🛣️";
      case "Garbage":
        return "🗑️";
      case "Streetlight":
        return "💡";
      case "Water":
        return "💧";
      default:
        return "📋";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Complaints
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
            {getCategoryIcon(complaint.category)}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complaint Details</h1>
          <div className="flex items-center justify-center gap-2">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
              {getStatusIcon(complaint.status)} {complaint.status}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Complaint Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-xl font-semibold text-white">Issue Information</h2>
              </div>

              <div className="p-8">
                {/* Title and Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{complaint.title}</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">{complaint.description}</p>
                  </div>
                </div>

                {/* Photo */}
                {complaint.photo && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Photo Evidence</h4>
                    <div className="relative">
                      <img
                        src={complaint.photo}
                        alt="Complaint evidence"
                        className="w-full max-w-2xl h-80 object-cover rounded-xl border shadow-lg"
                      />
                      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                        Evidence Photo
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a2 2 0 012-2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900">Category</h4>
                    </div>
                    <p className="text-gray-700 text-lg flex items-center">
                      {getCategoryIcon(complaint.category)} {complaint.category}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-gray-900">Location</h4>
                    </div>
                    <p className="text-gray-700">📍 Location detected automatically</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h3>
              <div className="space-y-4">
                <div className={`flex items-center p-3 rounded-lg ${complaint.status === "Pending" ? "bg-amber-50 border border-amber-200" : "bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${complaint.status === "Pending" ? "bg-amber-200" : "bg-gray-200"}`}>
                    ⏳
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Submitted</p>
                    <p className="text-sm text-gray-500">Complaint received</p>
                  </div>
                </div>
                
                <div className={`flex items-center p-3 rounded-lg ${complaint.status === "In Progress" ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${complaint.status === "In Progress" ? "bg-blue-200" : "bg-gray-200"}`}>
                    🔄
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">In Progress</p>
                    <p className="text-sm text-gray-500">Work has started</p>
                  </div>
                </div>
                
                <div className={`flex items-center p-3 rounded-lg ${complaint.status === "Resolved" ? "bg-green-50 border border-green-200" : "bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${complaint.status === "Resolved" ? "bg-green-200" : "bg-gray-200"}`}>
                    ✅
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Resolved</p>
                    <p className="text-sm text-gray-500">Issue completed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Complaint ID:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{complaint.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Anonymous:</span>
                  <span className={complaint.anonymous ? "text-green-600" : "text-gray-600"}>
                    {complaint.anonymous ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Priority:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-xl font-semibold text-white">Communication</h2>
              <p className="text-blue-100 text-sm mt-1">Chat with officials about this complaint</p>
            </div>
            <div className="p-8">
            <ChatBox complaintId={complaint.id} userType="citizen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}