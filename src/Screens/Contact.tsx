import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import Navbar from "@/Components/Navbar";
import Phone from "@/Components/Phone";
import Footer from "@/Components/Footer";
import ComponentCard from "@/Components/ui/contact-card"; 
import AOS from 'aos';
import anuj from "../assets/Anuj.png"
// import dolly from "../assets/dolly.png"
import himanshu from "../assets/Himanshu.png"
import jagdish from "../assets/Jagdish.png"
import 'aos/dist/aos.css';

const Contact = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    query: ''
  });

  // State for form submission loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
    });
  }, []);

  // Handle input changes
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // console.log("heelo")
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phoneNo || !formData.query) {
      toast.error('Please fill in all fields');
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        query: ''
      })
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        query: ''
      })
      return;
    }

    // Phone number validation (basic check for 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNo)) {
      toast.error('Please enter a valid 10-digit phone number');
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        query: ''
      })
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/query', formData);
      if(response.data.success){
        toast.success('Query submitted successfully!');
      }
      // Success handling
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        query: ''
      });
    } catch (error:any) {
      // Error handling
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit query. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <div>
        <Navbar />
      </div>
      <Toaster/>
      <div className="pt-[60px]">
        <div data-aos="fade-up" className="flex justify-center font-[poppins] font-[300] text-[16px]">
          OUR TEAM
        </div>
        <div data-aos="fade-up" className="flex justify-center font-[poppins] font-[500] text-[35px]">
          Meet Our Facto Team
        </div>
      </div>

      {/* Team Cards Section - Unchanged */}
      <div data-aos="fade-up" className="font-[poppins] font-[500] flex pt-[40px] pb-[88px] gap-8 flex-wrap justify-center sm:gap-4 overflow-hidden">
        <ComponentCard
          name="JAGDISH CHUTANI"
          title="CEO"
          description="Chief Executive Officer"
          imageUrl={jagdish}
          facebookUrl="#"
          instagramUrl="#"
          twitterUrl="#"
        />
        <ComponentCard
          name="HIMANSHU CHUTANI"
          title="COO"
          description="Chief Operating Officer"
          imageUrl={himanshu}
          facebookUrl="#"
          instagramUrl="#"
          twitterUrl="#"
        />
        {/* <ComponentCard
          name="DOLLY CHUTANI"
          title="CMO"
          description="Chief Marketing Officer"
          imageUrl={dolly}
          facebookUrl="#"
          instagramUrl="#"
          twitterUrl="#"
        /> */}
        <ComponentCard
          name="ANUJ CHUTANI"
          title="CFO"
          description="Chief Financial Officer"
          imageUrl={anuj}
          facebookUrl="#"
          instagramUrl="#"
          twitterUrl="#"
        />
      </div>

      {/* About Us Section - Unchanged */}
      <div className="px-4 sm:px-8 md:px-16 lg:pl-[63px] overflow-hidden">
        <div 
          data-aos="fade-up" 
          className="font-[poppins] text-primary font-[600] text-center sm:text-left"
        >
          About Us
        </div>
        <div 
          data-aos="fade-up" 
          className="w-full sm:w-full md:w-full pt-[20px] font-[poppins] font-[300] text-center sm:text-left"
        >
           FACTO - WE ARE HERE TO ASSIST IN ALL TAX FILING, REGISTRATION AND UPDATES
Your trusted partner for all things like GST and tax filing. We simplify the complex world of taxation by offering user-friendly tools and expert support to ensure accurate and timely filing. Whether you are an individual, small business, or enterprise, we help you navigate GST compliance, income tax returns, and other tax-related services with ease. Our mission is to make tax filing hassle-free, transparent, and efficient, so you can focus on what matters most—growing your business. Join thousands of satisfied users and experience seamless, reliable tax solutions today!
We also provide regular updates on tax, finance, and related topics to keep you informed and ahead of the curve. Our expert team ensures you receive timely, accurate information on changes in tax laws, regulations, and financial trends, helping you make well-informed decisions</div>
        <div className="font-[poppins] font-[300] pt-[30px] pb-[100px] text-center sm:text-left">
          <span data-aos="fade-up" className="font-[500]">Address:</span> G-105 second floor, Arya samaj road, Uttam nagar, New Delhi, 110059
        </div>
      </div>

      {/* Contact Info Section - Unchanged */}
      <div 
        className="bg-[#E9FFE9] px-4 sm:px-8 md:px-16 lg:px-[64px] w-full sm:w-full md:w-[90%] lg:w-[80%] ml-0 sm:ml-[20px] md:ml-[60px] lg:ml-[80px] pt-[30px] pb-[30px] flex flex-col lg:flex-row items-center lg:items-start overflow-hidden"
      >
        <img 
          src="./assets/24hours.svg" 
          alt="phonelogo" 
          className="mb-4 lg:mb-0 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[100px] lg:mr-8" 
        />
        <div className="flex flex-col w-full">
          <div 
            data-aos="fade-up" 
            className="font-[poppins] font-[500] text-primary text-center lg:text-left"
          >
            "Have any questions or need assistance? Contact us today!"
          </div>
          <div 
            data-aos="fade-up" 
            className="flex flex-col sm:flex-row justify-center lg:justify-start mt-5 font-[poppins] font-[500] text-center lg:text-left"
          >
            <span className="font-[600]">Email ID:</span> 
            <span className="ml-2">Facto.m.consultancy@gmail.com</span>
            <span className="mx-2 sm:mx-4">OR</span>
            <span className="mr-2">Facto.consultancy@gmail.com</span>
          </div>
          <div 
            data-aos="fade-up" 
            className="flex justify-center lg:justify-start mt-5 font-[poppins] font-[500] text-center lg:text-left"
          >
            <span className="font-[600]">Phone Number:</span> 
            <span className="ml-2">+91 8877-577-977</span>
          </div>
        </div>
      </div>

      {/* Query Form Section - Updated with form submission logic */}
      <div
        data-aos="fade-up"
        className="pt-[40px] pl-4 sm:pl-8 md:pl-12 lg:pl-16 pr-4 font-[poppins] font-[500] text-primary overflow-hidden"
      >
        <div className="text-center sm:text-left">Ask your Question</div>
        <form 
          // onSubmit={handleSubmit}
          className="relative mt-4 border border-gray-300 rounded-md p-4 w-full max-w-[900px]"
        >
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
              required
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                name="email"
                placeholder="Your Contact Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full sm:w-[48%] border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                required
              />
              <input
                type="tel"
                name="phoneNo"
                placeholder="Your Phone Number"
                value={formData.phoneNo}
                onChange={handleInputChange}
                className="w-full sm:w-[48%] border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <textarea
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            data-aos="fade-up"
            className="w-full h-[120px] mt-4 border border-gray-300 rounded-md px-3 py-2 outline-none resize-none"
            placeholder="Type your question here..."
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            data-aos="fade-up"
            className={`absolute bottom-4 left-4 w-[188px] px-6 py-2 text-white rounded-md 
              ${isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:bg-blue-600'
              }`}
              onClick={handleSubmit}
          >
            {isSubmitting ? 'Submitting...' : 'Send'}
          </button>
        </form>
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