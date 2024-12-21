"use client";

import { useState, useEffect } from "react";
import PhoneNum from "./PhoneNum";
import VideoCard from "./VideoCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StartFilling = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // useEffect(() => {
  //   AOS.init({
  //     duration: 700,
  //   });
  // }, []);

  const carouselData = [
    {
      title: "Choose FACTO for below mentioned services",
      items: [
        "Income Tax Return (ITR) Filing: Assisted e-filing of income tax returns with expert guidance to ensure accuracy and timely submission",
        "Tax Planning: Personalized tax planning assistance to help minimize tax liabilities and optimize financial strategiesTax",
        "Income Tax Notice Resolution: Expert assistance in resolving income tax notices, ensuring compliance and peace of mind",
        "Appeal Services: Guidance and support in navigating tax dispute appeals and resolutions",
        "Lower Deduction Certificate: Assistance in obtaining certificates to minimize tax deductions at source",
        "Financial management service - Comprehensive financial management services for businesses, including accounting, tax compliance, and strategic planning",
        "Goods and Services Tax (GST) Filing: Support with GST registration and timely filing to ensure compliance with GST regulations.",
        "Provident Fund (PF) Withdrawal: Assistance with the process of withdrawing funds from provident fund accounts",
        "Tax Deducted at Source (TDS) Return Filing: Services to ensure accurate and timely filing of TDS returns",
        "Accounting Services: Professional accounting services to maintain accurate financial records and compliance.",
      ],
    },
    {
      title: "Why Early E-Filing ITR is important with FACTO",
      items: [
        "Faster Refund",
        "More time to address issue and Facilitates Financial Planning",
        "Reduce penalties and interest",
        "Better planning for tax calculation and refund",
        "Easy access to tax professional",
        "Maximized Use of Tax Credits and Deductions",
      ],
    },
    {
      title: "Why opt for GST Filing with FACTO",
      items: [
        "Filing under expert guidance",
        "Timely compliance",
        "End to end support",
        "Affordable price",
        "Error free filing",
        "GSTR-1 and GSTR-2B and GSTR-3B Reconciliation with books",
        "Data security",
        "24*7 customer support",
      ],
    },
    {
      title: "Our Corporate and Retail Training Program",
      items: [
        "Learning Tab helps businesses and individuals build skills for success",
        "Easy-to-use lessons",
        "Industry-focused content",
        "Expert support",
        "We make learning simple and effective",
        "Boost your team's performance",
        "Stay ahead in the competitive market",
        "Engaging and practical training solutions",
      ],
    },
  ];
  const [contentVisibility, setContentVisibility] = useState<number[]>(
    Array(carouselData.length).fill(0)
  );

  const toggleContentVisibility = (index: number) => {
    setContentVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = updatedVisibility[index] ? 0 : 1;

      return updatedVisibility.map((data, i) => {
        if (i !== index) {
          return 0;
        }
        return data;
      });
    });
  };

  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <ChevronRight size={24} />
      </div>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "black" }}
        onClick={onClick}
      >
        <ChevronLeft size={24} />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setContentVisibility((prevVisibility) => {
        const updatedVisibility = [...prevVisibility];
        updatedVisibility[current] = 0;
        updatedVisibility[next] = 0;
        if (updatedVisibility[current] == 1) {
          return updatedVisibility;
        }
        return updatedVisibility.map((data, i) => {
          if (i !== next) {
            return 0;
          }
          return data;
        });
      });
      setActiveSlide(next);
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="px-6 md:px-[50px] lg:px-[99px] pt-[50px] lg:pt-[103px] pb-[60px] lg:pb-[110px]">
      <div className="flex flex-col xl:flex-row gap-[30px]">
        <div className="w-full xl:w-[547px] flex flex-col justify-center mt-auto mb-auto">
          <div className="relative">
            <Slider {...settings}>
              {carouselData.map((slide, index) => (
                <div
                  key={index}
                  className="outline-none min-h-[20vh] flex flex-col justify-center items-center"
                  onClick={() => toggleContentVisibility(index)}
                >
                  <div
                    className={`transition-all duration-300 ease-in-out flex flex-col ${
                      contentVisibility[index]
                        ? "justify-start items-start"
                        : "justify-center items-center"
                    }`}
                  >
                    <h2
                      className={`font-[poppins] text-[24px] lg:text-[40px] font-semibold leading-[30px] lg:leading-[48.48px] ${
                        contentVisibility[index] ? "text-left" : "text-center"
                      }`}
                    >
                      {slide.title}
                    </h2>
                    <ul
                      className={`${
                        contentVisibility[index]
                          ? "visible mt-[16px]"
                          : "hidden"
                      } font-[poppins] text-[14px] lg:text-[16px] font-[300] leading-[22px] lg:leading-[25.6px] tracking-[-0.02em] list-disc pl-5`}
                    >
                      {slide.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </Slider>

            <div className="flex justify-center mt-4 space-x-2">
              {carouselData.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeSlide === index ? "bg-secondary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div data-aos="fade-up" className="mt-6">
            <PhoneNum />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-2 gap-[20px] lg:gap-[40px] mt-[30px] xl:mt-0 font-[inter] items-center">
          <div
            data-aos="fade-up"
            className="w-full max-w-[400px] sm:w-auto mx-auto"
          >
            <VideoCard
              width="100%"
              descriptionHeading="Timely E-filing for Prompt Refunds"
              description="Timely e-filing expedites verification, ensuring prompt refunds."
            />
          </div>

          <div
            data-aos="fade-up"
            className="w-full max-w-[400px] sm:w-auto mx-auto"
          >
            <VideoCard
              width="100%"
              descriptionHeading="Penalty-Free Tax Filing"
              description="Stay clear of penalties by filing your taxes accurately and on time, go for it."
            />
          </div>

          <div
            data-aos="fade-up"
            className="w-full max-w-[400px] sm:w-auto mx-auto"
          >
            <VideoCard
              width="100%"
              descriptionHeading="Defective Return Notice Prevention"
              description="Avoid receiving a Defective Return Notice through accurate tax filing."
            />
          </div>

          <div
            data-aos="fade-up"
            className="w-full max-w-[400px] sm:w-auto mx-auto"
          >
            <VideoCard
              width="100%"
              descriptionHeading="Escape the Last-Minute Filing Rush"
              description="Say goodbye to the commotion of the last-minute tax filing rush."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartFilling;
