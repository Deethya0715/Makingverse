import React from 'react';
// Assuming your logo path is correct
import logo from '../../image.png'; 

const Navbar = () => {
  return (
    // Added sticky top-0 and z-10 for layering and fixed position when scrolling
    <nav className="bg-white shadow-lg sticky top-0 z-10 border-b border-gray-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo on the left */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="DEAM Lab Logo" 
              // Logo size set to h-6 w-6 (24px x 24px) for a professional, small look
              className="h-6 w-6" 
            />
            {/* Optional: Add a text name next to the logo if needed */}
            <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">
              DEAM Lab
            </span>
          </a>
        </div>

        {/* "Research" link on the right */}
        <div className="flex items-center">
          <a 
            href="/research" 
            className="text-gray-600 hover:text-indigo-600 font-semibold text-base 
                       transition duration-200 border-b-2 border-transparent hover:border-indigo-600 
                       pb-1"
          >
            Research
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;