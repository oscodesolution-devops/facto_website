import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import OrderSummary from "@/Components/order-summary";  
import { Toaster } from "sonner";

const Payment = () => {
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState({
    title: "Sample Course",
    amount: 1999,
    subServiceId: "",
    selectedFeatures: [] as string[],
    itemType: "service",
    billingPeriod: "",
    // billingPeriod: "monthly"
  });

  useEffect(() => {
    // Check if state exists in location
    if (location.state) {
      const { 
        title = "Sample Course", 
        finalPrice = 1999, 
        subServiceId = "", 
        selectedFeatures = [],
        itemType="service",
        billingPeriod="monthly" 
      } = location.state;

      setSelectedCourse({
        title,
        amount: finalPrice,
        subServiceId,
        selectedFeatures,
        itemType,
        billingPeriod,
      });
    }
  }, [location.state]);

  return (
    <div className="overflow-hidden">
  {/* Navbar */}
  <div>
    <Navbar />
  </div>
  <Toaster />
  
  {/* Main Content */}
  <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-108px)]">
    {/* Left Section - Order Summary */}
    <div className="w-full  bg-[#E9FFE9] border border-[#D9D9D9] flex flex-col p-6 lg:p-[48px]">
      <div className="flex justify-center w-ful">
        <OrderSummary
          itemType={selectedCourse.itemType}
          courseTitle={selectedCourse.title}
          amount={selectedCourse.amount}
          subServiceId={selectedCourse.subServiceId}
          selectedFeatures={selectedCourse.selectedFeatures}
          billingPeriod={selectedCourse.billingPeriod}
        />
      </div>
    </div>

    {/* Add a Right Section if needed */}
    {/* <div className="hidden lg:flex w-full lg:w-1/2 bg-white flex-col justify-center p-6 lg:p-[48px]">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Additional Content (Optional)</h2>
        <p className="text-gray-600">You can place additional information here.</p>
      </div>
    </div> */}
  </div>
</div>

  );
};

export default Payment;