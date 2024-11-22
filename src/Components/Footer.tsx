import { Input } from './ui/input'; 
import StartFillingSvg from '../assets/StartedFilling.svg'; 
import { Instagram, Twitter, Facebook } from 'lucide-react'; 

const Footer = () => {
  return (
    <div className="bg-[#262626] py-[33px] px-[48px] pb-[50px]">
      <div className="flex justify-between">

        <div className="flex flex-col items-center relative w-full max-w-[478px]">
          <Input
            type="text"
            placeholder="Phone Number"
            className="bg-primary rounded-[30px] w-full h-[48px] text-white px-[16px] py-[12px]" 
          />

          <button 
            className="mr-[3px] absolute right-[0px] top-0 bg-[#B0C2D6] text-primary font-[lora] rounded-[30px] w-[160px] h-[42px] px-[18px] py-0 mt-[3px]"
          >
            Request Call Back
          </button>

          <p className="text-white text-center mt-[10px] text-[14px] font-[500] font-[poppins]">
            Stay up to date with the latest updates of our company
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[18px] max-w-[478px] pr-[68px]">
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Service +</p>
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Courses</p>
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Pricing</p>
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Update</p>
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Blog</p>
          <p className="text-white text-left font-[poppins] text-[16px] font-medium leading-[28.05px]">Contact Us</p>
        </div>
      </div>

      <div className="flex justify-center mt-[20px]">
        <img src={StartFillingSvg} alt="Start Filling Form" className="w-auto h-auto" />
      </div>

      <div className="w-full border-t-[0.93px] border-[#5D645D] mt-[20px]" />

      <div className="grid grid-cols-3 items-center mt-[20px]">

        <p className="text-white font-[Poppins] text-[15px] font-medium leading-[32.17px] text-left">
          2024, All Rights Reserved
        </p>

        <div className="flex justify-center space-x-[12px]">
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


        <div className="flex flex-col items-end font-[Poppins]">
          <a href="#" className="text-white text-[15px] font-medium leading-[32.17px]">Terms & Conditions</a>
          <a href="#" className="text-white text-[15px] font-medium leading-[32.17px]">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
