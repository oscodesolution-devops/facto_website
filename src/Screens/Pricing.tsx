import Navbar from "@/Components/Navbar";
import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import GSTServiceCard from "@/Components/ui/detailcard";
import Phone from "@/Components/Phone";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Pricing = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  return (
    <div>
      <Navbar />

      <div className="bg-[#DDE2FF] pt-12">
        <div className="text-center">
          <h1 data-aos="fade-up" className="font-[erode] font-medium text-lg md:text-2xl">
            FACTO : Your partner for E-Tax filing
          </h1>
          <h2 data-aos="fade-up" className="font-[erode] font-normal text-lg md:text-2xl mt-2">
            Facto is your ideal partner for assisted Tax E-Filing as we offer
            Services like
          </h2>
        </div>

        <div className="mt-5 flex justify-center">
          <div data-aos="fade-up" className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md" style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}>
            <Search size={20} className="text-gray-500 mr-3" />
            <Input
              type="text"
              placeholder="Search"
              className="flex-1 text-sm placeholder:text-gray-500 border-none"
            />
            <button className="ml-3 bg-[#253483] text-white rounded-full px-4 py-1 text-sm font-lora">
              Search
            </button>
          </div>
        </div>

        <div className="pt-16 px-5 lg:px-28 pb-24">
          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[50px]">
            <GSTServiceCard />
            <GSTServiceCard />
            <GSTServiceCard />
            <GSTServiceCard />
            <GSTServiceCard />
            <GSTServiceCard />
            <GSTServiceCard />
          </div>
        </div>
      </div>

      <div className="bg-[#E9FFE9]">
        <Phone />
      </div>

      <div className="py-[64px]">
        <p data-aos="fade-up" className="font-[poppins] font-medium text-lg md:text-xl text-center mb-6">
          Take control of your taxes today and experience the convenience of E
          Tax filing with TaxBuddy.
        </p>
        <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-6 justify-center">
          <Input
            type="text"
            placeholder="Enter your Phone number"
            className="w-full max-w-sm text-black shadow-md px-4 py-2"
          />
          <button data-aos="fade-up" className="bg-secondary text-white font-medium text-base rounded-md px-6 py-2 flex items-center justify-center">
            Signup now and Get started!
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
