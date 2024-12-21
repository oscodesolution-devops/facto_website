import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BuyCard from '@/Components/ui/buy-card';
import Navbar from '@/Components/Navbar';
import { Input } from '@/Components/ui/input';
import { Search } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import Footer from '@/Components/Footer';

type Course = {
  _id:string;
  title: string;
  videoSrc: string;
  price: string;
  originalPrice: string;
  discount: string;
  reviews: number;
  description: string;
  lectures: { id: number; title: string; videoSrc: string; isLocked: boolean }[];
};

const CoursesBuy = () => {
  const location = useLocation();
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLecture, setActiveLecture] = useState<number | null>(null);
  const [lectureDurations, setLectureDurations] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    console.log(location.state.course)
    if (location.state && (location.state as { course: Course }).course) {

      setCourse((location.state as { course: Course }).course);
    }
  }, [location]);

  useEffect(() => {
    if (course) {
      course.lectures?.forEach(async (lecture) => {
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
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        resolve(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
      };
    });
  };

  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return { fullStars, hasHalfStar, emptyStars };
  };

  // const truncateDescription = (description: string) => {
  //   if (!description) return ''; 
  //   const words = description.split(' ');
  //   return words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  // };


  const courseDescription = course?.description || "fnjanvajnkja jnvnvfnbodfjsnboifabno dmbkdmboinjobnaonvionjoi eanoirnviomvoembomkdjdbnkj naovnrawio vuir avnfsakfmlvmflvmfkvfsmvkfsmv  vsi nvsfn  vniofi nvsofs vofi vpofsmvfpo mnoabnofnbkl fvfs vmvfpovjfs mvfsklnvko vifjv iorwvnkf vmmkvnofs oij io ";

  const { fullStars, hasHalfStar, emptyStars } = getStars(course?.reviews || 0);

  const toggleLecture = (id: number) => {
    setActiveLecture(prev => (prev === id ? null : id));
  };

  return (
    <div className="overflow-hidden">
      <Navbar />

      <div className="mt-5 flex items-center justify-center pl-[78px] mr-[auto] pt-[20px]">
        <div className="flex items-center bg-white rounded-full w-[762px] mr-[auto] px-4 py-2" style={{ boxShadow: '0px 0.94px 6.57px 0px #00000040' }}>
          <Search size={20} className="text-gray-500 mr-3" />
          <Input type="text" placeholder="Search" className="flex-1 text-sm placeholder:text-gray-500 border-none shadow-none" />
          <button className="ml-3 bg-secondary text-white rounded-full px-4 py-1 text-sm font-[lora]">Search</button>
        </div>
      </div>

      <div className="flex justify-center px-[78px] pt-[90px]">
        <div className="flex gap-5 w-full relative">

          <div className="w-3/4">
            <h2 className="text-2xl font-semibold font-[inter]">{course?.title}</h2>
            <div className="flex items-center mt-2 pb-5">

              {Array.from({ length: fullStars })?.map((_, index) => (
                <span key={`full-${index}`} className="text-yellow-500">★</span>
              ))}
              {hasHalfStar && <span className="text-yellow-500">★</span>}
              {Array.from({ length: emptyStars })?.map((_, index) => (
                <span key={`empty-${index}`} className="text-gray-300">★</span>
              ))}
              <span className="ml-2 text-sm text-gray-700">{course?.reviews}</span>
            </div>

            <div className="relative bg-black rounded-md overflow-hidden mb-5" style={{ height: '400px', width: '880px' }}>
              <video className="w-full h-full" src={course?.videoSrc} controls />
            </div>

            <div className="mt-5 w-[870px] pt-[50px]">
              <h3 className="text-xl font-semibold">Course Description</h3>
              <p className="mt-5 text-sm text-gray-700">{courseDescription}</p>
            </div>

            <div className="mt-5 w-[870px] pt-[50px] mb-[60px]">
              <h3 className="text-xl font-semibold">Curriculum</h3>
              <ul className="mt-5 ">
                {course?.lectures?.map(lecture => (
                  <li key={lecture.id} className="py-2 px-4 border border-gray-300">
                    <div className="flex items-center justify-start cursor-pointer" onClick={() => toggleLecture(lecture.id)}>
                      <ChevronDown className={`transition-transform transform mr-3 ${activeLecture === lecture.id ? 'rotate-180' : ''}`} size={20} />
                      <span className="text-lg font-medium">{lecture.title}</span>
                      <span className="text-sm text-gray-500 ml-[700px]">

                        {lectureDurations.get(lecture.id)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-1/4 max-w-[350px] absolute left-[calc(70%)]" style={{ zIndex: 10 }}>
            <BuyCard
              title={course?.title || "Course Title"}
              description={courseDescription}
              currentPrice={Number(course?.price)}
              totalLectures={6}
              courseId={course?._id}
              courseLevel="Beginner and Intermediate"
              language="Hindi"
              subtitleLanguage="English"
              note="magna aliqua.Ut enim ad minim veniam"
            />
            {/* <p className="mt-3 text-sm text-gray-700">{truncateDescription(courseDescription)}</p> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesBuy;
