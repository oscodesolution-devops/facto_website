import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Screens/LandingPage";
import Services from "./Screens/Services";
import LoginPage from "./Screens/Login";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/update" element={<Update />} />
        <Route path="/update-details" element={<UpdateDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses-buy/:courseId" element={<CoursesBuy />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/active-plans" element={<ActivePlans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/upload-page" element={<UploadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
