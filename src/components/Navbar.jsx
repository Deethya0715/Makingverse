import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import logo from '../assets/public/DEAM_Lab_Logo.png';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const Navbar = ({ isAdmin, onLogout }) => (
  <nav className="navbar w-full bg-white py-3 border-b border-gray-100">
    <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

      <Link to="/" className="flex flex-col items-center space-y-2"> 
        <img src={logo} alt="DEAM Lab Logo" className="logo-img" style={{ maxHeight: '60px' }} />
      </Link>

      <div className="flex items-center gap-6 mt-2">
        <Link 
          to="/" 
          className="nav-link text-sm font-medium" 
          style={{ color: COLOR_BLUE_HEADER }}
        >
          Research
        </Link>

        {/* Conditional Admin Button */}
        {isAdmin && (
          <>
            <Link 
              to="/admin-add-paper" 
              className="bg-sky-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-sky-700 transition"
            >
              ➕ Add Paper
            </Link>
            <button 
              onClick={onLogout} 
              className="text-xs text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

export default Navbar;