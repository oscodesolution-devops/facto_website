import React, { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

type TotalCourseDetails = {
  value: number;
  unit: string;
};

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
};

const CourseContent: React.FC<{
  _id: string;
  title: string;
  category: string;
  language: string;
  totalLectures: number;
  price: number;
  description: string;
  lectures: LectureDetails[];
  duration: TotalCourseDetails;
  myCourses: boolean;
}> = ({
  _id,
  title,
  category,
  language,
  totalLectures,
  price,
  description,
  lectures,
  duration,
  myCourses
}) => {
  // State to track the currently selected lecture
  const [selectedLecture, setSelectedLecture] = useState<LectureDetails | null>(
    null
  );

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  // Set initial lecture when component mounts or course changes
  useEffect(() => {
    // Find first lecture with a video URL
    const firstLecture = lectures.find((lecture) => lecture.videoUrl);
    setSelectedLecture(firstLecture || null);
  }, [lectures]);

  // Function to determine if a lecture is locked
  const isLectureLocked = (lecture: LectureDetails) => {
    // If no video URL is provided or not free, consider the lecture locked
    return !lecture.videoUrl || !lecture.isFree;
  };

  // Handler for lecture selection
  const handleLectureSelect = (lecture: LectureDetails) => {
    // Only allow selection if lecture is not locked and has a video
    if (!isLectureLocked(lecture)) {
      setSelectedLecture(lecture);
    }
  };

  // Determine the total number of lectures
  const availableLectures = lectures.filter(
    (lecture) => lecture.videoUrl
  ).length;

  return (
    <div
      data-aos="fade-up"
      className="px-4 sm:px-6 md:px-10 lg:px-[78px] pt-6 md:pt-[90px]"
    >
      <h2 className="font-[Poppins] text-lg sm:text-xl lg:text-[22px] mb-4">
        {title}
      </h2>

      <div className="grid lg:grid-cols-[3fr,2fr] gap-x-24">
        {/* Main Content */}
        <div className="pb-6 md:pb-[90px]">
          {/* Main Video Player */}
          <div
            className="relative bg-black rounded-md overflow-hidden mb-5"
            style={{ height: "300px" }}
          >
            {selectedLecture?.videoUrl ? (
              <video
                key={selectedLecture._id}
                className="w-full h-full object-cover"
                src={selectedLecture.videoUrl}
                poster={selectedLecture.thumbnail}
                controls
                controlsList="nodownload"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Video Available</span>
              </div>
            )}
          </div>

          {/* Course Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="p-4">
              <h3 className="font-[Poppins] text-base lg:text-[16px] mb-2">
                This course includes:
              </h3>
              <ul className="list-disc pl-5 text-gray-600 text-sm mb-4">
                <li>
                  {duration.value} {duration.unit} on-demand videos
                </li>
                <li>Total Lectures: {totalLectures}</li>
                <li>Available Lectures: {availableLectures}</li>
                <li>Language: {language}</li>
                <li>Category: {category}</li>
              </ul>

              {!myCourses&&
              <>
              <Link
                to={`/courses-buy/${_id}`}
                state={{ course: { _id, title, price } }}
              >
                <button className="bg-primary text-white rounded-full px-4 py-2 mr-3 text-sm">
                  Buy Now
                </button>
              </Link>

              <button className="bg-secondary text-white rounded-full px-4 py-2 text-sm">
                Watch Demo
              </button></>}
            </div>

            <div className="p-4 flex flex-col items-start">
              <h3 className="font-[Poppins] text-base lg:text-[16px] mb-2">
                {title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <h3 className="text-red-500 text-lg lg:text-[20px] font-bold">
                    ₹{price}
                  </h3>
                  <span className="text-gray-600 text-sm ml-2">per course</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar - Vertical Lecture Carousel */}
        <div className="h-auto lg:min-h-screen">
          <div className="overflow-y-scroll max-h-[400px] lg:max-h-[400px]">
            {lectures.map((lecture) => {
              const isLocked = isLectureLocked(lecture);
              const isSelected = selectedLecture?._id === lecture._id;

              return (
                <div
                  key={lecture._id}
                  onClick={() => handleLectureSelect(lecture)}
                  className={`
                    relative bg-black rounded-md overflow-hidden mb-3 cursor-pointer 
                    ${
                      isLocked && !myCourses
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-2 hover:border-primary"
                    }
                    ${isSelected ? "border-2 border-primary" : ""}
                  `}
                  style={{ height: "160px" }}
                >
                  {lecture.videoUrl ? (
                    <video
                      className="w-full h-full object-cover"
                      src={lecture.videoUrl}
                      style={{ pointerEvents: isLocked ? "none" : "auto" }}
                      poster={lecture.thumbnail}
                      controls
                      controlsList="nodownload"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">
                        No Preview Available
                      </span>
                    </div>
                  )}

                  {(isLocked&&!myCourses) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-500 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Lecture Title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
                    {lecture.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
