import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import OrderSummary from "@/Components/order-summary";  

const Payment = () => {
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState({
    title: "Sample Course",
    amount: 1999,
    subServiceId: "",
    selectedFeatures: [] as string[],
    itemType: "service"
  });

  useEffect(() => {
    // Check if state exists in location
    if (location.state) {
      const { 
        title = "Sample Course", 
        finalPrice = 1999, 
        subServiceId = "", 
        selectedFeatures = [],
        itemType="service" 
      } = location.state;

      setSelectedCourse({
        title,
        amount: finalPrice,
        subServiceId,
        selectedFeatures,
        itemType
      });
    }
  }, [location.state]);

  return (
    <div className="overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-108px)]">
        <div className="w-full lg:w-1/2 bg-[#E9FFE9] border border-[#D9D9D9] flex flex-col p-6 lg:p-[48px]">
          <div className="flex justify-center">
            <OrderSummary
              itemType={selectedCourse.itemType} 
              courseTitle={selectedCourse.title}
              amount={selectedCourse.amount}
              subServiceId={selectedCourse.subServiceId}
              selectedFeatures={selectedCourse.selectedFeatures}
            /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;