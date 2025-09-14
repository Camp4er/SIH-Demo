"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "../../../../lib/store";
import ChatBox from "../../../../components/ChatBox";

export default function AuthorityComplaintDetails() {
  const { id } = useParams<{ id: string }>();
  const { complaints, updateStatus, addMessage } = useStore();
  const complaint = complaints.find((c) => c.id === id);
  const router = useRouter();
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [actionNotes, setActionNotes] = useState("");

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4">
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
              onClick={() => router.push('/authority/dashboard')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-blue-700 text-white rounded-lg hover:from-slate-800 hover:to-blue-800 transition-all duration-200 font-medium"
            >
              <span className="mr-2">🏛️</span>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-red-100 text-red-800 border-red-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "🚨";
      case "In Progress":
        return "⚙️";
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

  const handleStatusUpdate = (newStatus: any) => {
    updateStatus(complaint.id, newStatus);
    if (newStatus === "In Progress" && selectedTeam) {
      addMessage(complaint.id, {
        from: "authority",
        text: `Complaint assigned to ${selectedTeam}. Work will begin shortly.`,
      });
    }
  };

  const handleAssignTeam = () => {
    if (selectedTeam) {
      handleStatusUpdate("In Progress");
      addMessage(complaint.id, {
        from: "authority",
        text: `This complaint has been assigned to our ${selectedTeam}. ${actionNotes ? `Additional notes: ${actionNotes}` : "We will begin work shortly."}`,
      });
      setShowAssignModal(false);
      setActionNotes("");
    }
  };

  const quickReplies = [
    "We have received your complaint and will investigate shortly.",
    "Our team is currently working on this issue.",
    "Additional information has been requested from relevant departments.",
    "We expect this issue to be resolved within 48 hours.",
    "Thank you for your patience while we address this matter."
  ];

  const teams = [
    "Roads & Infrastructure Department",
    "Waste Management Team",
    "Electrical Maintenance Crew",
    "Water & Sanitation Department",
    "General Municipal Services"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/authority/dashboard')}
              className="inline-flex items-center text-slate-700 hover:text-blue-700 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Complaint ID:</span>
              <span className="font-mono text-sm bg-white px-3 py-1 rounded-lg border">{complaint.id}</span>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-700 to-blue-700 rounded-full mb-4">
            {getCategoryIcon(complaint.category)}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authority Review</h1>
          <div className="flex items-center justify-center gap-2">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
              {getStatusIcon(complaint.status)} {complaint.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Complaint Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-blue-700 px-8 py-6">
                <h2 className="text-xl font-semibold text-white">Complaint Details</h2>
                <p className="text-slate-200 text-sm mt-1">Official government review</p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{complaint.title}</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed">{complaint.description}</p>
                  </div>
                </div>

                {complaint.photo && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Evidence Photo</h4>
                    <img
                      src={complaint.photo}
                      alt="Complaint evidence"
                      className="w-full max-w-2xl h-80 object-cover rounded-xl border shadow-lg"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                    <p className="text-gray-700 flex items-center">
                      {getCategoryIcon(complaint.category)} {complaint.category}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy</h4>
                    <p className="text-gray-700">
                      {complaint.anonymous ? "🔒 Anonymous" : "👤 Public"}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <p className="text-gray-700">📍 GPS Detected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authority Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-700 to-blue-700 px-8 py-6">
                <h2 className="text-xl font-semibold text-white">Authority Actions</h2>
                <p className="text-slate-200 text-sm mt-1">Manage complaint status and assignments</p>
              </div>

              <div className="p-8 space-y-6">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="flex flex-wrap gap-3">
                    {complaint.status === "Pending" && (
                      <>
                        <button
                          onClick={() => setShowAssignModal(true)}
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          <span className="mr-2">👥</span> Assign Team
                        </button>
                        <button
                          onClick={() => handleStatusUpdate("In Progress")}
                          className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                        >
                          <span className="mr-2">⚙️</span> Mark In Progress
                        </button>
                      </>
                    )}
                    
                    {complaint.status !== "Resolved" && (
                      <button
                        onClick={() => handleStatusUpdate("Resolved")}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        <span className="mr-2">✅</span> Mark Resolved
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Replies */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Replies</h3>
                  <div className="space-y-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => addMessage(complaint.id, { from: "authority", text: reply })}
                        className="block w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm"
                      >
                        {reply}
                      </button>
                    ))}
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
                <div className={`flex items-center p-3 rounded-lg ${complaint.status === "Pending" ? "bg-red-50 border border-red-200" : "bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${complaint.status === "Pending" ? "bg-red-200" : "bg-gray-200"}`}>
                    🚨
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Reported</p>
                    <p className="text-sm text-gray-500">Complaint submitted</p>
                  </div>
                </div>
                
                <div className={`flex items-center p-3 rounded-lg ${complaint.status === "In Progress" ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${complaint.status === "In Progress" ? "bg-yellow-200" : "bg-gray-200"}`}>
                    ⚙️
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">In Progress</p>
                    <p className="text-sm text-gray-500">Team assigned</p>
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

            {/* Priority Assessment */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Assessment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Urgency:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    complaint.category === "Water" || complaint.category === "Road" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {complaint.category === "Water" || complaint.category === "Road" ? "High" : "Medium"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Public Impact:</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                    Community
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Department:</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {complaint.category === "Road" ? "Infrastructure" : 
                     complaint.category === "Water" ? "Utilities" :
                     complaint.category === "Garbage" ? "Sanitation" :
                     complaint.category === "Streetlight" ? "Electrical" : "General"}
                  </span>
                </div>
              </div>
            </div>

            {/* Citizen Information */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Citizen Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Identity:</span>
                  <span className={complaint.anonymous ? "text-orange-600" : "text-green-600"}>
                    {complaint.anonymous ? "🔒 Anonymous" : "👤 Identified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact:</span>
                  <span className="text-gray-600">
                    {complaint.anonymous ? "Not Available" : "Available"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-green-600">📍 GPS Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-blue-700 px-8 py-6">
              <h2 className="text-xl font-semibold text-white">Official Communication</h2>
              <p className="text-slate-200 text-sm mt-1">Communicate with the citizen about this complaint</p>
            </div>
            <div className="p-8">
            <ChatBox complaintId={complaint.id} userType="authority" />
            </div>
          </div>
        </div>

        {/* Assign Team Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Assign Team</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Team</label>
                  <select
                    value={selectedTeam}
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a team...</option>
                    {teams.map((team, index) => (
                      <option key={index} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes (Optional)</label>
                  <textarea
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Add any special instructions or notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAssignTeam}
                  disabled={!selectedTeam}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Assign Team
                </button>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}