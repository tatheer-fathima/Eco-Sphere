import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Logo from '../assets/google.png';

function LoginForm({ setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      }, { withCredentials: true });
  
      console.log("Logged in user:", response.data);

      // Check if the login response is for an admin or normal user
      if (response.data.type === "admin") {
        toast.success("Redirecting to Admin Dashboard.");
        localStorage.setItem('isAdminLoggedIn', 'true');
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.success("Login successful!");
        setLoggedIn(true);
        navigate("/calculator");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.response) {
        console.error("Response Error:", error.response.data);
        console.error("Response Status:", error.response.status);

        // Handle different error status codes
        if (error.response.status === 402) {
          toast.error("Verify Your Email First.");
          setTimeout(() => {
            navigate("/verifyEmail");
          }, 2000);
        } else {
          toast.error("Error logging in. Please check your credentials.");
        }
      } else {
        console.error("Error Message:", error.message);
        toast.error("Network error or unexpected issue.");
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';  // Make sure your backend handles this route
  };

  return (
    <div>
      <ToastContainer autoClose={4000} position="top-center" newestOnTop />
      <div className="login m-4 flex-grow flex justify-center items-center space-x-2 my-16">
        <div className="loginBox flex flex-col bg-gray-200 p-5 md:p-10 space-y-3 rounded-lg justify-center">
          <h1 className="text-center font-medium text-xl md:text-2xl py-4">Login Form</h1>

          <div className="inputs flex flex-col space-y-2">
            <input
              type="email"
              className="username rounded-lg px-3 p-2 md:px-4 md:p-3"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full password rounded-lg px-3 p-2 md:px-4 md:p-3"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer">
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>

          <button
            className="btn p-2 rounded-full bg-green-500 hover:bg-green-600"
            onClick={handleLogin}>
            Login
          </button>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="btn flex items-center justify-center p-2 rounded-full bg-blue-400 hover:bg-blue-600 mt-4">
            <img src={Logo} alt="Google logo" className="w-6 h-6 mr-2" />
            Login with Google
          </button>

          <div className="signUp">
            Forgot Password?{" "}
            <Link to="/resetPassword" className="text-blue-700 hover:underline">
              Reset Password
            </Link>
          </div>

          <div className="signUp">
            Don't have an account? Create one by{" "}
            <Link to="/register" className="text-blue-700 hover:underline">
              Clicking here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
