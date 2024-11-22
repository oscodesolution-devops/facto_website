import { useNavigate } from "react-router-dom";
import Navbar from "@/Components/Navbar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/Components/ui/breadcrumb";
import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/Components/ui/button";
import NewsCard from "@/Components/ui/news-card"; 
import Footer from "@/Components/Footer";
import Phone from "@/Components/Phone";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const DropdownMenuDemo = ({ selected, setSelected }: any) => {

  useEffect(() => {
    AOS.init({
      duration: 800, 
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const options = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center font-[Poppins] font-[300] text-sm"
        >
          {selected}
          {isOpen ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 font-[Poppins] font-[300] text-sm">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setSelected(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Update = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Weekly");
  const navigate = useNavigate();

  const handleReadMore = (title: string) => {
    navigate(`/update-details`, { state: { title } });
  };

  const categories = [
    "All",
    "Recent Updates",
    "GST",
    "Income Tax",
    "Other2",
    "Other",
    "Other3",
  ];

  const newsData = [
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 1",
      title: "GST Collection Drops Amid Global Uncertainty",
      description:
        "The GST collections have seen a decline due to fluctuating exports and slowing domestic consumption.",
    },
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 2",
      title: "Economic Slowdown: What It Means for Businesses",
      description:
        "India's economic slowdown continues to impact various sectors, with a significant rise in unemployment.",
    },
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 3",
      title: "Income Tax Reform: A New Chapter",
      description:
        "The government introduces reforms to simplify the income tax structure and ease the burden on taxpayers.",
    },
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 1",
      title: "GST Collection Drops Amid Global Uncertainty",
      description:
        "The GST collections have seen a decline due to fluctuating exports and slowing domestic consumption.",
    },
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 2",
      title: "Economic Slowdown: What It Means for Businesses",
      description:
        "India's economic slowdown continues to impact various sectors, with a significant rise in unemployment.",
    },
    {
      imageUrl: "https://via.placeholder.com/355x180",
      imageAlt: "News Image 3",
      title: "Income Tax Reform: A New Chapter",
      description:
        "The government introduces reforms to simplify the income tax structure and ease the burden on taxpayers.",
    },

  ];

  return (
    <div>
      <Navbar />
      <section>

        <div className="mb-10 pl-[83px] pt-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="text-[#8F9EB2] font-light font-[Poppins]"
                >
                  Update
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-black font-[Poppins]">
                  GST
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-full flex justify-center py-6">
          <div data-aos="fade-up" className="flex gap-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-w-[138px] px-4 py-2 rounded-full font-[Poppins] font-[300] text-sm transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-[#D1FADF] text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="pl-[137px] pr-[160px]">
          <div className="mt-5 flex items-center justify-between w-[full] mx-auto">
   
            <div data-aos="fade-up" className="flex items-center bg-white rounded-full w-[762px]  px-4 py-2 flex-1" style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}>
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

            <div data-aos="fade-up" className="flex items-center gap-4 ml-4">
              <span className="text-sm font-[Poppins] font-[300] text-black pl-[91px]">
                Sort by:
              </span>
              <DropdownMenuDemo
                selected={selectedTimeframe}
                setSelected={setSelectedTimeframe}
              />
            </div>
          </div>

          <div data-aos="fade-up" className="mt-10 grid grid-cols-3 gap-6 pt-[40px] pb-[140px]">
            {newsData.map((news, index) => (
              <NewsCard
                key={index}
                {...news}
                buttonText="Read More"
                onButtonClick={() => handleReadMore(news.title)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#DDE2FF] h-[734px]">
        <Phone />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Update;
