import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/headerlogo.png";
import leaf from "../assets/leaf.png";
import sun from "../assets/sun.png";
import moon from "../assets/moon.png"
//aos animation
import AOS from "aos";
import "aos/dist/aos.css";

function Header({ setLoggedIn }) {
  const [logIn, setLogIn] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState("light");
  
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  
  };

const handleMenuClick = () => {
    setShowMenu(false);
};

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "/api/auth/login/status", //http://localhost:3001/api/auth/login/status
          { withCredentials: true }
        );
        if (response.status === 200) {
          setLogIn(true);
        }
      } catch (error) {
        setLogIn(false);
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
});


  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("HERE")
        setLogIn(false);
        setLoggedIn(false);
        //checkLoginStatus();
        // toast.success("Logout successful!");
        navigate("/logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };
  
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }, []);
  
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.body.classList.toggle('dark-mode', newTheme === 'dark');
    };
    useEffect(()=>{
      AOS.init({
        duration: 1000,
      })
    })
  return (
    <div>
      <div>
        <ToastContainer autoClose={2000} position="top-center" newestOnTop />
        <nav
          className={`bg-gray-900 shadow ${
            theme === "dark" ? "bg-black " : "bg-gray-900 shadow"
          } `}
          data-aos="fade-down"
        >
          <div
            className={` flex flex-wrap items-center justify-between  px-2 py-5 `}
          >
            <div className="logo flex space-x-2 items-center ">
              <a href="#">
                <img className="h-12" src={leaf} />
              </a>
              <a href="#">
                <img className="h-12" src={logo} />
              </a>
            </div>

            <div className=" md:hidden flex items-center justify-center">
            <button onClick={toggleTheme}  className="  theme-toggle-btn p-2 rounded-full">
            <img src={theme === "light" ? moon : sun} alt="Toggle Theme" className="w-10 h-10" />
          </button>
            
            <button

              onClick={() => { handleToggleMenu();}}
              style={{fontSize:'30px'}}
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-white dark:text-gray-400 hover:bg-blue-600 fa ${showMenu ? 'fa-times' : 'fa-bars'} ${

                theme === "dark" ? "bg-gray-900 shadow" : "bg-gray-900 shadow"
              }`}
              aria-expanded={showMenu}
            >
              
            </button>
            </div>

            <div
              className={`w-full md:flex md:w-auto  ${
                showMenu ? "block" : "hidden"
              }`}
              id="navbar-default  "
            >
            <ul onClick={handleMenuClick}
            className={`font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 ${
              theme === "dark" ? "bg-gray-900 shadow" : "bg-gray-900 shadow"
            }`}
            
          >
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutUs"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                }`}
              >
                About
              </Link>
            </li>

            {logIn && (
              <>   
              <li>
                <Link
                  to="/calculator"
                  className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                    theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                  }`}
                >
                  Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                    theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                  }`}
                >
                  History
                </Link>
              </li>
              </>
            )}
            <li>
              <Link
                to="/information"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                }`}
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                to="/tips"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                }`}
              >
                Tips
              </Link>
            </li>
            <li>
              <Link
                to="/contactUs"
                className={`block py-2 px-3 rounded md:hover:bg-transparent md:p-0 ${
                  theme === "dark" ? "text-white hover:text-white" : "text-white md:hover:text-white hover:bg-gray-700"
                }`}
              >
                Contact
              </Link>
            </li>

            <div className="btns md:hidden">
              {logIn ? (
                <button
                  onClick={handleLogout}
                  className="btn w-full text-start bg-white mt-3 px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <li className="btn bg-white px-3 py-1 mb-2 mt-3 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Login
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="btn bg-white flex px-3 py-1 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </div>
          </ul>
            </div>
            
            <div className="btns hidden justify-center items-center font-medium md:flex space-x-2">
            <button onClick={toggleTheme} className="theme-toggle-btn p-2 rounded-full">
            <img src={theme === "light" ? moon : sun} alt="Toggle Theme" className="w-7 h-7" />
          </button>
              {logIn ? (
                <button
                  onClick={handleLogout}
                  className="btn bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login">
                    <li className="btn list-none bg-white px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Login
                    </li>
                  </Link>
                  <Link to="/register">
                    <li className="btn bg-white flex px-3 py-2 font-Rubik rounded-full hover:bg-black hover:text-white">
                      Sign Up
                    </li>
                  </Link>
                </>
              )}
            </div>

            
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;