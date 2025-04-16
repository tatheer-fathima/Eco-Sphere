import React from 'react';
import { Link } from "react-router-dom";
import logo2 from '../assets/new_footer.png';
import Visit from './Visitor';

const Footer2 = () => {
  return (
    <footer className="bg-gray-900 shadow">
      <div className="w-full max-w-2s mx-auto p-4 md:py-8">

        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo2} alt="Logo" style={{ height: '80px', width: 'auto' }} />
          </a>

          {/* Navigation Links with space between items */}
          <ul className="flex flex-wrap justify-center text-sm font-medium text-gray-500 dark:text-gray-400 gap-6">
            <li>
              <Link to="/aboutUs" className="hover:underline">About</Link>
            </li>
            <li>
              <Link to="/calculator" className="hover:underline">Calculator</Link>
            </li>
            <li>
              <Link to="/information" className="hover:underline">Information</Link>
            </li>
            <li>
              <Link to="/contactUs" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />
        <Visit />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2025 <span className="hover:underline">Eco Sphere</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer2;
