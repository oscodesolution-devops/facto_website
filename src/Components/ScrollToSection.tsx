import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToSection: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash; 
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return null; 
};

export default ScrollToSection;
