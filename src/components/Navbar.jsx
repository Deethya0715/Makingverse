import React from 'react';
import logo from '../assets/react.svg';

const Navbar = () => {
  return (
    // Added sticky top-0 and z-10 for layering and fixed position when scrolling
    <nav className="bg-transparent sticky top-0 z-20 border-b border-black/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center space-y-2">
        
        {/* Logo on the left */}
        <div className="flex items-center justify-center">
          <a href="/" className="flex items-center space-x-2 justify-center">
            <img 
              src={logo} 
              alt="DEAM Lab Logo" 
              // Logo size set to h-6 w-6 (24px x 24px) for a professional, small look
              className="h-6 w-6" 
            />
            {/* Optional: Add a text name next to the logo if needed */}
            <span className="text-xl font-bold text-sky-400 tracking-tight hidden sm:block">
              DEAM Lab
            </span>
          </a>
        </div>

        {/* Links on the right */}
        <div className="flex items-center space-x-8 justify-center">
          <a href="/research" className="text-gray-200 hover:text-sky-300 font-medium transition">Research</a>
          <a href="/team" className="text-gray-200 hover:text-sky-300 font-medium transition">Team</a>
          <a href="/contact" className="text-gray-200 hover:text-sky-300 font-medium transition">Contact</a>
          <a href="/login" className="text-white bg-sky-600 px-4 py-1 rounded-full font-semibold shadow-sm hover:opacity-95 transition">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;