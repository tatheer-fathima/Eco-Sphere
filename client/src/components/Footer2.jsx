import React from 'react';
import { Link } from "react-router-dom";
import logo2 from '../assets/new_footer.png';
import Visit from './Visitor';
import './Footer2.css'; // Don't forget this

const Footer2 = () => {
  return (
    <footer className="bg-gray-900 shadow">
      <div className="footer-container">
        <div className="footer-content">
          <a href="#" className="logo-link">
            <img src={logo2} alt="Logo" className="footer-logo" />
          </a>

          <ul className="footer-links">
            <li><Link to="/aboutUs">About</Link></li>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/information">Information</Link></li>
            <li><Link to="/contactUs">Contact</Link></li>
          </ul>
        </div>

       
        <Visit />
        <span className="block text-sm text-gray-500 text-center"> {/* Removed dark:text-gray-400 */}
           © 2025 <span className="hover:underline">Eco Sphere</span>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer2;


// import React from 'react';
// import { Link } from "react-router-dom";
// import logo2 from '../assets/new_footer.png';
// import Visit from './Visitor';

// const Footer2 = () => {
//   return (
//     <footer className="bg-gray-500 shadow "> {/* Changed from bg-gray-900 to bg-white */}
//       <div className="w-full max-w-2s mx-auto p-4 md:py-8">

//         <div className="flex flex-col items-center justify-center text-center space-y-6">
//           {/* Logo */}
//           <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
//             <img src={logo2} alt="Logo" style={{ height: '80px', width: 'auto' }} />
//           </a>

//           {/* Navigation Links with space between items */}
//           <ul className="flex flex-wrap justify-center text-sm font-medium text-gray-500 gap-6"> {/* Removed dark:text-gray-400 */}
//             <li>
//               <Link to="/aboutUs" className="hover:underline">About</Link>
//             </li>
//             <li>
//               <Link to="/calculator" className="hover:underline">Calculator</Link>
//             </li>
//             <li>
//               <Link to="/information" className="hover:underline">Information</Link>
//             </li>
//             <li>
//               <Link to="/contactUs" className="hover:underline">Contact</Link>
//             </li>
//           </ul>
//         </div>

//         <hr className="my-6 border-gray-200" /> {/* Removed dark:border-gray-700 */}
//         <Visit />
//         <span className="block text-sm text-gray-500 text-center"> {/* Removed dark:text-gray-400 */}
//           © 2025 <span className="hover:underline">Eco Sphere</span>. All Rights Reserved.
//         </span>
//       </div>
//     </footer>
//   );
// };

// export default Footer2;