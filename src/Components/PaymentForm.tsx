import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";
import { useNavigate } from "react-router-dom";

interface PaymentFormProps {
  amount: number;
  subServiceId?: string;
  itemType: string;
  selectedFeatures?: string[]
}

const PaymentForm = ({ amount, subServiceId, itemType,selectedFeatures }: PaymentFormProps) => {
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const handlePayment = async () => {
    const res = await initializeRazorpay();
    // const {user}= useGlobalContext();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      console.log(itemType);
      // Make API call to the serverless API
      const { data } = await axios.post(
        "https://facto.org.in/api/v1/payment/initiate-payment", 
        { 
          userId: user?.user?._id,
          items: [
            {
              itemType:itemType,
              itemId: subServiceId || "675810412035dc3e92f0b32f",
              price: amount
            }
          ],
          
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        }
      );

      console.log(data);

      var options = {
        key: "rzp_test_pEX0h7c2X09wK0",
        amount: data.data.amount,
        currency: data.data.currency,
        name: "Facto",
        description: "Service Payment",
        image: "https://example.com/your_logo",
        order_id: data.data.orderId,
        handler: async function (response:any) {
          try {
            console.log(selectedFeatures);
            // Validate payment at server
            const verificationResponse = await axios.post(
              "https://facto.org.in/api/v1/payment/verify-payment", 
              {...response.body,selectedFeatures}
            );

            // On successful verification, show success dialog
            if (verificationResponse.data.success) {
              alert("Payment Successful!");
              if(itemType=='service')
              window.location.href = `/upload-page?serviceId=${subServiceId}`
            else{
              navigate("/courses")
            }
              // Optionally navigate to next page or show success message
            } else {
              alert("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user?.user?.fullName || "John Doe",
          email: user?.user?.email || "johndoe@example.com",
          contact: user?.user?.phoneNumber || "9999999999",
        },
        notes: {
          subServiceId: subServiceId || "default",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div>
      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        onClick={handlePayment}
      >
        Confirm Payment of Rs {amount}
      </Button>
    </div>
  );
};

export default PaymentForm;