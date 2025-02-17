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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Services } from "@/api";
import { Service } from "@/Screens/LandingPage";
import GSTServiceCard from "./ui/detailcard";
import PricingCardSkeleton from "./ui/pricingcardskeleton";
import GSTServiceCardSkeleton from "./GSTServiceCardLoader";

type SubService = {
  _id: string;
  serviceId: string;
  title: string;
  requests:any[];
  description: string;
  features: string[];
  price: string;
  period: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



const HeroSection = () => {
  const location = useLocation();
  const [id, setId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [filteredSubServices, setFilteredSubServices] = useState<SubService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoadingSubServices, setIsLoadingSubServices] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [serviceTitle, setServiceTitle] = useState<string | null>(null);
  useEffect(() => {
    const state = location.state;
    setServiceTitle(state?.title || null);
  }, [location]);

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);
  const navigate =useNavigate();
  // Extract `id` from the URL query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fetchedId = queryParams.get('id');
    setId(fetchedId);
  }, [location]);

  // Fetch sub-services when `id` is available
  useEffect(() => {
    console.log(id, "id");
    if (id !== null) {
      const fetchSubServices = async () => {
        try {
          const res = await Services.getSubServices(id as string);
          setSubServices(res.data.subServices);
          setFilteredSubServices(res.data.subServices);
          setIsLoadingSubServices(false);
        } catch (error) {
          console.error("Error fetching sub-services:", error);
        }
      };
      fetchSubServices();
    } else {
      async function fetchServices() {
        try {
          const res = await Services.getServices();
          setServices(res.data.services);
          setFilteredServices(res.data.services);
          setIsLoadingServices(false);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
      fetchServices()
    }
  }, [id]); // Runs whenever `id` changes

  useEffect(() => {
    if (id !== null) {
      // Filter subServices
      const filtered = subServices.filter((subService) =>
        subService.title.toLowerCase().includes(searchText.toLowerCase()) ||
        subService.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSubServices(filtered);
    } else {
      // Filter services
      const filtered = services.filter((service) =>
        service.title.toLowerCase().includes(searchText.toLowerCase()) ||
        service.description.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchText, services, subServices, id]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  console.log("first")

  return (
<section className="bg-[#E9FFE9] pt-2 pb-36 w-full">
  {/* Breadcrumb Section */}
  <div className="px-4 sm:px-6 md:px-10 lg:px-28 xl:px-36 mb-10">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" className="text-primary">
            Service
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {serviceTitle&&<BreadcrumbItem>
          <BreadcrumbPage className="text-primary">{serviceTitle}</BreadcrumbPage>
        </BreadcrumbItem>}
      </BreadcrumbList>
    </Breadcrumb>
  </div>

  {/* Heading Section */}
  <div className="text-center px-4 sm:px-6 md:px-10 lg:px-28 xl:px-36">
    <h1 className="text-lg md:text-2xl font-medium leading-tight text-black font-[erode]">
      FACTO : Your partner for E-Tax filing
    </h1>
    <p className="text-lg md:text-2xl font-medium leading-tight text-black font-[erode]">
      Facto is your ideal partner for assisted Tax E-Filing as we offer
      Services like
    </p>
  </div>

  {/* Search Bar Section */}
  <div className="mt-5 flex justify-center px-4 ">
    <div
      data-aos="fade-up"
      className="flex items-center bg-white rounded-full px-4 py-1 w-full max-w-md"
      style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
    >
      <Search size={20} className="text-gray-500 mr-3" />
      <Input
            type="text"
            placeholder="Search"
            className="flex-1 border-none text-base placeholder:text-gray-500"
            value={searchText}
            onChange={handleSearchChange}
          />
      <button className="ml-3 bg-[#253483] text-white rounded-full px-4 py-1 text-sm font-[lora]">
        Search
      </button>
    </div>
  </div>

  {/* Cards Section */}
  <div className="mt-20 md:grid md:gap-4 md:grid-cols-4 grid-cols-1 md:p-2 p-4 md:h-auto h-[200vh] ">
  {id !== null ? (
    // Show loading skeletons if `isLoadingSubServices` is true
    isLoadingSubServices ? (
      Array(3)
        .fill(null)
        .map((_, index) => <PricingCardSkeleton key={index} />)
    ) : (
      // Show actual sub-services when data is loaded
      filteredSubServices.map((subService) => (
        <PricingCard
          key={subService._id}
          serviceId={subService._id}
          title={subService.title}
          description={subService.description}
          features={subService.features}
          price={subService.price}
          period={subService.period}
          requests={subService.requests}
        />
      ))
    )
  ) : (
    // Show loading skeletons if `isLoadingServices` is true
    isLoadingServices ? (
      Array(3)
        .fill(null)
        .map((_, index) => <GSTServiceCardSkeleton key={index} />)
    ) : (
      // Show actual services when data is loaded
      filteredServices.map((service) => (
        <GSTServiceCard
          features={service.features}
          key={service._id}
          title={service.title}
          description={service.description}
          icon={service.icon}
          _id={service._id}
        />
      ))
    )
  )}
</div>


  {/* Additional Info Section */}
  <div className="mt-16 px-4 sm:px-6 md:px-10 lg:px-28 xl:px-36">
    <div
      data-aos="fade-up"
      className="text-[#101828] text-sm leading-5 font-light font-[poppins] space-y-4"
    >
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
      <button onClick={()=>{navigate("/contact")}} className="bg-[#3AB54A] border border-[#00750F] text-white rounded-md px-8 py-2 text-sm font-semibold font-[inter] tracking-wider">
        Contact Us
      </button>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
