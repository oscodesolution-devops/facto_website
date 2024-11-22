import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.svg";
import facebookLogo from "../assets/facebook-logo.svg";
import googleLogo from "../assets/google-logo.svg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const navigate = useNavigate(); 

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
//  (add API call here)

    navigate("/user-details");
  };

  return (
    <div className="font-[poppins] min-h-screen m-0">
      <nav className="flex items-center justify-between px-6 py-3 border-[1px] border-primary">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-[181px] h-[101px]" />
        </div>
        <div>
          <button className="text-white font-[300] bg-primary px-[37px] py-[11px] hover:bg-primary-dark transition rounded-3xl">
            Log in
          </button>
        </div>
      </nav>

      <div className="bg-[#DDE2FF] w-full min-h-screen flex justify-center items-center pt-[35px] pb-[91px]">
        <div className="w-[732px] bg-white rounded-[21px] shadow-md p-[48px] flex flex-col items-center">
          <div className="w-[584px] flex items-center justify-center relative border border-[#0033A1] rounded-full overflow-hidden">
            <button
              onClick={() => setActiveTab("signup")}
              className={`w-1/2 py-[14px] text-xl font-medium transition-all duration-700 ${
                activeTab === "signup" ? "bg-[#0033A1] text-white" : "bg-transparent text-[#0033A1]"
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-[14px] text-xl font-medium transition-all duration-700 ${
                activeTab === "login" ? "bg-[#0033A1] text-white" : "bg-transparent text-[#0033A1]"
              }`}
            >
              Log in
            </button>
          </div>

          {activeTab === "signup" && (
            <div className="w-full h-[640px] mt-[24px] pt-[48px] pl-[64px] pr-[64px] pb-[50px]">
              <h2 className="text-[#3AB54A] text-2xl font-semibold mb-[40px] text-center">Sign up</h2>
              <div className="w-[454px] ml-[40px]">
                <form className="space-y-[24px]" onSubmit={handleSignup}>
                  <div className="flex gap-[16px]">
                    <div className="w-1/2">
                      <label className="text-sm text-black font-[poppins] font-[300] mb-[8px]" htmlFor="first-name">
                        First name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="text-sm text-black font-[poppins] font-[300] mb-[8px]" htmlFor="last-name">
                        Last name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="text-sm text-black font-[poppins] font-[300] mb-[8px]" htmlFor="email">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#3AB54A] text-white py-[14px] font-[poppins] rounded-full text-xl font-medium">
                    Sign up
                  </button>
                </form>
                <div className="flex items-center my-[30px]">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-[8px] text-gray-500 font-[300] font-[poppins]">OR</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <button className="w-[454px] items-center font-[poppins] flex justify-center border-[1px] border-[#3AB54A] py-[14px] rounded-full text-lg text-[#999999] font-medium mb-[16px]">
                  <img src={facebookLogo} alt="Facebook Logo" className="w-[24px] h-[24px] mr-[8px]" />
                  Sign up with Facebook
                </button>
                <button className="w-[454px] flex font-[poppins] items-center justify-center border-[1px] border-[#3AB54A] py-[14px] rounded-full text-lg text-[#999999] font-medium mb-[24px]">
                  <img src={googleLogo} alt="Google Logo" className="w-[24px] h-[24px] mr-[8px]" />
                  Sign up with Google
                </button>
              </div>
            </div>
          )}

          {activeTab === "login" && (
            <div className="w-full h-[640px] mt-[24px]">
              <h2 className="text-[#3AB54A] text-2xl font-semibold mb-[40px] text-center mt-[40px]">Log in</h2>
              <div className="w-[454px] ml-[100px]">
                <form className="space-y-[24px]">
                  <div className="w-full">
                    <label className="text-sm font-[poppins] font-[300] text-black mb-[8px]" htmlFor="login-email">
                      Email address
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-sm font-[poppins] font-[300] text-black mb-[8px]" htmlFor="login-password">
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                    />
                  </div>
                  <button className="w-full bg-[#3AB54A] text-white py-[14px] rounded-full text-xl font-medium">
                    Log in
                  </button>
                  <div className="flex items-center my-[30px]">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-[8px] text-gray-500 font-[300]">OR</span>
                    <hr className="flex-grow border-gray-300" />
                  </div>
                  <button className="w-[454px] items-center flex justify-center border-[1px] border-[#3AB54A] py-[14px] rounded-full text-lg text-[#999999] font-medium mb-[16px]">
                    <img src={facebookLogo} alt="Facebook Logo" className="w-[24px] h-[24px] mr-[8px]" />
                    Log in with Facebook
                  </button>
                  <button className="w-[454px] flex items-center justify-center border-[1px] border-[#3AB54A] py-[14px] rounded-full text-lg text-[#999999] font-medium mb-[24px]">
                    <img src={googleLogo} alt="Google Logo" className="w-[24px] h-[24px] mr-[8px]" />
                    Log in with Google
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
