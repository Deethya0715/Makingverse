// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Navbar now accepts authentication status and the logout handler from App.jsx
const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav className="bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                
                {/* Logo / Public Home Link */}
                <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-200 transition duration-150">
                    🔬 Researcher CMS
                </Link>
                
                <div className="flex items-center space-x-6">
                    {/* PUBLIC LINK */}
                    <Link to="/" className="hover:text-gray-300 transition duration-150">
                        Dashboard (Public)
                    </Link>

                    {/* COLLABORATOR LINKS - Only show if logged in */}
                    {isAuthenticated && (
                        <>
                            <Link to="/manage-papers" className="hover:text-gray-300 transition duration-150 font-semibold bg-indigo-600 px-3 py-1 rounded">
                                Manage Papers
                            </Link>
                            <Link to="/site-settings" className="hover:text-gray-300 transition duration-150">
                                Settings
                            </Link>
                        </>
                    )}

                    {/* AUTH BUTTON - Dynamic Sign In/Sign Out */}
                    {isAuthenticated ? (
                        <button 
                            onClick={onLogout}
                            className="text-sm py-1 px-3 bg-red-600 rounded-full hover:bg-red-700 transition duration-150 shadow-md"
                        >
                            Sign Out
                        </button>
                    ) : (
                        // If not logged in, show the button to navigate to the Login page
                        <Link to="/manage-papers" className="text-sm py-1 px-3 bg-green-600 rounded-full hover:bg-green-700 transition duration-150 shadow-md">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;