import { useState } from "react";
import { useNavigate } from "react-router-dom";
import facebookLogo from "../assets/facebook-logo.svg";
import googleLogo from "../assets/google-logo.svg";
import Navbar from "@/Components/Navbar";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // (add API call here)

    navigate("/user-details");
  };

  return (
    <div className="font-[poppins] min-h-screen m-0 bg-[#DDE2FF] flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <div className="flex-grow flex justify-center items-center py-8 px-4">
        <div className="bg-white w-full max-w-screen-sm md:max-w-screen-md lg:max-w-lg xl:max-w-xl rounded-[21px] shadow-md p-6 md:p-12 flex flex-col items-center">
          {/* Tab Buttons */}
          <div className="w-full flex items-center justify-center border border-[#0033A1] rounded-full overflow-hidden">
            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-500 ${
                activeTab === "signup" ? "bg-[#0033A1] text-white" : "bg-transparent text-[#0033A1]"
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-500 ${
                activeTab === "login" ? "bg-[#0033A1] text-white" : "bg-transparent text-[#0033A1]"
              }`}
            >
              Log in
            </button>
          </div>

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <div className="w-full mt-6">
              <h2 className="text-[#3AB54A] text-2xl font-semibold text-center">Sign up</h2>
              <form className="mt-6 space-y-6" onSubmit={handleSignup}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="first-name" className="text-sm text-gray-700 font-light">
                      First name
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label htmlFor="last-name" className="text-sm text-gray-700 font-light">
                      Last name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="text-sm text-gray-700 font-light">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3AB54A] text-white py-3 rounded-full text-lg font-medium"
                >
                  Sign up
                </button>
              </form>

              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-3 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <button className="w-full flex items-center justify-center border border-[#3AB54A] py-3 rounded-full text-base text-gray-600 font-medium mb-4">
                <img src={facebookLogo} alt="Facebook Logo" className="w-6 h-6 mr-2" />
                Sign up with Facebook
              </button>
              <button className="w-full flex items-center justify-center border border-[#3AB54A] py-3 rounded-full text-base text-gray-600 font-medium">
                <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
                Sign up with Google
              </button>
            </div>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <div className="w-full mt-6">
              <h2 className="text-[#3AB54A] text-2xl font-semibold text-center">Log in</h2>
              <form className="mt-6 space-y-6">
                <div className="w-full">
                  <label htmlFor="login-email" className="text-sm text-gray-700 font-light">
                    Email address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="login-password" className="text-sm text-gray-700 font-light">
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                  />
                </div>
                <button className="w-full bg-[#3AB54A] text-white py-3 rounded-full text-lg font-medium">
                  Log in
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
