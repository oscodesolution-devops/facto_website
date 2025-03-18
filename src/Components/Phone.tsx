import AOS from "aos";
import "aos/dist/aos.css";
import iPhoneImage from "../assets/iphone.svg";
// import QRCodeImage from "../assets/QRCode.svg";
// import { FaGooglePlay } from "react-icons/fa";
// import { Apple } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConstants";
import { toast } from "sonner";

const Phone = () => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    AOS.init({
      duration: 700,
    });
  }, []);

  const sendQuery = async () => {
    try {
      // const formData = {
      //   details: inputValue,
      // };
      const formData = {
        name: inputValue,
        email: "query@query.com",
        phoneNo: "9876543210",
        query: inputValue,
      };
      const response = await axios.post(`${BASE_URL}/query`, formData);
      if (response.data.success) {
        toast.success("Query submitted successfully!");
        setInputValue("");
      }
    } catch (error) {
      toast.error("Failed to submit query. Please try again.");
      console.error("Error submitting query:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast.error("Please enter your details");
      return;
    }
    await sendQuery();
  };

  return (
    <div className="w-full h-auto bg- pt-[60px] px-[10px] sm:px-[20px] md:px-[20px] pb-5 flex justify-center items-center overflow-hidden">
      <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-[20px] sm:gap-[30px]">
        <img
          data-aos="fade-up"
          src={iPhoneImage}
          alt="iPhone 13 Pro"
          className="w-[180px] sm:w-[250px] md:w-[250px] lg:w-[280px] xl:w-[350px] h-auto"
        />

        <div className="text-center lg:text-left w-full  p-6">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-poppins font-semibold leading-[30px] sm:leading-[36px] lg:leading-[42px] xl:leading-[46px] text-blue-950">
            FACTO - Your Trusted Partner for Easy GST and Income Tax Solutions
          </h1>
          <p className="text-[14px] md: mt-12 sm:text-[18px] md:text-[22px] font-light leading-[20px] sm:leading-[22px] tracking-[-0.02em] text-gray-700">
            We help businesses and individuals simplify their GST and Income Tax
            filing process, save time, and reduce stress.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your details"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-4 p-2 border border-gray-300 rounded w-full max-w-md"
            />

            <button
              type="submit"
              className="w-[150px] h-[45px] mt-4 translate-x-5 bg-blue-950 text-[14px] font-poppins font-semibold leading-[20px] sm:leading-[22px] tracking-[-0.02em] text-white rounded-md"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Phone;
