import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../DEAM_Lab_Logo.png';

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    // Main navigation bar height changed from h-12 to h-10
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center **h-10**"> 
        
        {/* Left Side: Logo and Research Link */}
        <div className="flex items-center space-x-6">
          
          {/* Logo Link height changed from h-8 to h-6 */}
          <Link to="/" className="flex items-center **h-6**">
            {/* The image should now be smaller (h-6) */}
            <img 
              src={logo} 
              alt="Design & Engineering for Making Logo" 
              className="h-full w-auto" // h-full scales it to the h-6 Link container
            />
          </Link>

          {/* Research Link */}
          <Link to="/research" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
            Research
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;