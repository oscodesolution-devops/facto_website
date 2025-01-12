import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../Components/Navbar";
import Header from "@/Components/Header";
import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";
import { Link } from "react-router-dom";
import GSTServiceCard from "@/Components/ui/detailcard";
import Phone from "@/Components/Phone";
import Logo from "../assets/logo.svg";
import VideoCard from "@/Components/VideoCard";
import Footer from "@/Components/Footer";
import Factoo from "../assets/Factoo.png";
import { Notifications, Services } from "@/api";
import GSTServiceCardSkeleton from "@/Components/GSTServiceCardLoader";
import { toast, Toaster } from "sonner";
import { useGlobalContext } from "@/context/GlobalContext";

// Types
export interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Notification {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const LandingPage = () => {
  const [searchText, setSearchText] = useState("");
  
  const {setIsVisibleForm} = useGlobalContext();
  const [services, setServices] = useState<Service[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneNo,setPhoneNo] = useState('')
  const [filteredServices,setFilteredServices] = useState<Service[]>([]);
 
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      disable: "mobile",
      mirror: false,
      offset: 50,
      delay: 0,
    });

    return () => {
      AOS.refresh();
    };
  }, []);
  useEffect(() => {
    
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchText.toLowerCase())
    );
    
    setFilteredServices(()=>filtered);
  }, [searchText, services]);
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, notificationsRes] = await Promise.all([
          Services.getServices(),
          Notifications.getNotifications(),
        ]);

        setServices(servicesRes.data.services);
        setFilteredServices(servicesRes.data.services);
        setNotifications(notificationsRes.data.notifications);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please refresh the page.");
      } finally {
        setIsLoadingCards(false);
        setIsLoadingNotifications(false);
        setIsPageLoaded(true);
      }
    };

    fetchData();
  }, []);
  const handleSignupNow=async ()=>{
    // console.log(phoneNo)
    // e.preventDefault()
    setIsVisibleForm(phoneNo);
    // try{
    //   const response = await axios.post("http://localhost:3000/api/v1/request",{
    //     phoneNo
    //   })
    //   if(response.data.success){
    //     toast.success('Request submitted successfully!');
    //   }
    //   setPhoneNo("")
    // }catch(err){
    //   toast.error("Error occured please try again later")
    // }
  }
  // Refresh AOS when content loads
  useEffect(() => {
    if (isPageLoaded) {
      const timeoutId = setTimeout(() => {
        AOS.refresh();
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [isPageLoaded]);

  

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (!isPageLoaded) {
    return <LoadingSpinner />;
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    // // Filter services immediately
    // setFilteredServices(
    //   services.filter((service) =>
    //     service.title.toLowerCase().includes(searchValue.toLowerCase())
    //   )
    // );
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Header />
<Toaster/>
      <main className="flex flex-col md:flex-row gap-6 z-20">
        <div className="w-full md:w-1/2 pt-10 md:pt-20 px-4 md:pl-16 lg:pl-20">
          <div className="w-full md:max-w-[554px] mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="./assets/play-button 1.svg"
                alt="Play Button"
                className="w-6 h-6"
                loading="lazy"
              />
              <p
                data-aos="fade-up"
                className="text-black text-lg font-medium text-center md:text-left"
                style={{ fontFamily: "Erode", fontSize: "18px" }}
              >
                Watch Video: Learn to use our platform
              </p>
            </div>

            <div data-aos="fade-up" className="mt-6">
              <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
                <VideoCard
                  width="100%"
                  videoSrc="https://res.cloudinary.com/diush63ly/video/upload/v1732811845/course_videos/ftx3m6weslqoknsmc8jo.mp4"
                  autoPlayOnLoad={true}
                  // descriptionHeading={}
                  // description={item.description}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-full md:w-1/2 bg-[#E9FFE9] p-6 md:pr-16 lg:pr-20 flex md:pl-16 lg:pl-20 pt-10 md:pt-20 flex-col justify-between"
          style={{ minHeight: "calc(100vh - 200px)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="./assets/play-button 1.svg"
                alt="Play Button"
                className="w-6 h-6"
                loading="lazy"
              />
              <span
                data-aos="fade-up"
                className="text-black text-xl font-medium"
                style={{ fontFamily: "Erode", fontSize: "18px" }}
              >
                Latest Update
              </span>
            </div>

            <div className="mt-4 md:mt-6">
              <ul
                data-aos="fade-up"
                className="list-disc pl-5 text-lg text-black font-light space-y-4"
              >
                {isLoadingNotifications
                  ? Array(3)
                      .fill(null)
                      .map((_, index) => (
                        <li
                          className="mb-4 h-5 bg-gray-200 animate-pulse rounded-md"
                          key={index}
                        />
                      ))
                  : notifications.map((notification) => (
                      <li key={notification._id} className="mb-4">
                        {notification.title}
                      </li>
                    ))}
              </ul>
            </div>

            <div className="mt-6">
              <Link to="/update">
                <button
                  data-aos="fade-up"
                  className="bg-[#253483] text-white text-sm md:text-base font-medium rounded-md w-48 h-12 px-6 py-3 hover:bg-[#1e2c6b] transition"
                >
                  Check Updates
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section
        id="GstService"
        className="bg-[#DDE2FF] pt-[57px] pb-[80px] px-[10px] md:px-[111px] h-auto"
      >
        <div className="w-full md:w-[833px] h-[90px] mx-auto">
          <h2
            data-aos="fade-up"
            className="font-[500] text-center text-[30px] leading-[45px] tracking-[-0.03em] font-[Erode] text-black"
          >
            FACTO: Your partner for E-Tax filing
          </h2>
          <p
            data-aos="fade-up"
            className="font-[400] text-center font-[erode] text-[18px] leading-[28px] tracking-[0.02em] text-black mt-[10px] mb-[30px]"
          >
            Facto is your ideal partner for assisted Tax E-Filing as we offer
            Services like
          </p>
        </div>

        <div className="mt-[19px] md:mt-20 sm:mt-20 flex justify-center">
          <div
            className="items-center bg-white rounded-full px-4 py-1 w-full md:w-[429px] h-[43px] hidden sm:flex"
            style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
          >
            <Search size={20} className="text-gray-500" />
            <Input
              type="text"
              placeholder="Search"
              className="flex-1 text-base placeholder:text-gray-500 border-none"
              style={{ height: "40px", fontSize: "16px" }}
              value={searchText}
            onChange={handleSearchChange}
            />
            <button
              className="ml-3 bg-[#253483] text-white rounded-full w-[70.88px] h-[27.77px] text-sm"
              style={{ fontWeight: 500, fontFamily: "Lora, serif" }}
            >
              Search
            </button>
          </div>
        </div>

        <div className="pt-[60px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[30px] md:gap-[40px] lg:gap-[50px] justify-center">
            {isLoadingCards
              ? Array.from({ length: 3 }).map((_, index) => (
                  <GSTServiceCardSkeleton key={index} />
                ))
              : filteredServices.map((service, index) => (
                  // <div
                  //   key={service._id}
                  //   data-aos="fade-up"
                  //   data-aos-delay={`${index * 100}`}
                  // >
                    <GSTServiceCard
                    key={index}
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      _id={service._id}
                    />
                  // </div>
                ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center mx-[auto] mt-[50px]">
        <Phone />
      </div>

      <section className="h-auto bg-[#E9FFE9] py-[78px] px-[10px] md:px-[108px]">
        <div className="flex flex-col md:flex-row justify-center items-center gap-[20px]">
          <img
            data-aos="fade-up"
            src={Logo}
            alt="Facto Logo"
            className="w-[120px] h-[60px] md:w-[141px] md:h-[75px]"
            loading="lazy"
          />
          <h3
            data-aos="fade-up"
            className="font-[poppins] font-[500] text-[24px] md:text-[28px] text-center md:text-left pl-[0] md:pl-[20px]"
          >
            Simplify your tax life with our comprehensive services
          </h3>
        </div>

        <div className="mt-[20px] pt-[120px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-[20px] lg:gap-x-[40px] gap-y-[20px] lg:gap-y-[40px] mt-auto lg:ml-[90px] mb-auto font-[inter]">
            {[
              {
                heading: "Timely E-filing for Prompt Refunds",
                description:
                  "Timely e-filing expedites verification, ensuring prompt refunds.",
              },
              {
                heading: "Penalty-Free Tax Filing",
                description:
                  "Stay clear of penalties by filing your taxes accurately and on time.",
              },
              {
                heading: "Defective Return Notice Prevention",
                description:
                  "Avoid receiving a Defective Return Notice through accurate tax filing.",
              },
              {
                heading: "Escape the Last-Minute Filing Rush",
                description:
                  "Say goodbye to the commotion of the last-minute tax filing rush.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-center"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <VideoCard
                  width="100%"
                  videoSrc="https://res.cloudinary.com/diush63ly/video/upload/v1732811845/course_videos/ftx3m6weslqoknsmc8jo.mp4"
                  descriptionHeading={item.heading}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[32px] flex justify-center gap-[24px] flex-col md:flex-row items-center">
          <Input
            value={phoneNo}
            onChange={(e:any)=>{if(isNaN(Number(e.target.value))){
              toast.error("Fill appropriate number")
            }else if(e.target.value.length>10){
              toast.error("Number cant exceed 10 digits")
              
            }else{
              setPhoneNo(e.target.value)}}
            }
            type="text"
            placeholder="Enter your Phone number"
            className="w-[280px] h-[49px] md:w-[321px] text-black"
            style={{
              padding: "0 16px",
              boxShadow: "0px 0.94px 6.57px 0px #00000040",
            }}
          />
          <button
            onClick={handleSignupNow}
            data-aos="fade-up"
            className="bg-secondary text-white font-[poppins] font-[300] text-[14px] md:text-[16px] rounded-[7.17px] w-[267px] h-[48.51px] flex items-center justify-center"
          >
            Signup now and Get started!
          </button>
        </div>
      </section>

      <section className="py-10 pt-[110px] pb-[170px]">
        <div className="container mx-auto flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <div data-aos="fade-up">
              <img
                src={Factoo}
                alt="Facto Banner"
                className="w-full max-w-[400px] md:max-w-[1000px] h-auto cursor-pointer"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
