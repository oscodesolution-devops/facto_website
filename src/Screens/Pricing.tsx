import Navbar from "@/Components/Navbar";
import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import Phone from "@/Components/Phone";
import Footer from "@/Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
// import { Service } from "./LandingPage";
import GSTServiceCardSkeleton from "@/Components/GSTServiceCardLoader";
import axios from "axios";
import QuotationCard from "@/Components/QuotationCard";
import { Toaster } from "sonner";
import { BASE_URL } from "@/utils/apiConstants";

interface SubServiceId {
  createdAt: string;
  description: string;
  features: string[];
  isActive: boolean;
  period: string;
  price: number;
  requests: string[];
  serviceId: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface Service {
  selectedFeatures: string[];
  subServiceId: SubServiceId;
  userId: string;
  price: number;
}

const Pricing = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [isLoadingServices, setIsLoadingServices] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 800,
    });

    async function fetchServices() {
      try {
        const res = await axios.get(`${BASE_URL}/quotation`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("service data", res.data);
        setServices(res?.data?.data?.services);
        setIsLoadingServices(false);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);
  useEffect(() => {
    if (!searchText) {
      setFilteredServices(services);
      return;
    }

    const filtered =
      services &&
      services?.filter((service) => {
        const searchLower = searchText?.toLowerCase();
        return (
          service?.subServiceId?.title?.toLowerCase().includes(searchLower) ||
          service?.selectedFeatures?.some((feature) =>
            feature.toLowerCase().includes(searchLower)
          ) ||
          service?.subServiceId?.description
            .toLowerCase()
            .includes(searchLower) ||
          (service?.price && service?.price?.toString().includes(searchText))
        );
      });
    setFilteredServices(filtered);
  }, [searchText, services]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="overflow-hidden">
      <Navbar />
      <Toaster />
      <div className="bg-[#DDE2FF] pt-12">
        <div className="text-center">
          <h1
            data-aos="fade-up"
            className="font-[erode] font-medium text-lg md:text-2xl"
          >
            FACTO : Your partner for E-Tax filing
          </h1>
          <h2
            data-aos="fade-up"
            className="font-[erode] font-normal text-lg md:text-2xl mt-2"
          >
            Facto is your ideal partner for assisted Tax E-Filing as we offer
            Services like
          </h2>
        </div>

        <div className="mt-5 flex justify-center">
          <div
            data-aos="fade-up"
            className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md"
            style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
          >
            <Search size={20} className="text-gray-500 mr-3" />
            <Input
              type="text"
              placeholder="Search by title, features, or price"
              className="flex-1 text-sm placeholder:text-gray-500 border-none"
              value={searchText}
              onChange={handleSearchChange}
            />
            <button className="ml-3 bg-[#253483] text-white rounded-full px-4 py-1 text-sm font-lora">
              Search
            </button>
          </div>
        </div>

        <div
          className="pt-16 pb-24"
          style={{
            paddingLeft: "clamp(16px, 5%, 36px)",
            paddingRight: "clamp(16px, 5%, 36px)",
          }}
        >
          <div
            // data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[50px]"
          >
            {isLoadingServices ? (
              Array(3)
                .fill(null)
                .map((_, index) => <GSTServiceCardSkeleton key={index} />)
            ) : filteredServices?.length > 0 ? (
              filteredServices?.map((service) => (
                <QuotationCard
                  key={service?.subServiceId?._id}
                  title={service?.subServiceId?.title}
                  price={service.price}
                  currency="INR"
                  selectedFeatures={service?.selectedFeatures}
                  subServiceId={service?.subServiceId?._id}
                  status={service?.price ? "approved" : "pending"}
                  createdAt={service?.subServiceId?.createdAt}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No services found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#E9FFE9]">
        <Phone />
      </div>

      <div className="py-[64px]">
        <p
          data-aos="fade-up"
          className="font-[poppins] font-medium text-lg md:text-xl text-center mb-6"
        >
          Take control of your taxes today and experience the convenience of E
          Tax filing with TaxBuddy.
        </p>
        <div
          data-aos="fade-up"
          className="flex flex-col md:flex-row items-center gap-6 justify-center"
        >
          <Input
            type="text"
            placeholder="Enter your Phone number"
            className="w-full max-w-sm text-black shadow-md px-4 py-2"
          />
          <button
            data-aos="fade-up"
            className="bg-secondary text-white font-medium text-base rounded-md px-6 py-2 flex items-center justify-center"
          >
            Signup now and Get started!
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
