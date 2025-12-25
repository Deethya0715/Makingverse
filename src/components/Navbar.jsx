import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/public/DEAM_Lab_Logo.png';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const Navbar = ({ isAdmin, onLogout }) => {
  // Added !important to the base background and text colors to fight CSS overrides
  const btnClasses = "px-4 py-2 rounded text-sm font-semibold transition-all duration-200 flex items-center justify-center";

  return (
    <nav className="navbar w-full bg-white py-4 border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="flex flex-col items-center mb-4"> 
          <img src={logo} alt="DEAM Lab Logo" className="logo-img" style={{ maxHeight: '60px' }} />
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className={`${btnClasses} hover:!bg-gray-100`} 
            style={{ color: COLOR_BLUE_HEADER || '#234055' }}
          >
            Research
          </Link>

          {isAdmin && (
            <>
              {/* Added !bg-sky-600 and !text-white to ensure the button is visible */}
              <Link 
                to="/admin-add-paper" 
                className={`${btnClasses} !bg-sky-600 !text-white hover:!bg-sky-700 shadow-sm`}
              >
                Add Paper
              </Link>
              
              <button 
                onClick={onLogout} 
                className={`${btnClasses} !bg-sky-600 !text-white hover:!bg-sky-700 shadow-sm`}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;