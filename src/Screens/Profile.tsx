// import { useState } from "react";
import { DocumentModal } from "@/Components/DocumentModal";
import Navbar from "@/Components/Navbar";
import ProfileCard from "@/Components/ui/profile-card";
import TaxCard from "@/Components/ui/sub-card";
import axios from "axios";
import { useEffect, useState } from "react";
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
}
const Profile = () => {
  const [purchasedServices, setPurchasedServices] = useState<
    PurchasedService[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedServiceDocuments, setSelectedServiceDocuments] = useState<
    any[]
  >([]);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

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
  useEffect(() => {
    fetchPurchasedServices();
  }, []);

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

  const activeServices = purchasedServices.filter(
    (service) => service.isActive
  );
  // const dummyData = {
  //   name: "Somesh Patel",
  //   email: "Somesh2732@gmail.com",
  //   phone: "9123456789",
  //   aadhar: "123456789012",
  //   pan: "ABCDE1234F",
  //   dob: new Date("1990-01-01"),
  //   gender: "male",
  //   address: {
  //     houseNumber: "123",
  //     street: "Main Street",
  //     city: "Mumbai",
  //     state: "maharashtra",
  //     pincode: "400001",
  //   },
  //   gst: "22AAAAA0000A1Z5",
  //   avatar: "/assets/user.png",
  // };

  // const [isEditing, setIsEditing] = useState(false);
  // const activeCards = getActiveCards();

  if (loading) {
    return <div className="text-center py-10">Loading Profile...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="bg-[#DDE2FF]">
        <div className="flex justify-center py-10">
          <ProfileCard
          // dummyData={dummyData}
          // isEditing={isEditing}
          // setIsEditing={setIsEditing}
          />
        </div>
        <div className="px-4 sm:px-[40px] md:px-[80px] lg:px-[130px] py-[60px]">
          <div className="bg-white w-full sm:w-[300px] md:w-[371px] lg:w-[450px] h-[50px] font-[poppins] font-[500] text-[#3AB54A] pt-[13px] px-[10px]">
            Active Services
          </div>
          <div className="w-full sm:w-[100%] md:w-[90%] lg:w-[80%] pt-[20px] flex flex-col gap-[15px]">
            {activeServices.length === 0 && (
              <div className="text-center text-gray-500">
                No active services found.
              </div>
            )}
            {activeServices.map((service) => (
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
      </div>
    </div>
  );
};

export default Profile;
