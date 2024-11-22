import AOS from 'aos';
import 'aos/dist/aos.css';
import iPhoneImage from "../assets/iphone.svg"; 
import QRCodeImage from "../assets/QRCode.svg"; 
import { FaGooglePlay } from "react-icons/fa"; 
import { Apple } from "lucide-react"; 
import { useEffect } from 'react';

const Phone = () => {
  useEffect(() => {
    AOS.init({
      duration: 700, 
    });
  }, []);
  
  return (
    <div className="w-full h-auto bg- pt-[60px] px-[10px] md:px-[170px] pb-0 flex items-center">
      <div className="flex flex-col md:flex-row items-center gap-[36px]">

        <img data-aos="fade-up" src={iPhoneImage} alt="iPhone 13 Pro" className="w-[200px] sm:w-[300px] md:w-auto h-auto" />

        <div data-aos="fade-up" className="text-center md:text-left">
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-[poppins] font-semibold leading-[46.48px] text-left w-full sm:w-[522px]">
            Your Trusted Partner for Easy <span className="text-secondary">GST</span> and <span className="text-secondary">Tax Solutions</span>
          </h2>

          <p className="text-[14px] sm:text-[16px] font-[300] leading-[25.6px] tracking-[-0.02em] text-[#4F4F4F] mt-[17px] sm:w-[522px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>

          <div className="mt-[17px] flex flex-col sm:flex-row gap-[20px] md:gap-[36px] justify-center items-center md:items-start">
            <img src={QRCodeImage} alt="QR Code" className="w-[120px] sm:w-[159px] h-[120px] sm:h-[159px]" />

            <div className="flex flex-col gap-[10px]">
              <button className="p-3 bg-black text-white w-[200px] h-[50px] flex items-center justify-center gap-2 rounded-md">
                <FaGooglePlay size={20} />
                <span>Get on Google Play Store</span>
              </button>

              <button className="p-3 bg-black text-white w-[200px] h-[50px] flex items-center justify-center gap-2 rounded-md">
                <Apple size={20} />
                <span>Get from App Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Phone;
