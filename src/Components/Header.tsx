import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import iPhoneImage from "../assets/iPhone_15_pro.png";
import headerBg from "../assets/headerbg.svg";
import PhoneNum from "./PhoneNum";
import QRCodeImage from "../assets/QRCode.svg";
import { FaGooglePlay } from "react-icons/fa";
import { Apple } from "lucide-react";
// import WhatsAppIcon from "../assets/whatsapp.svg";
// import PhoneButtonIcon from "../assets/Phonebutton.svg";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 400,
      once: true,
      startEvent: "load",
    });
  }, []);

  return (
    <div
      className="relative flex flex-col-reverse lg:flex-row  items-stretch justify-between h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${headerBg})` }}
      data-aos="fade-up"
    >
      <div
        className="z-20 flex flex-col justify-center  text-white px-[30px] pb-[40px] lg:w-1/2"
        data-aos="fade-right"
      >
<div className="sm:pt-14 md:pt-20 lg:pt-24 px-4 text-[28px] sm:text-4xl md:text-4xl lg:text-5xl font-[actor] font-light leading-snug sm:leading-tight text-center sm:text-left">
  Your Trusted Partner
  for Easy <span className="text-secondary">GST</span> ,{" "}
  <span className="text-secondary">Income tax</span> and{" "}
  <span className="text-secondary">other financial matters</span>


</div>
<p
  className="mt-3 sm:mt-5 text-xs sm:text-sm md:text-base lg:w-4/5 px-4 mx-auto sm:mx-0 text-center sm:text-left"
  data-aos="fade-up"
>
We make GST and Income Tax filing easy, fast, and stress-free for individuals and businesses. Save time, stay compliant, and enjoy hassle-free tax management with FACTO
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
              <span className="text-xs md:text-sm">Get on Google Play Store</span>
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
          {/* <div className="absolute bottom-[1px] right-[10px] flex flex-col z-20">
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
          </div> */}
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
