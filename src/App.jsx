// src/App.jsx

// 1. Core Imports
import React, { useState, useEffect } from 'react'; // ADDED useState and useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // ADDED AUTH IMPORTS

// Database Service
import { useDataService } from './services/useDataService'; // Handles Firebase/Firestore connection

// 2. Component Imports
import Dashboard from './components/Dashboard';
import PaperManagement from './components/PaperManagement';
import SiteSettings from './components/SiteSettings';
import Navbar from './components/Navbar'; // A simple navigation bar
import Login from './components/Login'; // ADDED LOGIN COMPONENT

// 3. Main Application Component
function App() {
  // Authentication State
  const auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth State Listener: Runs once on mount to check if a user is logged in
  useEffect(() => {
    // We use onAuthStateChanged to constantly listen for login/logout events
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set true if user exists, false otherwise
      setAuthLoading(false); // Authentication check is complete
    });
    return unsubscribe; // Cleanup the subscription when the component unmounts
  }, [auth]);
  
  // Data Service
  const { researchPapers, siteSettings, loading, error } = useDataService();

  // Handle Logout (passed to Navbar)
  const handleLogout = () => {
    signOut(auth);
  };

  // --- LOADING SCREENS ---

  // 1. Authentication Loading Screen
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600">
          Initializing Authentication...
        </div>
      </div>
    );
  }

  // 2. Data Loading Screen (Original logic)
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600">
          Connecting to Firebase...
        </div>
      </div>
    );
  }

  // A simple error screen if the connection fails (Original logic)
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
        {/* Navigation Bar - Pass auth state and handler */}
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
              Researcher CMS Dashboard
            </h1>

            {/* Route Definitions - Conditional Routing Added */}
            <Routes>
              {/* PUBLIC ROUTE: The Dashboard is always accessible */}
              <Route path="/" element={<Dashboard papers={researchPapers} settings={siteSettings} />} />
              
              {/* PROTECTED ROUTES: Only accessible if isAuthenticated is true */}
              {isAuthenticated ? (
                <>
                  {/* These routes show the forms if logged in */}
                  <Route path="/manage-papers" element={<PaperManagement />} />
                  <Route path="/site-settings" element={<SiteSettings />} />
                </>
              ) : (
                <>
                  {/* These routes show the Login form if NOT logged in */}
                  {/* The public user will only see this if they manually navigate to these URLs. */}
                  <Route path="/manage-papers" element={<Login />} />
                  <Route path="/site-settings" element={<Login />} />
                </>
              )}
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