import Navbar from "@/Components/Navbar";
import Phone from "@/Components/Phone";
import Footer from "@/Components/Footer";
import ComponentCard from "@/Components/ui/contact-card"; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';



const Contact = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

   return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className="pt-[60px]">
            <div data-aos="fade-up" className="flex justify-center font-[poppins] font-[300] text-[16px]">
                OUR TEAM
            </div>
            <div data-aos="fade-up" className="flex justify-center font-[poppins] font-[500] text-[35px]">
                Meet Our Facto Team
            </div>
        </div>

        <div data-aos="fade-up" className="font-[poppins] font-[500] flex justify-center pt-[40px] pb-[88px] gap-8">
            <ComponentCard
                name="Dharmesh Soni"
                title="CEO"
                description="Dharmesh is the visionary leader behind the company."
                imageUrl="/assets/user.png"
                facebookUrl="#"
                instagramUrl="#"
                twitterUrl="#"
            />
            <ComponentCard
                name="Jisgnesh"
                title="CTO"
                description="Jihanesh leads the tech innovations at Facto."
                imageUrl="/assets/user.png"
                facebookUrl="#"
                instagramUrl="#"
                twitterUrl="#"
            />
            <ComponentCard
                name="Dhoom Machale"
                title="COO"
                description="Dhoom ensures smooth operations across the company."
                imageUrl="/assets/user.png"
                facebookUrl="#"
                instagramUrl="#"
                twitterUrl="#"
            />
        </div>

        <div className="pl-[63px]">
            <div data-aos="fade-up" className="font-[poppins] text-primary font-[600]">
                About US
            </div>
            <div data-aos="fade-up" className="w-[1312px] pt-[20px] font-[poppins] font-[300]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniamLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </div>
            <div className="font-[poppins] font-[300] pt-[30px] pb-[100px]">
                <span data-aos="fade-up" className="font-[500]">Address:</span> G-105 second floor , Arya samaj road uttam nagar ,  new Delhi ,110059
            </div>
        </div>

        <div className="bg-[#E9FFE9] px-[64px] w-[1315px] ml-[63px] pt-[30px] pb-[30px] flex items-center">
            <img src="./assets/24hours.svg" alt="phonelogo" className="mr-8" />
            <div className="flex flex-col">
                <div data-aos="fade-up"  className="font-[poppins] font-[500] text-primary">
                    "Have any questions or need assistance? Contact us today!"
                </div>
                <div data-aos="fade-up" className="flex justify-start mt-5 font-[poppins] font-[500]">
                    <span className="font-[600]">Email ID:</span> 
                    <span className="ml-2">Facto.m.consultancy@gmail.com</span>
                    <span className="mx-2">OR</span>
                    <span className="mr-2">Facto.consultancy@gmail.com</span>
                </div>
                <div data-aos="fade-up" className="flex justify-start mt-5 font-[poppins] font-[500]">
                    <span className="font-[600]">Phone Number:</span> 
                    <span className="ml-2">+91 9319392929</span>
                </div>
            </div>
        </div>

        <div data-aos="fade-up" className="pt-[40px] pl-[63px] font-[poppins] font-[500] text-primary">
            <div>Ask your Question</div>
            <div className="relative mt-4 border border-gray-300 rounded-md p-4 w-[769px] h-[158px]">
                <textarea data-aos="fade-up"
                    className="w-full h-full p-0 border-0 outline-none"
                    placeholder="Type here.."
                ></textarea>
                <button data-aos="fade-up" className="absolute bottom-4 w-[188px] ml-[520px] left-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600">
                    Send
                </button>
            </div>
        </div>

        <div className="bg-[#DDE2FF] mt-[50px]">
            <Phone />
        </div>
        <div>
            <Footer />
        </div>
    </div>
   );
}

export default Contact;
