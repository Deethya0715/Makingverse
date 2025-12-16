// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 

import PublicDisplay from './components/PublicDisplay'; 
import PaperSubmissionForm from './components/PaperSubmissionForm'; 
import Navbar from './components/Navbar'; 
import './App.css'; 


export default function App() {
  return (
    <Router>
      <div className="app-root min-h-screen bg-gray-50">
        
        {/* Navigation Banner */}
        <nav className="bg-white shadow p-4 mb-8 flex justify-between items-center">
            {/* Link to the Public Home Page */}
            <Link to="/" className="text-2xl font-extrabold text-sky-700">Makingverse Repository</Link>
            
            {/* Admin Link */}
            <Link to="/admin-input" className="text-sm text-gray-500 hover:text-red-500 underline">Admin Input</Link>
        </nav>
        
        <div className="site-wrap mx-auto px-4 sm:px-6 lg:px-8">
            
            <Routes>
              
              {/* Public Route: The main page shows all papers */}
              <Route path="/" element={<PublicDisplay />} />
              
              {/* Admin Route: The secret page for data entry */}
              <Route path="/admin-input" element={<PaperSubmissionForm />} />

              <Route path="*" element={<h1 className="text-center p-20 text-3xl">404: Page Not Found</h1>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}