"use client";
import React, { useState } from "react";
import { useStore } from "../../../lib/store";
import Link from "next/link";

export default function Dashboard() {
  const { complaints, updateStatus, addMessage } = useStore();
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  function quickReply(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addMessage(id, {
      from: "authority",
      text: "We have assigned a team. Will update soon.",
    });
    updateStatus(id, "In Progress");
  }

  function handleStatusChange(id: string, status: any, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    updateStatus(id, status);
  }

  const filteredComplaints = complaints.filter(complaint => {
    const statusMatch = filterStatus === "All" || complaint.status === filterStatus;
    const categoryMatch = filterCategory === "All" || complaint.category === filterCategory;
    return statusMatch && categoryMatch;
  });

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

  const getPriorityLevel = (status: string, category: string) => {
    if (status === "Pending" && (category === "Water" || category === "Road")) return "High";
    if (status === "Pending") return "Medium";
    return "Normal";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">🏛️</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Authority Dashboard</h1>
                  <p className="text-gray-600">Municipal Complaint Management System</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border">
                <p className="text-sm text-gray-600">Active Session</p>
                <p className="font-semibold text-gray-900">Government Official</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Complaints</p>
                <p className="text-3xl font-bold text-gray-900">{complaints.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-red-600">{complaints.filter(c => c.status === "Pending").length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">🚨</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{complaints.filter(c => c.status === "In Progress").length}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⚙️</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{complaints.filter(c => c.status === "Resolved").length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Complaints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                <option value="Road">Road</option>
                <option value="Garbage">Garbage</option>
                <option value="Streetlight">Streetlight</option>
                <option value="Water">Water</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Complaints ({filteredComplaints.length})
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredComplaints.length} of {complaints.length} complaints
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {complaints.length === 0 ? "No complaints submitted yet" : "No complaints match your filters"}
                </h3>
                <p className="text-gray-600">
                  {complaints.length === 0 
                    ? "Citizens haven't reported any issues yet."
                    : "Try adjusting your filters to see more results."
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredComplaints.map((c) => {
                const priority = getPriorityLevel(c.status, c.category);
                return (
                  <Link key={c.id} href={`/authority/complaints/${c.id}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden">
                      {/* Priority Bar */}
                      {priority === "High" && (
                        <div className="bg-red-500 h-1 w-full"></div>
                      )}
                      {priority === "Medium" && (
                        <div className="bg-orange-500 h-1 w-full"></div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex gap-4">
                          {/* Photo */}
                          <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {c.photo ? (
                              <img
                                src={c.photo}
                                alt="Complaint evidence"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                {getCategoryIcon(c.category)}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 truncate pr-2">{c.title}</h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(c.status)}`}>
                                {getStatusIcon(c.status)} {c.status}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{c.description}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                              <span className="flex items-center gap-1">
                                {getCategoryIcon(c.category)} {c.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full ${getPriorityColor(priority)}`}>
                                {priority} Priority
                              </span>
                              {c.anonymous && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  Anonymous
                                </span>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 flex-wrap">
                              {c.status === "Pending" && (
                                <button
                                  onClick={(e) => handleStatusChange(c.id, "In Progress", e)}
                                  className="inline-flex items-center px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-xs font-medium"
                                >
                                  <span className="mr-1">⚙️</span> Start Work
                                </button>
                              )}
                              
                              {c.status !== "Resolved" && (
                                <button
                                  onClick={(e) => handleStatusChange(c.id, "Resolved", e)}
                                  className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                                >
                                  <span className="mr-1">✅</span> Mark Resolved
                                </button>
                              )}
                              
                              <button
                                onClick={(e) => quickReply(c.id, e)}
                                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
                              >
                                <span className="mr-1">💬</span> Quick Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}