// src/App.jsx

// 1. Core Imports
import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; 

// Database Service (Placeholder for Firebase hook)
import { useDataService } from './services/useDataService'; 

// 2. Component Imports (Assuming they are correctly organized in the filesystem)
import Dashboard from './components/Dashboard'; 
import PaperManagement from './components/PaperManagement';
import SiteSettings from './components/SiteSettings';
import Navbar from './components/Navbar'; 
import Login from './components/Login'; 

// 3. Main Application Component
function App() {
    // Authentication State
    const auth = getAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    // Auth State Listener
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsAuthenticated(!!user); 
        setAuthLoading(false); 
      });
      return unsubscribe; 
    }, [auth]);
    
    // Data Service
    // Placeholder usage: Assumes useDataService is defined elsewhere and fetches data
    const { researchPapers, siteSettings, loading, error } = useDataService();

    // Handle Logout
    const handleLogout = () => {
      signOut(auth);
    };

    // --- LOADING SCREENS & ERROR SCREENS ---
    if (authLoading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-xl font-semibold text-indigo-600">
            Initializing Authentication...
          </div>
        </div>
      );
    }
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="text-xl font-semibold text-indigo-600">
            Connecting to Firebase...
          </div>
        </div>
      );
    }
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

    // 4. Main Application Layout
    return (
      <Router>
        {/* Main wrapper with min height to ensure footer positioning */}
        <div className="min-h-screen flex flex-col"> 
          
          {/* Top CMS Administration Bar - Placeholder Navbar component */}
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

          {/* Main content area that grows to fill space */}
          <main className="flex-grow">
            <Routes>
              {/* PUBLIC ROUTE: Dashboard with full page styling */}
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    papers={researchPapers} 
                    settings={siteSettings} 
                    isAuthenticated={isAuthenticated} 
                  />
                } 
              />
              
              {/* PROTECTED ROUTES */}
              <Route 
                path="/manage-papers" 
                element={
                  isAuthenticated ? (
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-180px)]">
                      <PaperManagement />
                    </div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              <Route 
                path="/site-settings" 
                element={
                  isAuthenticated ? (
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-180px)]">
                      <SiteSettings />
                    </div>
                  ) : (
                    <Navigate to="/" replace />
                  )
                } 
              />
              
              {/* Login route */}
              <Route path="/login" element={<Login />} />
              
            </Routes>
          </main>

          {/* Simple Footer */}
          <footer className="w-full bg-gray-800 text-white text-center p-3 mt-auto">
            <p className="text-sm">CMS Developed by Your Name | &copy; {new Date().getFullYear()}</p>
          </footer>
          
        </div>
      </Router>
    );
}

export default App;