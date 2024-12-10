// "use client";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { Button } from "@/Components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
// import { Input } from "@/Components/ui/input";
// import { Label } from "@/Components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
// import { Separator } from "@/Components/ui/separator";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
// import { cn } from "@/lib/utils";

// // Assuming you have a way to track user authentication status
// import { useGlobalContext } from "@/context/GlobalContext"; // Or your authentication logic

// export default function Component({ className }: { amount?: number; className?: string }) {
//   const { isAuthenticated } = useGlobalContext (); // Fetching authentication status from context
//   const navigate = useNavigate();

//   // If not authenticated, redirect to login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login"); // Redirect to login page if not authenticated
//     }
//   }, [isAuthenticated, navigate]);

//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardName, setCardName] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [bank, setBank] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [showOtp, setShowOtp] = useState(false);
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const handleExpiryChange = (value: string) => {
//     const formatted = value.replace(/[^\d]/g, "").replace(/^(\d{2})/, "$1/").slice(0, 5);
//     setExpiry(formatted);
//   };

//   const handleCardNumberChange = (value: string) => {
//     const formatted = value.replace(/\s/g, "").match(/.{1,4}/g)?.join(" ").substr(0, 19) || "";
//     setCardNumber(formatted);
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       const nextInput = document.getElementById(`otp-${index + 1}`);
//       nextInput?.focus();
//     }
//   };

//   const handleCardSubmit = () => {
//     setShowOtp(true);
//   };

//   const handlePaymentSuccess = () => {
//     setPaymentSuccess(true);
//   };

//   const handleNext = () => {
//     navigate("/upload-page");
//   };

//   return (
//     <Card className={cn("w-[579px]", className)}>
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Payment</CardTitle>
//         <Separator className="mt-2" />
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div>
//           <Label className="text-base font-semibold mb-2 block">Pay With:</Label>
//           <RadioGroup
//             value={paymentMethod}
//             onValueChange={(value) => {
//               setPaymentMethod(value);
//               setShowOtp(false);
//             }}
//             className="flex flex-wrap gap-4"
//           >
//             {["Card", "Bank", "UPI", "Pay later"].map((method) => (
//               <div key={method.toLowerCase()} className="flex items-center space-x-2">
//                 <RadioGroupItem value={method.toLowerCase()} id={method.toLowerCase()} />
//                 <Label htmlFor={method.toLowerCase()}>{method}</Label>
//               </div>
//             ))}
//           </RadioGroup>
//         </div>

//         {showOtp ? (
//           <div className="space-y-6">
//             <p className="text-center font-medium">Enter your 4-digit card pin to confirm this payment</p>
//             <div className="flex justify-center space-x-4">
//               {otp.map((digit, index) => (
//                 <Input
//                   key={index}
//                   id={`otp-${index}`}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   className="w-12 h-12 text-center text-2xl"
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <>
//             {paymentMethod === "card" && (
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="cardName" className="text-sm font-medium">Name on card</Label>
//                   <Input
//                     id="cardName"
//                     placeholder="Name on card"
//                     value={cardName}
//                     onChange={(e) => setCardName(e.target.value)}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="cardNumber" className="text-sm font-medium">Card number</Label>
//                   <Input
//                     id="cardNumber"
//                     placeholder="1234 1234 1234 1234"
//                     value={cardNumber}
//                     onChange={(e) => handleCardNumberChange(e.target.value)}
//                     maxLength={19}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div className="flex space-x-4">
//                   <div className="flex-1">
//                     <Label htmlFor="expiry" className="text-sm font-medium">Expiry</Label>
//                     <Input
//                       id="expiry"
//                       placeholder="MM/YY"
//                       value={expiry}
//                       onChange={(e) => handleExpiryChange(e.target.value)}
//                       maxLength={5}
//                       className="mt-1"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
//                     <Input
//                       id="cvv"
//                       placeholder="CVV"
//                       value={cvv}
//                       onChange={(e) => setCvv(e.target.value)}
//                       maxLength={3}
//                       className="mt-1"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {paymentMethod === "bank" && (
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="bank" className="text-sm font-medium">Choose your bank</Label>
//                   <Select value={bank} onValueChange={setBank}>
//                     <SelectTrigger id="bank" className="mt-1">
//                       <SelectValue placeholder="Select bank" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="union">Union Bank of India</SelectItem>
//                       <SelectItem value="sbi">State Bank of India</SelectItem>
//                       <SelectItem value="icici">ICICI</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//                 <div>
//                   <Label htmlFor="accountNumber" className="text-sm font-medium">Enter Your Bank Account Number</Label>
//                   <Input
//                     id="accountNumber"
//                     placeholder="Enter 9-18 digit account number"
//                     value={accountNumber}
//                     onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
//                     maxLength={18}
//                     className="mt-1"
//                   />
//                 </div>
//               </div>
//             )}

//             {paymentMethod === "upi" && (
//               <div>
//                 <Label htmlFor="upiId" className="text-sm font-medium">Enter UPI ID</Label>
//                 <Input
//                   id="upiId"
//                   placeholder="example@upi"
//                   value={upiId}
//                   onChange={(e) => setUpiId(e.target.value)}
//                   className="mt-1"
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </CardContent>
//       <CardFooter>
//         {!showOtp ? (
//           <Button
//             className="w-full bg-green-500 hover:bg-green-600 text-white"
//             onClick={handleCardSubmit}
//           >
//             Confirm Payment
//           </Button>
//         ) : (
//           <Button
//             className="w-full bg-green-500 hover:bg-green-600 text-white"
//             onClick={handlePaymentSuccess}
//           >
//             Complete Payment
//           </Button>
//         )}
//       </CardFooter>

//       {paymentSuccess && (
//         <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
//           <DialogContent className="text-center">
//             <DialogHeader>
//               <DialogTitle>Done</DialogTitle>
//             </DialogHeader>
//             <p>You have successfully completed your payment. Now upload your required documents.</p>
//             <Button
//               className="mt-4 bg-green-500 hover:bg-green-600 text-white"
//               onClick={handleNext}
//             >
//               Next
//             </Button>
//           </DialogContent>
//         </Dialog>
//       )}
//     </Card>
//   );
// }
import { useEffect } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { useGlobalContext } from "@/context/GlobalContext";

const handlePaymentSuccess = () => {
  // Add your success handling logic here
  alert("Payment Successful!");
};

const PaymentForm = ({amount}:{amount:number}) => {
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
  const {user} = useGlobalContext()
  const handlePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Make API call to the serverless API
    const {data} = await axios.post("http://localhost:3000/api/v1/payment/initiate-payment", { userId:"6748c2170aed27ff33646a30",items:[
      {
        itemType: "service",
        itemId: "675810412035dc3e92f0b32f",
        price: 999
      }
    ]},{
      headers:{
        Authorization:`Bearer ${user?.token}`
      }
    }); // Adjust the amount as needed
    console.log(data);
    var options = {
      key: "rzp_test_pEX0h7c2X09wK0",
      amount: data.data.amount,
      currency: data.data.currency,
      name: "Facto",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.data.orderId,
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        const data = await axios.post("http://localhost:3000/api/v1/payment/verify-payment", response);

        // On successful verification, show success dialog
        if (data.success) {
          handlePaymentSuccess();
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <Button
        className="w-full bg-green-500 hover:bg-green-600 text-white"
        onClick={handlePayment}
      >
        Confirm Payment
      </Button>
    </div>
  );
};

export default PaymentForm;

