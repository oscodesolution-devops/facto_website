import HeroSection from '../Components/HeroSection'; 
import StartFilling from '@/Components/StartFilling';  
import Phone from '@/Components/Phone';  
import Footer from '@/Components/Footer';
import Navbar from '../Components/Navbar';
import { useEffect } from "react";


const ServicesPage = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component is mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection /> 
      <StartFilling />
      <div className="bg-[#DDE2FF]">
      <Phone /> 
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
