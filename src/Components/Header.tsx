import { useEffect } from "react";
import AOS from "aos"; 
import "aos/dist/aos.css"; 
import iPhoneImage from "../assets/iPhone_15_pro.png";
import headerBg from "../assets/headerbg.svg";
import PhoneNum from "./PhoneNum";
import QRCodeImage from "../assets/QRCode.svg";
import { FaGooglePlay } from "react-icons/fa";
import { Apple } from "lucide-react";
import WhatsAppIcon from "../assets/whatsapp.svg"; 
import PhoneButtonIcon from "../assets/phonebutton.svg"; 

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 400,   
      once: true,      
      startEvent: 'load', 
    });
  }, []);

  return (
    <div
      className="relative flex items-stretch justify-between h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${headerBg})` }}
      data-aos="fade-up" 
    >
      <div
        className="z-20 flex flex-col justify-center text-white px-[80px] pl-[80px] pt-[110px] pb-[40px] lg:w-1/2"
        data-aos="fade-right" 
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-[actor] font-light leading-tight">
          Your Trusted Partner <br />
          for Easy <span className="text-secondary">GST</span> and{" "}
          <span className="text-secondary">Tax Solutions</span>
        </div>
        <p className="mt-5 text-sm md:text-base lg:w-4/5" data-aos="fade-up">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation.
        </p>
        <div className="mt-5">
          <PhoneNum />
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <img
            src={QRCodeImage}
            alt="QR Code"
            className="w-32 h-32 md:w-40 md:h-40"
            data-aos="fade-left" 
          />
          <div className="flex flex-col gap-3">
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-black border-[1px] border-white text-white rounded-md w-52 md:w-64"
              data-aos="zoom-in" 
            >
              <FaGooglePlay size={20} />
              <span className="text-xs md:text-sm">
                Get on Google Play Store
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white border-[1px] border-white rounded-md w-52 md:w-64"
              data-aos="zoom-in"
            >
              <Apple size={20} />
              <span className="text-xs md:text-sm">Get from App Store</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 flex items-end justify-center w-1/2 h-full bg-[#1a191e] z-10"
        data-aos="fade-left"
      >
        <div className="relative h-full w-full overflow-hidden ml-[60px]">
          <div className="absolute bottom-[1px] right-[10px] flex flex-col z-20">
            <div className="mb-[-10px]" data-aos="fade-up">
              <img
                src={WhatsAppIcon}
                alt="WhatsApp"
                className="w-[90px] ml-[auto] h-[auto] cursor-pointer"
              />
            </div>
            <div data-aos="fade-up">
              <img
                src={PhoneButtonIcon}
                alt="Phone Button"
                className="w-[220px] h-[auto] cursor-pointer"
              />
            </div>
          </div>
          <img
            src={iPhoneImage}
            alt="iPhone 15 Pro"
            className="absolute bottom-[-300px] right-[-60px] max-w-[110%] object-contain"
            data-aos="fade-up" 
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />
    </div>
  );
};

export default Header;
