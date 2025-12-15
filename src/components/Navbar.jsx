import React from 'react';
import logo from '../assets/public/DEAM_Lab_Logo.png';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const Navbar = () => (
  // Removed sticky/backdrop blur for simplicity, keeping background white
  <nav className="navbar w-full bg-white py-3">
    {/* Centering the entire content block: Use flex col and items-center to stack and center everything */}
    <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      
      {/* 1. Logo Group (Centered) */}
      {/* Ensure the entire clickable logo area is centered by parent's items-center */}
      <a href="/" className="flex flex-col items-center space-y-2"> 
        <img src={logo} alt="DEAM Lab Logo" className="logo-img" />
        <div className="text-center">
            {/* Assuming "DESIGN ENGINEERING MAKING" text is here or handled by the logo image */}
        </div>
      </a>

      {/* 2. Link Group FIX: Applying 'block' and 'text-center' ensures the link text itself is centrally aligned within the centered <a> tag. */}
      <a 
        href="/research" 
        className="nav-link mt-2 block text-center" // <-- Added 'block' and 'text-center'
        style={{ color: COLOR_BLUE_HEADER }}
      >
        Research
      </a>
    </div>
  </nav>
);

export default Navbar;