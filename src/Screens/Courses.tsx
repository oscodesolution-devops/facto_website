import { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/Components/Navbar";
import { Input } from "@/Components/ui/input";
import CourseContent from "@/Components/CourseContent";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { VideoCourses } from "@/api";


type TotalCourseDetails = {
  value: number;
  unit: string;
}



type LectureDetails = {
  duration: TotalCourseDetails;
  _id: string;
  title: string;
  subtitle: string;
  lectureNumber: number;
  language: string;
  subtitleLanguage: string;
  thumbnail: string;
  videoUrl: string;
  courseLevel: string;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type MainCourse = {
  duration: TotalCourseDetails;
  _id: string;
  title: string;
  category: string;
  language: string;
  totalLectures: number;
  price: number;
  description: string;
  lectures: LectureDetails[];
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


// const Courses1 = () => {
//   const [courses, setCourses] = useState<MainCourse[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//     });

//     async function fetchCourses() {
//       try {
//         const res: MainCourse[] = await VideoCourses.getCourses();
//         setCourses(res);
//         fetchCategories(res);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCourses();
//   }, []);

//   function fetchCategories(courses: MainCourse[]) {
//     const uniqueCategories = Array.from(
//       new Set(courses.map((course) => course.category))
//     );
//     setCategories(uniqueCategories);
//     setActiveCategory(uniqueCategories[0] || ""); // Set the first category as active
//   }



//   const [activeCategory, setActiveCategory] = useState<string>("");
//   // const [videoProgress, setVideoProgress] = useState<{ [key: number]: number }>({}); 





//   //  "data": [
//   //     {
//   //       "duration": {
//   //         "value": 30,
//   //         "unit": "hours"
//   //             },
//   //       "_id": "67489bdad4f4b2315368adf7",
//   //       "title": "Learn Basic of finance",
//   //       "category": "design",
//   //       "language": "english",
//   //       "totalLectures": 2,
//   //       "price": 3000,
//   //       "description": "this is the description of this course",
//   //       "lectures": [
//   //         {
//   //           "duration": {
//   //             "value": 30,
//   //             "unit": "minutes"
//   //                     },
//   //           "_id": "67489c4ad4f4b2315368adff",
//   //           "title": "Introduction",
//   //           "subtitle": "",
//   //           "lectureNumber": 1,
//   //           "language": "English",
//   //           "subtitleLanguage": "",
//   //           "thumbnail": "https://res.cloudinary.com/diush63ly/image/upload/v1732811837/course_thumbnails/twbvn8opktr2ddnt7hv7.png",
//   //           "videoUrl": "https://res.cloudinary.com/diush63ly/video/upload/v1732811845/course_videos/ftx3m6weslqoknsmc8jo.mp4",
//   //           "courseLevel": "Beginner",
//   //           "isFree": true,
//   //           "createdAt": "2024-11-28T16:37:30.450Z",
//   //           "updatedAt": "2024-11-28T16:37:30.450Z",
//   //           "__v": 0
//   //                 }
//   //       ],
//   //       "status": "published",
//   //       "createdAt": "2024-11-28T16:35:38.487Z",
//   //       "updatedAt": "2024-11-30T12:45:34.694Z",
//   //       "__v": 1
//   //         },
//   //     {
//   //       "duration": {
//   //         "value": 10,
//   //         "unit": "hours"
//   //             },
//   //       "_id": "674acb9129cb76fe61ffd975",
//   //       "title": "test",
//   //       "category": "development",
//   //       "language": "english",
//   //       "totalLectures": 1,
//   //       "price": 1000,
//   //       "description": "this is a test description",
//   //       "lectures": [
//   //         {
//   //           "duration": {
//   //             "value": 32,
//   //             "unit": "minutes"
//   //                     },
//   //           "_id": "674af5d1b27cc14f78733599",
//   //           "title": "Introduction",
//   //           "subtitle": "hehehehehehe",
//   //           "lectureNumber": 1,
//   //           "language": "english",
//   //           "subtitleLanguage": "english",
//   //           "thumbnail": "https://res.cloudinary.com/diush63ly/image/upload/v1732965824/course_thumbnails/ewegscc5wzyaoppjp89m.jpg",
//   //           "videoUrl": "https://res.cloudinary.com/diush63ly/video/upload/v1732965835/course_videos/ihbtuecpyx9dv8eoqptc.mp4",
//   //           "courseLevel": "beginner",
//   //           "isFree": true,
//   //           "createdAt": "2024-11-30T11:24:01.603Z",
//   //           "updatedAt": "2024-11-30T11:24:01.603Z",
//   //           "__v": 0
//   //                 }
//   //       ],
//   //       "status": "published",
//   //       "createdAt": "2024-11-30T08:23:45.937Z",
//   //       "updatedAt": "2024-11-30T13:21:58.372Z",
//   //       "__v": 1
//   //         },
//   //     {
//   //       "duration": {
//   //         "value": 12,
//   //         "unit": "weeks"
//   //             },
//   //       "_id": "674c970a04c1868eb01d94f5",
//   //       "title": "Test",
//   //       "category": "design",
//   //       "language": "english",
//   //       "totalLectures": 1,
//   //       "price": 2000,
//   //       "description": "GST Course",
//   //       "lectures": [
//   //         {
//   //           "duration": {
//   //             "value": 12,
//   //             "unit": "minutes"
//   //                     },
//   //           "_id": "674c977704c1868eb01d9514",
//   //           "title": "Introduction",
//   //           "subtitle": "",
//   //           "lectureNumber": 1,
//   //           "language": "english",
//   //           "subtitleLanguage": "",
//   //           "thumbnail": "https://res.cloudinary.com/diush63ly/image/upload/v1733072751/course_thumbnails/zyjlgo2ubbrtlfc9wxny.jpg",
//   //           "videoUrl": "https://res.cloudinary.com/diush63ly/video/upload/v1733072754/course_videos/gup2hpcw2r6qglolruy3.mp4",
//   //           "courseLevel": "intermediate",
//   //           "isFree": true,
//   //           "createdAt": "2024-12-01T17:05:59.064Z",
//   //           "updatedAt": "2024-12-01T17:05:59.064Z",
//   //           "__v": 0
//   //                 }
//   //       ],
//   //       "status": "published",
//   //       "createdAt": "2024-12-01T17:04:10.229Z",
//   //       "updatedAt": "2024-12-01T17:09:22.912Z",
//   //       "__v": 1
//   //         }
//   //   ],

//   // const filteredCourses = courses.filter((course) =>
//   //   activeCategory === "Your Courses"
//   //     ? true
//   //     : course.title.includes(activeCategory)
//   // );

//   // const handleVideoCompletion = (courseId: number, lectureId: number) => {
//   //   setVideoProgress((prev) => ({
//   //     ...prev,
//   //     [courseId]: lectureId + 1, 
//   //   }));
//   // };

//   return (
//     <div className="overflow-hidden">
//       <Navbar />

//       <div className="w-full flex justify-start pt-6 md:pt-[90px] px-4 md:px-[78px]">
//         <div data-aos="fade-up" className="flex flex-wrap gap-3 md:gap-5">
//           {categories.length > 0 ? (
//             categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setActiveCategory(category)}
//                 className={`min-w-[100px] md:min-w-[138px] px-3 md:px-4 py-1 md:py-2 rounded-full font-[Poppins] font-[300] text-xs md:text-sm transition-all ${activeCategory === category
//                   ? "bg-primary text-white"
//                   : "bg-[#D1FADF] text-black"
//                   }`}
//               >
//                 {category}
//               </button>
//             ))
//           ) : (
//             <p>Loading categories...</p>
//           )}
//         </div>
//       </div>



//       {/* <div className="mt-5 flex items-center justify-start px-4 md:pl-[78px] md:pt-[20px]">
//         <div
//           data-aos="fade-up"
//           className="flex items-center bg-white rounded-full w-full md:w-[762px] px-4 py-2"
//           style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
//         >
//           <Search size={20} className="text-gray-500 mr-3" />
//           <Input
//             type="text"
//             placeholder="Search"
//             className="flex-1 text-sm placeholder:text-gray-500 border-none shadow-none"
//           />
//           <button className="ml-3 bg-secondary text-white rounded-full px-4 py-1 text-sm font-[lora]">
//             Search
//           </button>
//         </div>
//       </div> */}

//       <div >
//         {filteredCourses.map((course) => (
//           <CourseContent
//             key={course.id}
//             courseData={course}
//             isYourCourses={activeCategory === "Your Courses"}
//           // videoProgress={videoProgress[course.id] || 1}
//           // onVideoComplete={handleVideoCompletion}
//           />
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };




export default function Courses() {
  const [courses, setCourses] = useState<MainCourse[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<MainCourse[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    async function fetchCourses() {
      try {
        const res = await VideoCourses.getCourses();
        setCourses(res.data);
        fetchCategories(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(filterCourses(courses));
  }, [activeCategory]);

  function fetchCategories(courses: MainCourse[]) {
    if (!courses || courses.length === 0) return;
    const uniqueCategories = Array.from(
      new Set(courses.map((course) => course.category))
    );
    setCategories(uniqueCategories);
    setActiveCategory(uniqueCategories[0] || "");
  }

  function filterCourses(courses: MainCourse[]) {
    return courses.filter((course) => course.category === activeCategory);
  }

  return (
    <div className="overflow-hidden">
      <Navbar />

      {/* categories */}
      <div className="w-full flex justify-start pt-6 md:pt-[90px] px-4 md:px-[78px]">
        <div data-aos="fade-up" className="flex flex-wrap gap-3 md:gap-5">
          {loading
            ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="skeleton min-w-[100px] md:min-w-[138px] px-3 md:px-4 py-1 md:py-2 rounded-full"
                ></div>
              ))
            : categories.length > 0
            && categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-w-[100px] md:min-w-[138px] px-3 md:px-4 py-1 md:py-2 rounded-full font-[Poppins] font-[300] text-xs md:text-sm transition-all ${activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-[#D1FADF] text-black"
                  }`}
              >
                {category}
              </button>
            ))
          }
        </div>
      </div>


      {/* search bar */}
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
            key={course._id}
            {...course}
          // isYourCourses={activeCategory === "Your Courses"}
          // videoProgress={videoProgress[course.id] || 1}
          // onVideoComplete={handleVideoCompletion}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
