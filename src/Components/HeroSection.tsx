import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import PricingCard from "./ui/pricingcard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 700, 
    });
  }, []);

  return (
    <section className="bg-[#E9FFE9] pt-2 pb-36 px-5 lg:px-28">
      <div className="mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="text-primary">
                Service
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary">GST</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="text-center">
        <h1 className="text-lg md:text-2xl font-medium leading-tight text-black font-[erode]">
          FACTO : Your partner for E-Tax filing
        </h1>
        <p className="text-lg md:text-2xl font-medium leading-tight text-black font-[erode]">
          Facto is your ideal partner for assisted Tax E-Filing as we offer
          Services like
        </p>
      </div>

      <div className="mt-5 flex justify-center">
        <div data-aos="fade-up" className="flex items-center bg-white rounded-full px-4 py-1 w-full max-w-md " style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}>
          <Search size={20} className="text-gray-500 mr-3" />
          <Input
            type="text"
            placeholder="Search"
            className="flex-1 border-none text-base placeholder:text-gray-500"
          />
          <button className="ml-3 bg-[#253483] text-white rounded-full px-4 py-1 text-sm font-[lora]">
            Search
          </button>
        </div>
      </div>

      <div data-aos="fade-up" className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
        <PricingCard />
      </div>

      <div className="mt-16">
        <div data-aos="fade-up" className="text-[#101828] text-sm leading-5 font-light font-[poppins] space-y-4">
          <p>
            Ensure a smooth E-filing of{" "}
            <span className="font-bold">Income Tax Return</span> process by
            having key documents readily available. These may include PAN,
            Aadhaar linked to PAN, bank account information, salary slips, rent
            receipts, Form 16, interest certificates, insurance and home loan
            details, investment information, and proof of additional income
            such as from property or capital gains.
          </p>
          <p>
            Relax, you don't need to stress about the process. Simply upload
            your necessary documents, and our team will handle the rest. We are
            your reliable partners, committed to guiding you at every juncture.
          </p>
        </div>

        <div data-aos="fade-up" className="mt-5">
          <button className="bg-[#3AB54A] border border-[#00750F] text-white rounded-md px-8 py-2 text-sm font-semibold font-[inter] tracking-wider">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
