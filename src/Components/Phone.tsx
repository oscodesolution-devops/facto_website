import AOS from 'aos';
import 'aos/dist/aos.css';
import iPhoneImage from "../assets/iphone 13 pro.svg"; 
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
    <div className="w-[full] h-[734px] bg- pt-[60px] px-[170px] pb-0 flex items-center">
      <div className="flex items-center gap-[36px]">

        <img data-aos="fade-up" src={iPhoneImage} alt="iPhone 13 Pro" className="w-auto h-auto" />


        <div data-aos="fade-up">
          <h2 className="w-[522px] font-[poppins] text-[40px] font-semibold leading-[46.48px] text-left">
            Your Trusted Partner for Easy <span className="text-secondary">GST</span> and <span className="text-secondary">Tax Solutions</span>
          </h2>


          <p className="w-[522px] font-[poppins] text-[16px] font-[300] leading-[25.6px] tracking-[-0.02em] text-left mt-[17px] text-[#4F4F4F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation.
          </p>


          <div className="mt-[17px] flex items-center gap-[36px]">

            <img src={QRCodeImage} alt="QR Code" className="w-[159px] h-[159px]" />

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
