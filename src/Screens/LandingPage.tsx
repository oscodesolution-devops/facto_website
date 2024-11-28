import Navbar from "../Components/Navbar"; 
import Header from "@/Components/Header"; 
import { Search } from "lucide-react"; 
import { Input } from "@/Components/ui/input"; 
import playButton from "../assets/play-button 1.svg"; 
import { Link } from "react-router-dom";  
import GSTServiceCard from "@/Components/ui/detailcard"; 
import Phone from "@/Components/Phone"; 
import Logo from "../assets/logo.svg";
import VideoCard from "@/Components/VideoCard";
import Footer from "@/Components/Footer";
import Factoo from "../assets/Factoo.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, 
    });
  }, []);
  return (
<div>
      <Navbar />
      <div >
      <Header />
      </div>

      <main className="flex flex-col md:flex-row gap-[5%] z-20 overflow-hidden">
  {/* Left Section */}
  <div className="w-full md:w-[50%] pt-[100px] pl-[10px] md:pl-[66px]">
    <div className="w-full md:w-[554px]">
      <div className="flex items-center gap-4">
        <img
          src="./assets/play-button 1.svg"
          alt="Play Button"
          className="w-[25px] h-[25px]"
        />
        <p data-aos="fade-up"
           className="text-black text-lg font-[500] font-[erode] text-center md:text-left"
           style={{ fontFamily: "Erode", fontSize: "18px" }}
        >
          Watch Video: Learn to use our platform
        </p>
      </div>

      <div data-aos="fade-up" className="mt-[23px]">
        <video className="w-full md:w-[552px] h-auto" controls autoPlay loop>
          <source src="/assets/bulb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full md:w-[855px] bg-[#E9FFE9] p-[20px] flex flex-col justify-between"
       style={{ height: "calc(100vh - 100px)" }}
  >
    <div>
      <div className="flex items-center gap-[12px] pt-[100px] pl-[20px] md:pl-[55px]">
        <img
          src={playButton}
          alt="Play Button"
          className="w-[25px] h-[25px]"
        />
        <span data-aos="fade-up"
              className="text-black text-xl font-medium font-[erode] text-center md:text-left"
              style={{ fontFamily: "Erode", fontSize: "18px" }}
        >
          Latest Update
        </span>
      </div>

      <div className="mt-[30px] pl-[20px] pr-[20px] md:pl-[52px] md:pr-[80px]">
        <ul data-aos="fade-up" className="list-disc pl-5 text-lg text-black text-[19px] font-[poppins] font-[300]">
          <li className="mb-[18px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li className="mb-[18px]">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li className="mb-[18px]">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          <li className="mb-[18px]">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</li>
        </ul>
      </div>

      <div className="mt-[30px] pl-[20px] md:pl-[52px]">
        <Link to="/update">
          <button data-aos="fade-up" className="bg-[#253483] text-white font-[poppins] font-medium text-[16px] rounded-[7.17px] w-[188px] h-[48px] px-[20px] py-[10px]">
            Check Updates
          </button>
        </Link>
      </div>
    </div>
  </div>
</main>


<section id="GstService" className="bg-[#DDE2FF] pt-[57px] pb-[80px] px-[10px] md:px-[111px] h-auto overflow-hidden">
  <div className="w-full md:w-[833px] h-[90px] mx-auto">
    <h2 className="font-[500] text-center text-[30px] leading-[45px] tracking-[-0.03em] font-[Erode] text-black">
      FACTO: Your partner for E-Tax filing
    </h2>
    <p className="font-[400] text-center font-[erode] text-[18px] leading-[28px] tracking-[0.02em] text-black mt-[10px] mb-[30px]">
      Facto is your ideal partner for assisted Tax E-Filing as we offer
      Services like
    </p>
  </div>

  <div className="mt-[19px] md:mt-20 sm:mt-20 flex justify-center">
    <div className="items-center bg-white rounded-full px-4 py-1 w-full md:w-[429px] h-[43px] hidden sm:flex" style={{ boxShadow: "0px 0.94px 6.57px 0px #00000040" }}>
      <div className="mr-3">
        <Search size={20} className="text-gray-500" />
      </div>
      <Input  
        type="text"
        placeholder="Search"
        className="flex-1 text-base placeholder:text-gray-500 border-none"
        style={{ height: "40px", fontSize: "16px" }}
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

</section>



      <div className="flex justify-center mt-[50px]">
        <Phone />
      </div>

      <section className="h-auto bg-[#E9FFE9] py-[78px] px-[10px] md:px-[208px] overflow-hidden">
  <div className="flex flex-col md:flex-row justify-center items-center gap-[20px]">
    <img data-aos="fade-up" src={Logo} alt="Facto Logo" className="w-[120px] h-[60px] md:w-[141px] md:h-[75px]" />
    <h3 data-aos="fade-up" className="font-[poppins] font-[500] text-[24px] md:text-[28px] text-center md:text-left pl-[0] md:pl-[20px]">
      Simplify your tax life with our comprehensive services
    </h3>
  </div>

  <div>
    <p data-aos="fade-up" className="flex justify-center text-primary font-[poppins] font-[600] text-[16px] md:text-[20px]">
      Your ideal partner for assisted Tax E-Filing as we offer
    </p>
  </div>

  <div>
  <div data-aos="fade-up" className="grid grid-cols-1 gap-[15px] mt-[20px] md:gap-[30px] md:ml-0 pt-[120px]">
  <VideoCard width="380px" videoSrc="/assets/bulb.mp4" descriptionHeading="Timely E-filing for Prompt Refunds" description="Timely e-filing expedites verification, ensuring prompt refunds." />
  <VideoCard width="380px" videoSrc="/assets/bulb.mp4" descriptionHeading="Penalty-Free Tax Filing" description="Stay clear of penalties by filing your taxes accurately and on time." />
  <VideoCard width="380px" videoSrc="/assets/bulb.mp4" descriptionHeading="Defective Return Notice Prevention" description="Avoid receiving a Defective Return Notice through accurate tax filing." />
  <VideoCard width="380px" videoSrc="/assets/bulb.mp4" descriptionHeading="Escape the Last-Minute Filing Rush" description="Say goodbye to the commotion of the last-minute tax filing rush." />
</div>

  </div>

  <div>
    <h3 data-aos="fade-up" className="flex justify-center font-[poppins] font-[600] text-[18px] md:text-[20px] pt-[50px]">
      Take control of your taxes today and experience the convenience of E-Tax filing with TaxBuddy.
    </h3>
  </div>

  <div data-aos="fade-up" className="mt-[32px] flex justify-center gap-[24px] flex-col md:flex-row items-center">
    <Input
      type="text"
      placeholder="Enter your Phone number"
      className="w-[280px] h-[49px] md:w-[321px] text-black"
      style={{ padding: "0 16px", boxShadow: "0px 0.94px 6.57px 0px #00000040" }}
    />
    <button data-aos="fade-up" className="bg-secondary text-white font-[poppins] font-[300] text-[14px] md:text-[16px] rounded-[7.17px] w-[267px] h-[48.51px] flex items-center justify-center">
      Signup now and Get started!
    </button>
  </div>
</section>

            <section className="py-10 pt-[110px] pb-[170px] overflow-hidden">
  <div className="container mx-auto flex justify-center gap-8">
    <div className="flex flex-col items-center">
      <div data-aos="fade-up">
        <img 
          src={Factoo} 
          alt="Phone Button" 
          className="w-full max-w-[400px] md:max-w-[1000px] h-auto cursor-pointer"
        />
      </div>
    </div> 
  </div>
</section>


    <div data-aos="fade-up">
      <Footer />
    </div>

    </div>


  );
};

export default LandingPage;
