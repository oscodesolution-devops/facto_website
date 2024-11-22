"use client";

import { useState } from "react";
import Navbar from "@/Components/Navbar";
import PaymentForm from "@/Components/payment-form";
import OrderSummary from "@/Components/order-summary";  

const Payment = () => {
  const [selectedCourse] = useState({
    title: "Sample Course",
      amount: 1999,
  });

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex h-[calc(100vh-108px)]">
        {/* Left side: Payment Form */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <PaymentForm amount={selectedCourse.amount} />
        </div>

        {/* Right side: Order Summary */}
        <div className="w-1/2 bg-[#E9FFE9] border-[1px] border-[#D9D9D9] flex flex-col p-[48px]">
          <div className="flex justify-center">
          <OrderSummary /> {/* Use the imported OrderSummary component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
