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
    <div className="px-[99px] pt-[103px] pb-[110px] pr-[85px]">
      <div className="flex gap-[30px]">
        <div className="w-[547px] flex flex-col justify-center mt-auto mb-auto">
          <h2 data-aos="fade-up" className="font-[poppins] text-[40px] font-semibold leading-[48.48px] text-left">
            Discover Why Early <span className="text-secondary">E-Filing ITR Filing</span> is a Smart Move!
          </h2>
          <p data-aos="fade-up" className="font-[poppins] text-[16px] font-[300] leading-[25.6px] tracking-[-0.02em] text-left mt-[16px]">
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

        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px] mt-auto ml-[90px] mb-auto font-[inter]">
          <div data-aos="fade-up">
            <VideoCard
              width="300px" 
              videoSrc="/assets/bulb.mp4"
              descriptionHeading="Timely E-filing for Prompt Refunds"
              description="Timely e-filing expedites verification, ensuring prompt refunds."
            />
          </div>
          <div data-aos="fade-up">
            <VideoCard
              width="300px" 
              videoSrc="/assets/bulb.mp4"
              descriptionHeading="Penalty-Free Tax Filing"
              description="Stay clear of penalties by filing your taxes accurately and on time, go for it."
            />
          </div>
          <div data-aos="fade-up">
            <VideoCard
              width="300px" 
              videoSrc="/assets/bulb.mp4"
              descriptionHeading="Defective Return Notice Prevention"
              description="Avoid receiving a Defective Return Notice through accurate tax filing."
            />
          </div>
          <div data-aos="fade-up">
            <VideoCard
              width="300px" 
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
