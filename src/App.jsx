// src/App.jsx

// 1. Core Imports
import { useDataService } from './services/useDataService'; // Handles Firebase/Firestore connection
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For navigation

// 2. Component Imports (Placeholders for Phase 2)
import Dashboard from './components/Dashboard';
import PaperManagement from './components/PaperManagement';
import SiteSettings from './components/SiteSettings';
import Navbar from './components/Navbar'; // A simple navigation bar

// 3. Main Application Component
function App() {
  // *** THE CRUCIAL REAL-TIME DATA PLUMBING ***
  // This hook is now running, constantly listening to Firestore collections
  // research_papers and site_settings for real-time updates.
  const { researchPapers, siteSettings, loading, error } = useDataService();
  
  // A simple loading screen while the connection is established
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600">
          Connecting to Firebase...
        </div>
      </div>
    );
  }

  // A simple error screen if the connection fails
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="p-6 bg-white border border-red-400 rounded-lg shadow-lg text-red-700">
          <h2 className="text-2xl font-bold mb-2">Error Connecting to Database</h2>
          <p className="font-mono text-sm">
            Please check your Firebase configuration and network status.
          </p>
          <p className="mt-4">
            Details: {error.message}
          </p>
        </div>
      </div>
    );
  }

  // 4. Main Application Layout (Tailwind Integrated)
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar - Stays on top */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
              Researcher CMS Dashboard
            </h1>

            {/* Route Definitions */}
            <Routes>
              {/* This route displays the list of papers (Phase 3) */}
              <Route path="/" element={<Dashboard papers={researchPapers} settings={siteSettings} />} />
              
              {/* This route will contain the Paper Management Form (Phase 2) */}
              <Route path="/manage-papers" element={<PaperManagement />} />
              
              {/* This route will contain the Site Settings Form (Phase 4) */}
              <Route path="/site-settings" element={<SiteSettings />} />
            </Routes>

            {/* Displaying Live Data Count for confirmation */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500">
              <p>
                **Live Data Connected:** **{researchPapers.length}** Research Papers Loaded.
                Site Settings Status: **{siteSettings ? 'Loaded' : 'Awaiting Data'}**
              </p>
            </div>
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="w-full bg-gray-800 text-white text-center p-3">
          <p className="text-sm">CMS Developed by Your Name | &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;