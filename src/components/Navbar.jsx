import React from 'react';
import logo from '../assets/public/DEAM_Lab_Logo.png';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const Navbar = () => (
  // Remove sticky/backdrop blur for simplicity, keeping background white
  <nav className="navbar w-full bg-white py-3">
    {/* Centering the entire content block: Use flex col and items-center to stack and center everything */}
    <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* 1. Logo Group: Centered horizontally by parent div */}
      <a href="/" className="flex flex-col items-center space-y-2"> 
        <img src={logo} alt="DEAM Lab Logo" className="logo-img" />
        {/* Remove hidden md:block if you want the "DESIGN ENGINEERING..." text always visible */}
        <div className="text-center">
        </div>
      </a>

      {/* 2. Link Group: Centered horizontally by parent div */}
      <div className="flex items-center gap-6 mt-2">
        <a href="/research" className="nav-link" style={{ color: COLOR_BLUE_HEADER }}>Research</a>
      </div>
    </div>
  </nav>
);

export default Navbar;