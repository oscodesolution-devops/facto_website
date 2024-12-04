import PhoneNum from "./PhoneNum";
import VideoCard from "./VideoCard";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';


const StartFilling = () => {
  useEffect(() => {
    AOS.init({
      duration: 700, 
    });
  }, []);


  return (
<div className="px-6 md:px-[50px] lg:px-[99px] pt-[50px] lg:pt-[103px] pb-[60px] lg:pb-[110px]">
  <div className="flex flex-col lg:flex-row gap-[30px]">
    <div className="w-full lg:w-[547px] flex flex-col justify-center mt-auto mb-auto">
      <h2   
        data-aos="fade-up" 
        className="font-[poppins] text-[24px] lg:text-[40px] font-semibold leading-[30px] lg:leading-[48.48px] text-left">
        Discover Why Early <span className="text-secondary">E-Filing ITR Filing</span> is a Smart Move!
      </h2>
      <p 
        data-aos="fade-up" 
        className="font-[poppins] text-[14px] lg:text-[16px] font-[300] leading-[22px] lg:leading-[25.6px] tracking-[-0.02em] text-left mt-[16px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation.
      </p>
      <div data-aos="fade-up">
        <PhoneNum />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-[20px] lg:gap-x-[40px] gap-y-[20px] lg:gap-y-[40px] mt-auto lg:ml-[90px] mb-auto font-[inter]">
  <div data-aos="fade-up" className="w-full xl:w-[300px] sm:w-[100%] md:w-[100%]">
    <VideoCard
      width="100%" 
      videoSrc="/assets/bulb.mp4"
      descriptionHeading="Timely E-filing for Prompt Refunds"
      description="Timely e-filing expedites verification, ensuring prompt refunds."
    />
  </div>

  <div data-aos="fade-up" className="w-full xl:w-[300px] sm:w-[100%] md:w-[100%]">
    <VideoCard
      width="100%" 
      videoSrc="/assets/bulb.mp4"
      descriptionHeading="Penalty-Free Tax Filing"
      description="Stay clear of penalties by filing your taxes accurately and on time, go for it."
    />
  </div>

  <div data-aos="fade-up" className="w-full xl:w-[300px] sm:w-[100%] md:w-[100%]">
    <VideoCard
      width="100%"
      videoSrc="/assets/bulb.mp4"
      descriptionHeading="Defective Return Notice Prevention"
      description="Avoid receiving a Defective Return Notice through accurate tax filing."
    />
  </div>

  <div data-aos="fade-up" className="w-full xl:w-[300px] sm:w-[100%] md:w-[100%]">
    <VideoCard
      width="100%" 
      videoSrc="/assets/bulb.mp4"
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
