import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "@/api"; // Adjust the path based on your project structure
import { useGlobalContext } from "@/context/GlobalContext"; // Adjust the path based on your project structure
// import facebookLogo from "../assets/facebook-logo.svg";
// import googleLogo from "../assets/google-logo.svg";
import Navbar from "@/Components/Navbar";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate();
  const { saveUser } = useGlobalContext();

  // Handle Signup API Call
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      fullName: (e.target as HTMLFormElement)["full-name"].value,
      // lastName: (e.target as HTMLFormElement)["last-name"].value,
      email: (e.target as HTMLFormElement)["email"].value,
      password: (e.target as HTMLFormElement)["signup-password"].value,
    };

    try {
      const response = await AUTH.PostSignup(data);
      console.log("Signup Successful:", response);
      sessionStorage.setItem("token", response.data.token);
      navigate("/user-details");
    } catch (error) {
      console.error("Signup Failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  // Handle Login API Call
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email: (e.target as HTMLFormElement)["login-email"].value,
      password: (e.target as HTMLFormElement)["login-password"].value,
    };

    try {
      const response = await AUTH.PostLogin(data);
      console.log("Login Successful:", response);
      saveUser(response.data.user); // Save user to context
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="font-[poppins] min-h-screen m-0 bg-[#DDE2FF] flex flex-col overflow-hidden">
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
                activeTab === "signup"
                  ? "bg-[#0033A1] text-white"
                  : "bg-transparent text-[#0033A1]"
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-500 ${
                activeTab === "login"
                  ? "bg-[#0033A1] text-white"
                  : "bg-transparent text-[#0033A1]"
              }`}
            >
              Log in
            </button>
          </div>

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <div className="w-full mt-6">
              <h2 className="text-[#3AB54A] text-2xl font-semibold text-center">
                Sign up
              </h2>
              <form className="mt-6 space-y-6" onSubmit={handleSignup}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="full-name"
                      className="text-sm text-gray-700 font-light"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                      required
                    />
                  </div>
                  {/* <div className="w-full md:w-1/2">
                    <label htmlFor="last-name" className="text-sm text-gray-700 font-light">
                      Last name
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                      required
                    />
                  </div> */}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="text-sm text-gray-700 font-light"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="signup-password"
                    className="text-sm text-gray-700 font-light"
                  >
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    name="password"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3AB54A] text-white py-3 rounded-full text-lg font-medium"
                >
                  Sign up
                </button>
              </form>
            </div>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <div className="w-full mt-6">
              <h2 className="text-[#3AB54A] text-2xl font-semibold text-center">
                Log in
              </h2>
              <form className="mt-6 space-y-6" onSubmit={handleLogin}>
                <div className="w-full">
                  <label
                    htmlFor="login-email"
                    className="text-sm text-gray-700 font-light"
                  >
                    Email address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="login-password"
                    className="text-sm text-gray-700 font-light"
                  >
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-base"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#3AB54A] text-white py-3 rounded-full text-lg font-medium"
                >
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
