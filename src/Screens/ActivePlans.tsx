import Navbar from "@/Components/Navbar";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import TaxCard from "@/Components/ui/sub-card";
import GSTServiceCard from "@/Components/ui/detailcard";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ActivePlans = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);
  const [activeButton, setActiveButton] = useState("active");

  const cardData = [
    {
      title: "GSTR-1 & 3B",
      checkedItems: [
        "Capital gains",
        "More than one house property",
        "Foreign income/Foreign Asset",
        "Other investment income",
      ],
      showRevalidateButton: false,
      amount: "Rs 599",
      dueDate: "15/12/2024",
      cardNumber: "5678",
      cardExpiry: "09/2025",
    },
    {
      title: "GSTR-4",
      checkedItems: ["Rental income", "Crypto trading"],
      showRevalidateButton: true,
      amount: "Rs 399",
      dueDate: "25/12/2024",
      cardNumber: "1234",
      cardExpiry: "06/2025",
    },
    {
      title: "GSTR-9",
      checkedItems: ["International business", "Crypto", "Capital gains"],
      showRevalidateButton: false,
      amount: "Rs 799",
      dueDate: "10/01/2025",
      cardNumber: "9876",
      cardExpiry: "04/2025",
    },
  ];

  const activeCards = cardData.filter((card) => !card.showRevalidateButton);
  const expiredCards = cardData.filter((card) => card.showRevalidateButton);

    return (
        <div className="overflow-hidden">
            <div>
                <Navbar />
            </div>
            <div className="bg-[#DFFFE3] pt-[87px] pb-[127px] px-10">
            <div data-aos="fade-up" className="flex flex-col sm:flex-row gap-5 justify-center">
  <button
    onClick={() => setActiveButton("active")}
    className={`w-full sm:w-[214px] border-[2px] rounded-full p-3 font-[poppins] font-[500] transition-all duration-300 ${
      activeButton === "active" ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"
    }`}
  >
    Active Subscription
  </button>
  <button
    onClick={() => setActiveButton("expired")}
    className={`w-full sm:w-[214px] border-[2px] rounded-full p-3 font-[poppins] font-[500] transition-all duration-300 ${
      activeButton === "expired" ? "bg-primary text-white border-primary" : "bg-white text-primary border-primary"
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
          {activeButton === "active" &&
            activeCards.map((card, index) => (
              <div key={index} className="mb-6">
                <TaxCard
                  title={card.title}
                  checkedItems={card.checkedItems}
                  showRevalidateButton={card.showRevalidateButton}
                  amount={card.amount}
                  dueDate={card.dueDate}
                  cardNumber={card.cardNumber}
                  cardExpiry={card.cardExpiry}
                  onViewDetails={() =>
                    alert(`Viewing details for ${card.title}...`)
                  }
                  onRevalidate={() =>
                    alert(`Revalidating ${card.title}...`)
                  }
                />
              </div>
            ))}
          {activeButton === "expired" &&
            expiredCards.map((card, index) => (
              <div data-aos="fade-up" key={index} className="mb-6">
                <TaxCard
                  title={card.title}
                  checkedItems={card.checkedItems}
                  showRevalidateButton={card.showRevalidateButton}
                  amount={card.amount}
                  dueDate={card.dueDate}
                  cardNumber={card.cardNumber}
                  cardExpiry={card.cardExpiry}
                  onViewDetails={() =>
                    alert(`Viewing details for ${card.title}...`)
                  }
                  onRevalidate={() =>
                    alert(`Revalidating ${card.title}...`)
                  }
                />
              </div>
            ))}
        </div>

      </div>
      <div className="bg-[#DDE2FF] pt-[60px]">
        <div className="text-center ">
          <h1 data-aos="fade-up" className="font-[erode] font-medium text-lg md:text-2xl">
            FACTO : Your partner for E-Tax filing
          </h1>
          <h2 data-aos="fade-up" className="font-[erode] font-normal text-lg md:text-2xl mt-2">
            Facto is your ideal partner for assisted Tax E-Filing as we offer
            Services like
          </h2>
        </div>

        {/* Search Bar */}
        <div className="mt-5 flex justify-center ">
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
        <div className="pt-16 px-5 lg:px-28 pb-24 ">
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[40px] lg:gap-[50px] justify-center">
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ActivePlans;
