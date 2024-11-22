import { Lock, Star } from "lucide-react";
import { Link } from "react-router-dom";  
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


interface Lecture {
  id: number;
  title: string;
  isLocked: boolean;
  videoSrc: string;
}

interface CourseContentProps {
  courseData: {
    title: string;
    videoSrc: string;
    price: string;
    duration: string;
    tests: string;
    reviews: number;
    lectures: Lecture[];
  };
  isYourCourses: boolean;
}

const CourseContent = ({ courseData, isYourCourses }: CourseContentProps) => {
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return { fullStars, hasHalfStar, emptyStars };
  };

  const { fullStars, hasHalfStar, emptyStars } = getStars(courseData.reviews);

  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
<div data-aos="fade-up" className="px-4 sm:px-6 md:px-10 lg:px-[78px] pt-6 md:pt-[90px]">
  <h2 className="font-[Poppins] text-lg sm:text-xl lg:text-[22px] mb-4">{courseData.title}</h2>

  <div className="grid lg:grid-cols-[3fr,1fr] gap-5">
    {/* Main Content */}
    <div className="pb-6 md:pb-[90px]">
      <div
        className="relative bg-black rounded-md overflow-hidden mb-5"
        style={{ height: "300px" }}
      >
        <video className="w-full h-full object-cover" src={courseData.videoSrc} controls />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-4">
          <h3 className="font-[Poppins] text-base lg:text-[16px] mb-2">This course includes:</h3>
          <ul className="list-disc pl-5 text-gray-600 text-sm mb-4">
            <li>{courseData.duration}</li>
            <li>{courseData.tests}</li>
          </ul>

          {!isYourCourses && (
            <Link to={`/courses-buy/${courseData.title}`} state={{ course: courseData }}>
              <button className="bg-primary text-white rounded-full px-4 py-2 mr-3 text-sm">
                Buy Now
              </button>
            </Link>
          )}

          <button className="bg-secondary text-white rounded-full px-4 py-2 text-sm">
            Watch Demo
          </button>
        </div>

        <div className="p-4 flex flex-col items-start">
          <h3 className="font-[Poppins] text-base lg:text-[16px] mb-2">{courseData.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              {Array.from({ length: fullStars }).map((_, index) => (
                <Star key={`full-${index}`} size={16} className="text-yellow-500 fill-yellow-500" />
              ))}
              {hasHalfStar && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
              {Array.from({ length: emptyStars }).map((_, index) => (
                <Star key={`empty-${index}`} size={16} className="text-gray-300 fill-none" />
              ))}
            </div>
            <span className="ml-2">{courseData.reviews} reviews</span>
          </div>
          <h3 className="text-red-500 text-lg lg:text-[20px] font-bold">{courseData.price}</h3>
        </div>
      </div>
    </div>

    {/* Sidebar - Vertical Carousel */}
    <div className="h-auto lg:min-h-screen">
      <div className="overflow-y-scroll max-h-[400px] lg:max-h-[400px]">
        {courseData.lectures.map((lecture) => {
          const isLocked = isYourCourses ? false : lecture.isLocked;

          return (
            <div
              key={lecture.id}
              className={`relative bg-black rounded-md overflow-hidden mb-3 ${
                isLocked ? "opacity-50" : ""
              }`}
              style={{ height: "160px" }}
            >
              <video
                className="w-full h-full object-cover"
                src={lecture.videoSrc}
                style={{ pointerEvents: isLocked ? "none" : "auto" }}
              />
              {isLocked && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isYourCourses && (
        <button className="mt-4 bg-primary text-white rounded-full px-4 py-2 text-sm">
          Explore More
        </button>
      )}
    </div>
  </div>
</div>


  );
};

export default CourseContent;
