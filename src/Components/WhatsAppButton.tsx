import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "+1234567890"; // Replace with WhatsApp number

  return (
    <>
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
      style={{ width: "50px", height: "50px" }}
    >
      <FaWhatsapp size={24} />
    </a>
    </>
  );
};

export default WhatsAppButton;
