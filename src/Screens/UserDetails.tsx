import { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { User } from "@/api";

const UserDetails = () => {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    email: "",
    aadhar: "",
    pan: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);
    return;
    try {
      const response = await User.addDetails(formData);
      console.log("Your Details are added Successfully:", response);
      navigate("/");
    } catch (error) {
      console.error("Signup Failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-3 border-[1px] border-primary">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-[181px] h-[101px]" />
        </div>
        <div>
          <button className="text-white bg-primary px-[37px] py-[11px] hover:bg-primary-dark transition rounded-3xl">
            Log in
          </button>
        </div>
      </nav>
      <div className="font-[poppins] min-h-screen bg-[#DDE2FF]">
        <div className="flex justify-center items-center py-[50px]">
          <div className="w-[500px] bg-white  shadow-md py-[30px] px-[73px]">
            <h2 className="text-black text-2xl font-semibold text-left mb-[10px]">
              Welcome!!
            </h2>
            <h3 className="text-[#888888] font-[Poppins] font-[300] text-[14px] mb-[24px]">
              {" "}
              Create Your New Account
            </h3>

            <form onSubmit={handleSubmit} className="space-y-[20px]">
              <div className="w-full">
                <label
                  className="text-sm text-black mb-[8px] font-[600] font-[Poppins]"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-sm text-black font-[600] font-[Poppins] mb-[8px]"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-300 font-[300] text-[10px] px-[12px] py-[10px] rounded-lg text-lg"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-sm text-black font-[600] font-[Poppins] mb-[8px]"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-sm text-black font-[600] font-[Poppins] mb-[8px]"
                  htmlFor="aadhar"
                >
                  Aadhar Number
                </label>
                <input
                  id="aadhar"
                  name="aadhar"
                  type="text"
                  value={formData.aadhar}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-sm text-black font-[600] font-[Poppins] mb-[8px]"
                  htmlFor="pan"
                >
                  PAN Number
                </label>
                <input
                  id="pan"
                  name="pan"
                  type="text"
                  value={formData.pan}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-[12px] py-[10px] rounded-lg text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3AB54A] font-[Poppins] font-[700] text-[16px] text-white py-[7px] text-xl "
              >
                Create Account
              </button>

              <Link
                to="/"
                className="w-full font-[Poppins] text-[#969696] text-[12px] font-[600] block text-center mt-4"
              >
                Skip Now
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
