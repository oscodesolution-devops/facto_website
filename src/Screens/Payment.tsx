"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";
import PaymentForm from "@/Components/PaymentForm";
import OrderSummary from "@/Components/order-summary";  

const Payment = () => {
  const [selectedCourse] = useState({
    title: "Sample Course",
      amount: 1999,
  });

  return (
    <div className="overflow-hidden">
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-108px)]">
        {/* Left side: Payment Form */}
        

        {/* Right side: Order Summary */}
        <div className="w-full lg:w-1/2 bg-[#E9FFE9] border border-[#D9D9D9] flex flex-col p-6 lg:p-[48px]">
          <div className="flex justify-center">
            <OrderSummary /> {/* Use the imported OrderSummary component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
