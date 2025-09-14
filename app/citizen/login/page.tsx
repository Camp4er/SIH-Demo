"use client";
import React from "react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Citizen Portal</h2>
            <p className="text-blue-100">Report Issues & Track Progress</p>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-blue-700 text-sm font-medium">Demo Mode</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Welcome to the civic issue reporting demo. Report problems in your community 
                and track their resolution progress.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Report civic issues with photos</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Track complaint status in real-time</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Chat directly with officials</span>
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Anonymous reporting available</span>
              </div>
            </div>

            {/* Login Button */}
            <Link
              href="/citizen/report"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">📝</span>
              Continue as Citizen
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                🌟 Your voice matters - help make your community better
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-xl font-bold text-blue-600">Fast</div>
            <div className="text-xs text-gray-600">Reporting</div>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">Tracking</div>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-xl font-bold text-blue-600">Safe</div>
            <div className="text-xs text-gray-600">Anonymous</div>
          </div>
        </div>
      </div>
    </div>
  );
}