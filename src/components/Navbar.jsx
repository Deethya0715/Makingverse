// src/components/Navbar.jsx (Revised for standard horizontal layout)

import React from 'react';
import logo from "../assets/public/DEAM_Lab_Logo.png";

const Navbar = () => {
  return (
    // The fixed/sticky positioning and z-index are great!
    // Using bg-white/90 and backdrop-blur is a common modern effect for transparency.
    // I've changed 'bg-transparent' to 'bg-white/90' for better visibility against potential background content.
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-20 border-b border-black/20">
      
      {/* The key change: use 'flex' and 'justify-between' 
        to place children (Logo and Links) on opposite sides.
        Removed 'flex-col' and 'space-y-2' from the container.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo/Title on the Left */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="DEAM Lab Logo" 
              className="logo-img" 
            />
            {/* Kept the text hidden on small screens, visible on medium+ */}
            <span className="text-xl font-bold text-sky-600 tracking-tight hidden md:block">
              DEAM Lab
            </span>
          </a>
        </div>

        {/* Links on the Right */}
        {/* Using 'text-gray-700' and 'bg-sky-600' to fit a light background */}
        <div className="flex items-center space-x-8">
          <a href="/research" className="text-gray-700 hover:text-sky-600 font-medium transition">Research</a>
          <a href="/team" className="text-gray-700 hover:text-sky-600 font-medium transition">Team</a>
          <a href="/contact" className="text-gray-700 hover:text-sky-600 font-medium transition">Contact</a>
          <a 
            href="/login" 
            className="text-white bg-sky-600 px-4 py-1.5 rounded-full font-semibold shadow-md hover:bg-sky-700 transition duration-300 text-sm"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;