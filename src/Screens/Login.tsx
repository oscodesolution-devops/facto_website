import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "@/api"; // Adjust the path based on your project structure
import { useGlobalContext } from "@/context/GlobalContext"; // Adjust the path based on your project structure
// import facebookLogo from "../assets/facebook-logo.svg";
// import googleLogo from "../assets/google-logo.svg";
import Navbar from "@/Components/Navbar";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [signupError, setSignupError] = useState({ fullName: "", email: "", password: "" });
  const [loginError, setLoginError] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { saveUser } = useGlobalContext();


  function checkSignupData(data: any) {
    if (data.fullName === "") {
      setSignupError({ ...signupError, fullName: "Full name is required" });
      return false;
    }
    if (data.fullName.length < 3) {
      setSignupError({ ...signupError, fullName: "Full name must be at least 3 characters long" });
      return false;
    }
    if (data.email === "") {
      setSignupError({ ...signupError, email: "Email is required" });
      return false;
    }
    if (!data.email.includes("@")) {
      setSignupError({ ...signupError, email: "Invalid email address" });
      return false;
    }
    if (data.password === "") {
      setSignupError({ ...signupError, password: "Password is required" });
      return false;
    }
    if (data.password.length < 6) {
      setSignupError({ ...signupError, password: "Password must be at least 6 characters long" });
      return false;
    }
    return true;
  }

  function checkLoginData(data: any) {
    if (data.email === "") {
      setLoginError({ ...loginError, email: "Email is required" });
      return false;
    }
    if (!data.email.includes("@")) {
      setLoginError({ ...loginError, email: "Invalid email address" });
      return false;
    }
    if (data.password === "") {
      setLoginError({ ...loginError, password: "Password is required" });
      return false;
    }
    if (data.password.length < 6) {
      setLoginError({ ...loginError, password: "Password must be at least 6 characters long" });
      return false;
    }
    return true;
  }

  // Handle Signup API Call
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      fullName: (e.target as HTMLFormElement)["full-name"].value,
      // lastName: (e.target as HTMLFormElement)["last-name"].value,
      email: (e.target as HTMLFormElement)["email"].value,
      password: (e.target as HTMLFormElement)["signup-password"].value,
    };

    if (!checkSignupData(data)) {
      return;
    }

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

    if (!checkLoginData(data)) {
      return;
    }

    try {
      const response = await AUTH.PostLogin(data);
      console.log("Login Successful:", response.data);
      saveUser(response.data); // Save user to context
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
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-500 ${activeTab === "signup"
                ? "bg-[#0033A1] text-white"
                : "bg-transparent text-[#0033A1]"
                }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-3 text-lg font-medium transition-all duration-500 ${activeTab === "login"
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
              <form className="mt-6 space-y-6" onSubmit={handleSignup} noValidate>
                <div className="w-full">
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
                  {signupError.fullName && <p className="text-red-500 text-sm font-light">{signupError.fullName}</p>}
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
                  {signupError.email && <p className="text-red-500 text-sm font-light">{signupError.email}</p>}
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
                  {signupError.password && <p className="text-red-500 text-sm font-light">{signupError.password}</p>}
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
              <form className="mt-6 space-y-6" onSubmit={handleLogin} noValidate>
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
                  {loginError.email && <p className="text-red-500 text-sm font-light">{loginError.email}</p>}
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
                  {loginError.password && <p className="text-red-500 text-sm font-light">{loginError.password}</p>}
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
