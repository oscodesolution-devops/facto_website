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
    <div className="w-full h-auto bg- pt-[60px] px-[10px] sm:px-[20px] md:px-[20px] pb-5 flex justify-center items-center overflow-hidden">
      <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start gap-[20px] sm:gap-[30px]">
        
        <img
          data-aos="fade-up"
          src={iPhoneImage}
          alt="iPhone 13 Pro"
          className="w-[180px] sm:w-[250px] md:w-[250px] lg:w-[280px] xl:w-[350px] h-auto"
        />
  
        <div data-aos="fade-up" className="text-center lg:text-left w-full">
  
          <div className="w-full lg:w-[450px] xl:w-[520px] mx-auto">
            <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] xl:text-[36px] font-[poppins] font-semibold leading-[30px] sm:leading-[36px] lg:leading-[42px] xl:leading-[46px]">
              Your Trusted Partner for Easy <span className="text-secondary">GST</span> and <span className="text-secondary">Income tax Solutions</span> and <span className='text-secondary'>other tax and financial matter</span>
            </h2>
          </div>
  
          <div className="w-full lg:w-[450px] xl:w-[520px] mx-auto mt-[17px]">
            <p className="text-[12px] sm:text-[14px] font-[300] leading-[20px] sm:leading-[22px] tracking-[-0.02em] text-[#4F4F4F]">
            We make GST and Income Tax filing easy, fast, and stress-free for individuals and businesses. Save time, stay compliant, and enjoy hassle-free tax management with FACTO
            </p>
          </div>
  
          <div className="mt-[17px] flex flex-col lg:flex-row gap-[16px] sm:gap-[20px] justify-center items-center lg:items-start">
            <img
              src={QRCodeImage}
              alt="QR Code"
              className="w-[100px] sm:w-[120px] lg:w-[140px] xl:w-[150px] h-[100px] sm:h-[120px] lg:h-[140px] xl:h-[150px]"
            />
  
            <div className="flex flex-col gap-[10px]">
             
              <button className="p-3 bg-black text-white w-full lg:w-[200px] xl:w-[220px] h-[45px] lg:h-[55px] xl:h-[60px] flex items-center justify-center gap-2 rounded-md">
                <FaGooglePlay size={20} />
                <span className="text-[12px] sm:text-[14px] xl:text-[16px]">Get on Google Play Store</span>
              </button>
  
              <button className="p-3 bg-black text-white w-full lg:w-[200px] xl:w-[220px] h-[45px] lg:h-[55px] xl:h-[60px] flex items-center justify-center gap-2 rounded-md">
                <Apple size={20} />
                <span className="text-[12px] sm:text-[14px] xl:text-[16px]">Get from App Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default Phone;
