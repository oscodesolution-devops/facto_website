// import { useState } from "react";
import Navbar from "@/Components/Navbar";
import ProfileCard from "@/Components/ui/profile-card";
import TaxCard from "@/Components/ui/sub-card";
import { getActiveCards } from "@/utils/cardData"; 

const Profile = () => {
  // const dummyData = {
  //   name: "Somesh Patel",
  //   email: "Somesh2732@gmail.com",
  //   phone: "9123456789",
  //   aadhar: "123456789012",
  //   pan: "ABCDE1234F",
  //   dob: new Date("1990-01-01"),
  //   gender: "male",
  //   address: {
  //     houseNumber: "123",
  //     street: "Main Street",
  //     city: "Mumbai",
  //     state: "maharashtra",
  //     pincode: "400001",
  //   },
  //   gst: "22AAAAA0000A1Z5",
  //   avatar: "/assets/user.png",
  // };

  // const [isEditing, setIsEditing] = useState(false);
  const activeCards = getActiveCards(); 

  return (
    <div>
      <Navbar />
      <div className="bg-[#DDE2FF]">
        <div className="flex justify-center py-10">
          <ProfileCard
            // dummyData={dummyData}
            // isEditing={isEditing}
            // setIsEditing={setIsEditing}
          />
        </div>
        <div className="px-4 sm:px-[130px] py-[60px]">
  <div className="bg-white w-full sm:w-[371px] h-[50px] font-[poppins] font-[500] text-[#3AB54A] pt-[13px] px-[10px]">
    Active Services
  </div>
  <div className="w-full sm:w-[1300px] pt-[20px] flex flex-col gap-[15px]">
    {activeCards.map((card, index) => (
      <TaxCard
        key={index}
        title={card.title}
        checkedItems={card.checkedItems}
        showRevalidateButton={card.showRevalidateButton}
        amount={card.amount}
        dueDate={card.dueDate}
        cardNumber={card.cardNumber}
        cardExpiry={card.cardExpiry}
        onViewDetails={() =>
          alert(`Viewing details for ${card.title}...`)
        }
        onRevalidate={() =>
          alert(`Revalidating ${card.title}...`)
        }
      />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default Profile;
