import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import Services from "./Screens/Services";
// import LoginPage from "./Screens/Login";
import UserDetails from "./Screens/UserDetails";
import Pricing from "./Screens/Pricing";
import Update from "./Screens/Update";
import UpdateDetails from "./Screens/UpdateDetails";
import Courses from "./Screens/Courses";
import CoursesBuy from "./Screens/CoursesBuy"; 
import Contact from "./Screens/Contact";
import ActivePlans from "./Screens/ActivePlans";
import Profile from "./Screens/Profile";
import Payment from "./Screens/Payment";
import UploadPage from "./Screens/Documents";
import GlobalProvider from "@/context/GlobalContext";
import WhatsAppButton from "./Components/WhatsAppButton";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TermsAndConditions from "@/Screens/TermsAndCondition";
import PrivacyPolicy from "@/Screens/PrivacyPolicy";
import RefundPolicy from "@/Screens/RefundPolicy";

const ScrollToTop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { 
    window.scrollTo(0, 0);
  }, [location]);
  
  useEffect(()=>{
    console.log(location.pathname)
  },[navigate])

  return null; // This component does not render anything
};


const App: React.FC = () => {
  return (

    <Router>
      <ScrollToTop/>
          <GlobalProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/update" element={<Update />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/update-details" element={<UpdateDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses-buy/:courseId" element={<CoursesBuy />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/active-plans" element={<ActivePlans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/upload-page" element={<UploadPage />} />
        <Route path="/termsncondition" element={<TermsAndConditions/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/refundpolicy" element={<RefundPolicy/>}/>
      </Routes>
      <WhatsAppButton />
      </GlobalProvider>
    </Router>

  );
}

export default App;
