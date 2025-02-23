import { Input } from "./ui/input";
import StartFillingSvg from "../assets/StartedFilling.svg";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BASE_URL } from "@/utils/apiConstants";

const Footer = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const handleSumbit = async (e: any) => {
    console.log(phoneNo);
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/request`, {
        phoneNo,
      });
      if (response.data.success) {
        toast.success("Request submitted successfully!");
      }
      setPhoneNo("");
    } catch (err) {
      toast.error("Error occured please try again later");
    }
  };
  return (
    <div className="bg-[#262626] py-[33px] px-[48px] pb-[50px]">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="relative w-full max-w-[478px] flex flex-col items-center">
          <Input
            value={phoneNo}
            onChange={(e: any) => {
              if (isNaN(Number(e.target.value))) {
                toast.error("Fill appropriate number");
              } else if (e.target.value.length > 10) {
                toast.error("Number cant exceed 10 digits");
              } else {
                setPhoneNo(e.target.value);
              }
            }}
            type="text"
            placeholder="Phone Number"
            className="bg-primary rounded-[30px] w-full h-[48px] text-white px-[16px] py-[12px]"
          />
          <button
            onClick={handleSumbit}
            className="absolute right-1 top-0 bg-[#B0C2D6] text-primary font-[lora] rounded-[30px] w-[160px] h-[42px] px-[18px] py-0 mt-[3px] md:text-[1vw]"
          >
            Request Call Back
          </button>
          <p className="text-white text-center mt-[10px] text-[14px] font-[500] font-[poppins]">
            Stay up to date with the latest updates of our company
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[18px] max-w-[478px] pr-[68px] md:grid-cols-3">
          <Link
            to="/services"
            className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]"
          >
            Service +
          </Link>
          <Link
            to="/courses"
            className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]"
          >
            Courses
          </Link>
          <Link
            to="/pricing"
            className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]"
          >
            Pricing
          </Link>
          <Link
            to="/update"
            className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]"
          >
            Update
          </Link>
          {/* <Link to="" className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Blog</Link> */}
          <Link
            to="/contact"
            className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-[20px]">
        <img
          src={StartFillingSvg}
          alt="Start Filling Form"
          className="w-auto h-auto"
        />
      </div>

      <div className="w-full border-t-[0.93px] border-[#5D645D] mt-[20px]" />

      <div className="grid grid-cols-1 md:grid-cols-3 items-center mt-[20px] text-center md:text-left">
        <p className="text-white font-[Poppins] text-[15px] font-medium leading-[32.17px]">
          2024, All Rights Reserved
        </p>

        <div className="flex justify-center space-x-[12px] mt-[10px] md:mt-0">
          <div className="bg-primary rounded-full p-[10px]">
            <Instagram className="text-white w-[24px] h-[24px]" />
          </div>
          <div className="bg-primary rounded-full p-[10px]">
            <Twitter className="text-white w-[24px] h-[24px]" />
          </div>
          <div className="bg-primary rounded-full p-[10px]">
            <Facebook className="text-white w-[24px] h-[24px]" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end font-[Poppins] mt-[10px] md:mt-0">
          <Link
            to="/termsncondition"
            className="text-white text-[15px] font-medium leading-[32.17px]"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy-policy"
            className="text-white text-[15px] font-medium leading-[32.17px]"
          >
            Privacy Policy
          </Link>
          <Link
            to="/refundpolicy"
            className="text-white text-[15px] font-medium leading-[32.17px]"
          >
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
