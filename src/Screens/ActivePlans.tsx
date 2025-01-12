import Navbar from "@/Components/Navbar";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import TaxCard from "@/Components/ui/sub-card";
import GSTServiceCard from "@/Components/ui/detailcard";
import Footer from "@/Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { Services } from "@/api";
import GSTServiceCardSkeleton from "@/Components/GSTServiceCardLoader";
import { Service } from "@/Screens/LandingPage";
import { DocumentModal } from "@/Components/DocumentModal";
import { Toaster } from "sonner";
// import { Service } from "@/Screens/LandingPage";

interface PurchasedService {
  _id: string;
  title: string;
  isActive: boolean;
  features: string[];
  price: number;
  purchaseDate: string;
  updatedAt: string;
  serviceId: {
    _id: string;
  };
  requests: {
    name: string;
    needsQuotation: boolean;
  }[];
  purchasedPrice: number;
}

const ActivePlans: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("active");
  const [purchasedServices, setPurchasedServices] = useState<
    PurchasedService[]
  >([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  const fetchPurchasedServices = async (): Promise<void> => {
    try {
      const response = await axios.get(
        "https://facto.org.in/api/v1/sub-services/my-services",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.success) {
        setPurchasedServices(response.data.data);
        setLoading(false);
      } else {
        setError("Failed to fetch services");
        setLoading(false);
      }
    } catch (err) {
      setError("Error fetching services");
      setLoading(false);
      console.error("Error fetching services:", err);
    }
  };
  // const [subServices, setSubServices] = useState<SubService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  // const [isLoadingSubServices, setIsLoadingSubServices] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  
    const [selectedServiceDocuments, setSelectedServiceDocuments] = useState<
      any[]
    >([]);
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  useEffect(() => {
    fetchPurchasedServices();
  }, []);

  useEffect(() => {
    // console.log(id, "id");

    async function fetchServices() {
      try {
        const res = await Services.getServices();
        console.log(res.data.services);
        setServices(res.data.services);
        setIsLoadingServices(false);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }
    fetchServices();
  }, []);

  const activeServices = purchasedServices.filter(
    (service) => service.isActive
  );
  const expiredServices = purchasedServices.filter(
    (service) => !service.isActive
  );
  console.log(activeServices);
  if (loading) {
    return <div className="text-center py-10">Loading services...</div>;
  }

  if (error) {
    return <>
    <Navbar/>
    <div className="text-center py-10 text-red-500">{error}</div></>;
  }

  const handleViewDetails = async (serviceId: string) => {
    try {
      const response = await axios.get(
        `https://facto.org.in/api/v1/application/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSelectedServiceDocuments(
          response.data.data.applications[0]?.userDocuments || []
        );
        setIsDocumentModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      // Optionally show an error toast or message
    }
  };

  return (
    <div className="overflow-hidden">
      <div>
        <Navbar />
      </div>
      <Toaster/>
      <div className="bg-[#DFFFE3] pt-[87px] pb-[127px] px-10">
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <button
            onClick={() => setActiveButton("active")}
            className={`w-full sm:w-[214px] border-[2px] rounded-full p-3 font-[poppins] font-[500] transition-all duration-300 ${
              activeButton === "active"
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary"
            }`}
          >
            Active Subscription
          </button>
          <button
            onClick={() => setActiveButton("expired")}
            className={`w-full sm:w-[214px] border-[2px] rounded-full p-3 font-[poppins] font-[500] transition-all duration-300 ${
              activeButton === "expired"
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary"
            }`}
          >
            Expired Subscription
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center px-4 md:pl-[78px] md:pt-[20px]">
          <div
            data-aos="fade-up"
            className="flex items-center bg-white rounded-full w-full md:w-[762px] px-4 py-2 mx-auto"
            style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
          >
            <Search size={20} className="text-gray-500 mr-3" />
            <Input
              type="text"
              placeholder="Search"
              className="flex-1 text-sm placeholder:text-gray-500 border-none shadow-none"
            />
            <button className="ml-3 bg-secondary text-white rounded-full px-4 py-1 text-sm font-[lora]">
              Search
            </button>
          </div>
        </div>
        <div data-aos="fade-up" className="mt-[40px] w-full px-4 sm:px-[130px]">
          {activeButton === "active" && activeServices.length === 0 && (
            <div className="text-center text-gray-500">
              No active services found.
            </div>
          )}
          {activeButton === "expired" && expiredServices.length === 0 && (
            <div className="text-center text-gray-500">
              No expired services found.
            </div>
          )}
          {activeButton === "active" &&
            activeServices.map((service) => (
              <div key={service._id} className="mb-6">
                <TaxCard
                  title={service.title}
                  features={service.features}
                  showRevalidateButton={false}
                  price={service.purchasedPrice}
                  purchaseDate={service.purchaseDate}
                  serviceId={service.serviceId._id}
                  updatedAt={service.updatedAt}
                  requests={service.requests}
                  onViewDetails={() =>handleViewDetails(service._id)}
                />
              </div>
            ))}
          {activeButton === "expired" &&
            expiredServices.map((service) => (
              <div key={service._id} className="mb-6">
                <TaxCard
                  title={service.title}
                  features={service.features}
                  showRevalidateButton={false}
                  price={service.price}
                  purchaseDate={service.purchaseDate}
                  serviceId={service.serviceId._id}
                  updatedAt={service.updatedAt}
                  requests={service.requests}
                  onViewDetails={() => handleViewDetails(service._id)}
                />
              </div>
            ))}
        </div>
        <DocumentModal 
  isOpen={isDocumentModalOpen}
  onClose={() => setIsDocumentModalOpen(false)}
  documents={selectedServiceDocuments}
/>
      </div>
      <div className="bg-[#DDE2FF] pt-[60px]">
        <div className="text-center ">
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

        {/* Search Bar */}
        <div className="mt-5 flex justify-center ">
          <div
            data-aos="fade-up"
            className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md"
            style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
          >
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
        <div className="pt-16 px-5 lg:px-28 pb-24 ">
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[40px] lg:gap-[50px] justify-center"
          >
            {isLoadingServices
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <GSTServiceCardSkeleton key={index} />)
              : // Show actual services when data is loaded
                services.map((service) => (
                  <GSTServiceCard
                    key={service._id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    _id={service._id}
                  />
                ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ActivePlans;
