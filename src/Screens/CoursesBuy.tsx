import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BuyCard from '@/Components/ui/buy-card';
import Navbar from '@/Components/Navbar';
import { Input } from '@/Components/ui/input';
import { Search, ChevronDown } from 'lucide-react';
import Footer from '@/Components/Footer';
import { Toaster } from 'sonner';

type Lecture = {
  id: number;
  title: string;
  videoSrc: string;
  isLocked: boolean;
  duration: { value: number; unit: string };
  subtitle: string;
  subtitleLanguage: string;
  courseLevel: string;
};

type Course = {
  _id: string;
  title: string;
  videoSrc: string;
  price: string;
  originalPrice: string;
  discount: string;
  reviews: number;
  description: string;
  lectures: Lecture[];
  category: string;
  language: string;
  totalLectures: number;
  duration: { value: number; unit: string };
  courseLevel: string;
};

const CoursesBuy = () => {
  const location = useLocation();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLecture, setActiveLecture] = useState<number | null>(null);
  const [lectureDurations, setLectureDurations] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    if (location.state && (location.state as { course: Course }).course) {
      setCourse((location.state as { course: Course }).course);
    }
  }, [location]);

  useEffect(() => {
    if (course?.lectures) {
      course.lectures.forEach(async (lecture) => {
        const duration = await getVideoDuration(lecture.videoSrc);
        setLectureDurations((prev) => new Map(prev).set(lecture.id, duration));
      });
    }
  }, [course]);

  const getVideoDuration = (videoSrc: string): Promise<string> => {
    const video = document.createElement('video');
    video.src = videoSrc;
    return new Promise<string>((resolve) => {
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        resolve(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
      };
    });
  };

  const toggleLecture = (id: number) => {
    setActiveLecture((prev) => (prev === id ? null : id));
  };

  const { fullStars, hasHalfStar, emptyStars } = (() => {
    const rating = course?.reviews || 0;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return { fullStars, hasHalfStar, emptyStars };
  })();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />

      {/* Search Bar */}
      <div className="mt-5 px-4 md:px-[78px] py-[20px]">
        <div className="flex items-center bg-white rounded-full max-w-[762px] mx-auto md:mx-0 px-4 py-2 shadow-md">
          <Search size={20} className="text-gray-500 mr-3 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder="Search" 
            className="flex-1 text-sm placeholder:text-gray-500 border-none shadow-none" 
          />
          <button className="ml-3 bg-secondary text-white rounded-full px-4 py-1 text-sm font-[lora] whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow items-center px-4 md:px-[78px] py-[30px] md:py-[90px]">
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/* Left Column */}
          <div className="w-full lg:w-3/4">
            <h2 className="text-xl md:text-2xl font-semibold font-[inter]">{course?.title}</h2>
            
            {/* Ratings */}
            <div className="flex items-center mt-2 pb-5">
              {Array.from({ length: fullStars }).map((_, index) => (
                <span key={`full-${index}`} className="text-yellow-500">★</span>
              ))}
              {hasHalfStar && <span className="text-yellow-500">★</span>}
              {Array.from({ length: emptyStars }).map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300">★</span>
              ))}
              <span className="ml-2 text-sm text-gray-700">{course?.reviews}</span>
            </div>

            {/* Video Player */}
            <div className="relative bg-black rounded-md overflow-hidden mb-5 w-full aspect-video">
              <video className="w-full h-full" src={course?.videoSrc} controls />
            </div>

            {/* Curriculum */}
            <h3 className="text-xl font-semibold">Curriculum</h3>
            <ul className="mt-5">
              {course?.lectures?.map((lecture) => (
                <li key={lecture.id} className="py-2 px-4 border border-gray-300">
                  <div 
                    className="flex items-center justify-between cursor-pointer" 
                    onClick={() => toggleLecture(lecture.id)}
                  >
                    <div className="flex items-center">
                      <ChevronDown 
                        className={`transition-transform transform mr-3 ${
                          activeLecture === lecture.id ? 'rotate-180' : ''
                        }`} 
                      />
                      <span>{lecture.title}</span>
                    </div>
                    <span>{lectureDurations.get(lecture.id)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Buy Card */}
          <div className="w-full lg:w-1/4">
            <BuyCard
              title={course?.title || ""}
              description={course?.description || ""}
              currentPrice={Number(course?.price || 0)}
              totalLectures={course?.totalLectures || 0}
              courseId={course?._id || ""}
              subtitleLanguage=''
              courseLevel={course?.courseLevel || "Beginner"}
              language={course?.language || ""}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesBuy;
