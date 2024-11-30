import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Input } from "@/Components/ui/input";
import CourseContent from "@/Components/CourseContent"; 
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const Courses = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, 
    });
  }, []);

  const [activeCategory, setActiveCategory] = useState("Your Courses");
  // const [videoProgress, setVideoProgress] = useState<{ [key: number]: number }>({}); 

  const hasPurchasedCourses = true;

  const categories = hasPurchasedCourses
    ? ["Your Courses", "GST", "Income Tax"]
    : ["GST", "Income Tax"];

  const courses = [
    {
      id: 1,
      title: "1. GST: The Goods and Services Tax Certificate Course",
      videoSrc: "/assets/bulb.mp4",
      price: "₹2,999",
      duration: "3 hours on-demand video",
      tests: "2 practice tests",
      reviews: 5,
      lectures: [
        { id: 1, title: "Lecture 1", isLocked: false, videoSrc: "/assets/bulb.mp4" },
        { id: 2, title: "Lecture 2", isLocked: true, videoSrc: "/assets/bulb.mp4" },
        { id: 3, title: "Lecture 3", isLocked: true, videoSrc: "/assets/bulb.mp4" },
        { id: 4, title: "Lecture 4", isLocked: true, videoSrc: "/assets/bulb.mp4" },
      ],
    },
    {
      id: 2,
      title: "2. Income Tax Basics and Advanced Course",
      videoSrc: "/assets/tax.mp4",
      price: "₹3,499",
      duration: "4 hours on-demand video",
      tests: "3 practice tests",
      reviews: 3,
      lectures: [
        { id: 1, title: "Introduction to Income Tax", isLocked: false, videoSrc: "/assets/tax.mp4" },
        { id: 2, title: "Filing Returns", isLocked: true, videoSrc: "/assets/tax.mp4" },
        { id: 3, title: "Tax Saving Strategies", isLocked: true, videoSrc: "/assets/tax.mp4" },
        { id: 4, title: "Advanced Topics in Taxation", isLocked: true, videoSrc: "/assets/tax.mp4" },
      ],
    },
    {
      id: 3,
      title: "3. Advanced Excel for Financial Modeling",
      videoSrc: "/assets/excel.mp4",
      price: "₹2,499",
      duration: "2.5 hours on-demand video",
      tests: "1 practice test",
      reviews: 2,
      lectures: [
        { id: 1, title: "Excel Basics", isLocked: false, videoSrc: "/assets/excel.mp4" },
        { id: 2, title: "Functions and Formulas", isLocked: true, videoSrc: "/assets/excel.mp4" },
        { id: 3, title: "Financial Modeling Overview", isLocked: true, videoSrc: "/assets/excel.mp4" },
        { id: 4, title: "Advanced Financial Analysis", isLocked: true, videoSrc: "/assets/excel.mp4" },
      ],
    },
  ];

  const filteredCourses = courses.filter((course) =>
    activeCategory === "Your Courses"
      ? true
      : course.title.includes(activeCategory)
  );

  // const handleVideoCompletion = (courseId: number, lectureId: number) => {
  //   setVideoProgress((prev) => ({
  //     ...prev,
  //     [courseId]: lectureId + 1, 
  //   }));
  // };

  return (
    <div className="overflow-hidden">
      <Navbar />

      <div className="w-full flex justify-start pt-6 md:pt-[90px] px-4 md:px-[78px]">
  <div data-aos="fade-up" className="flex flex-wrap gap-3 md:gap-5">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setActiveCategory(category)}
        className={`min-w-[100px] md:min-w-[138px] px-3 md:px-4 py-1 md:py-2 rounded-full font-[Poppins] font-[300] text-xs md:text-sm transition-all ${
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



<div className="mt-5 flex items-center justify-start px-4 md:pl-[78px] md:pt-[20px]">
  <div
    data-aos="fade-up"
    className="flex items-center bg-white rounded-full w-full md:w-[762px] px-4 py-2"
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

          <div >
      {filteredCourses.map((course) => (
        <CourseContent
          key={course.id}
          courseData={course}
          isYourCourses={activeCategory === "Your Courses"}
          // videoProgress={videoProgress[course.id] || 1}
          // onVideoComplete={handleVideoCompletion}
        />
      ))}
      </div>

      <Footer />
    </div>
  );
};

export default Courses;
