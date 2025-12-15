import React from 'react';
import logo from '../assets/public/DEAM_Lab_Logo.png';
import { COLOR_BLUE_HEADER } from '../constants/colors';

const Navbar = () => (
  <nav className="navbar w-full bg-white py-3">
    <div className="mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">

      <a href="/" className="flex flex-col items-center space-y-2"> 
        <img src={logo} alt="DEAM Lab Logo" className="logo-img" />
        <div className="text-center">
        </div>
      </a>

      <a 
        href="/research" 
        className="nav-link mt-2 block text-center" 
        style={{ color: COLOR_BLUE_HEADER }}
      >
        Research
      </a>
    </div>
  </nav>
);

export default Navbar;