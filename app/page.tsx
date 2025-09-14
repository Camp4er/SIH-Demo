export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <span className="text-blue-800 text-sm font-medium">🚀 SIH 2025 Demo</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Civic Issue Reporting
              </span>
              <br />
              <span className="text-gray-800">Platform Demo</span>
            </h1>
            
            {/* Subtitle */}
            <p className="max-w-3xl mx-auto text-xl text-gray-600 mb-12 leading-relaxed">
              Empowering citizens to report civic issues seamlessly while enabling authorities 
              to manage and resolve complaints efficiently through modern digital solutions.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Issue Reporting</h3>
                <p className="text-sm text-gray-600">Report problems with photos and location data</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
                <p className="text-sm text-gray-600">Monitor complaint status and resolution progress</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Authority Dashboard</h3>
                <p className="text-sm text-gray-600">Comprehensive management tools for officials</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Direct Communication</h3>
                <p className="text-sm text-gray-600">Chat system between citizens and officials</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Portal</h2>
          <p className="text-gray-600">Access the platform based on your role</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Citizen Portal */}
          <a 
            href="/citizen/login" 
            className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Citizen Portal</h3>
              <p className="text-blue-100 text-sm">Report issues, track progress, communicate</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Submit civic complaints with evidence</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Track resolution status in real-time</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span>Anonymous reporting option available</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">For Citizens</span>
                  <span className="text-blue-600 font-medium group-hover:text-indigo-600">Get Started →</span>
                </div>
              </div>
            </div>
          </a>

          {/* Authority Portal */}
          <a 
            href="/authority/login" 
            className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="bg-gradient-to-br from-slate-700 to-blue-700 p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🏛️</span>
                </div>
                <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">Authority Portal</h3>
              <p className="text-slate-200 text-sm">Manage complaints, assign teams, communicate</p>
            </div>
            
            <div className="p-8">
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                  <span>Review and manage all complaints</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                  <span>Assign teams and update status</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-2 h-2 bg-slate-600 rounded-full mr-3"></div>
                  <span>Direct communication with citizens</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">For Officials</span>
                  <span className="text-slate-700 font-medium group-hover:text-blue-700">Access Dashboard →</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">🔧</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Demo Features</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This demonstration includes image upload with mock verification, complaint tracking, 
              authority dashboard management, and real-time chat communication between portals.
            </p>
            
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full">
              <span className="text-gray-700 text-sm">Built for SIH 2025 • Secure & Scalable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}