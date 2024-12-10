"use client"
import * as React from "react"
import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Checkbox } from "@/Components/ui/checkbox"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Dialog, DialogContent } from "@/Components/ui/dialog"
import { cn } from "@/lib/utils"
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from "@/context/GlobalContext"
import { Quotation } from "@/api"

// Updated interface to match the new request structure
interface Request {
  name: string;
  needsQuotation: boolean;
  priceModifier: number;
  _id: string;
}

interface PricingDialogProps {
  title: string;
  basePrice: number;
  currency: string;
  period: string;
  requests: Request[];
  isOpen: boolean;
  subServiceId:string;
  onClose: () => void;
}

export default function PricingDialog({
  title,
  basePrice,
  currency,
  period,
  requests,
  subServiceId,
  isOpen,
  onClose
}: PricingDialogProps) {
  // State to track checked requests and invoice details
  const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({});
  
  const [totalPrice, setTotalPrice] = React.useState(basePrice);

  const navigate = useNavigate();

  // Effect to calculate total price based on checked requests
  React.useEffect(() => {
    let calculatedPrice = basePrice;
    requests.forEach(request => {
      if (checkedItems[request._id]) {
        calculatedPrice += request.priceModifier;
      }
    });
    setTotalPrice(calculatedPrice);
  }, [checkedItems, basePrice, requests]);

  // Handle checkbox change
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  }

  // Handle plan activation
  const {user,isAuthenticated} = useGlobalContext();
  const handleActivatePlan = () => {
    try {
      console.log("hrellp")
      console.log("ddd",user);
      // Check if token exists in session storage
      
      
      if (!isAuthenticated) {
        // If no token, navigate to login
        navigate("/login");
        return;
      }
  
      // Retrieve user data from global context
      // console.log("User",data);
      // Check if user data exists
      if (!user) {
        // If no user data, potentially re-fetch user data or handle accordingly
        navigate("/login");
        return;
      }
  
      // Check profile completion 
      // Adjust these conditions based on your exact user model and required fields
      const isProfileComplete = user.user.aadharNumber && user.user.panNumber;
  
      if (!isProfileComplete) {
        // If profile is incomplete, navigate to profile page
        navigate("/profile", { 
          state: { 
            message: "Please complete your profile to proceed" 
          } 
        });
      } else {
        // If profile is complete, navigate to payment
        navigate("/payment");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error checking user status:", error);
      // navigate("/login");
    }
  };

  // Check if any request needs quotation
  const hasQuotationRequest = requests.some(request => 
    request.needsQuotation && checkedItems[request._id]
  );

  const handleGetQuotation=async()=>{
    try{
      const response = await Quotation.postQuotation({subServiceId,selectedFeature:requests.map(request => {
        if (checkedItems[request._id]){
         return request.name; 
        }})})
      console.log(response)
    }catch(error){
      console.log(error)

    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-[#3b4ba7]" />
                <CardTitle>{title}</CardTitle>
              </div>
              <span className="text-base mt-0">{period}</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <form>
              <div className="grid gap-2">
                {requests.map((request) => (
                  <div 
                    key={request._id} 
                    className={`flex items-center space-x-2 p-2 rounded ${checkedItems[request._id] ? 'bg-[#e8f5e9]' : ''}`}
                  >
                    <Checkbox 
                      id={request._id} 
                      checked={!!checkedItems[request._id]}
                      onCheckedChange={(checked) => handleCheckboxChange(request._id, checked === true)}
                      className={cn(
                        "h-4 w-4 border-[#3b4ba7] text-green-500 focus:ring-0 focus:ring-offset-0",
                        "checked:bg-green-500 checked:border-green-500 rounded-sm",
                        "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
                        "after:content-[''] after:block after:w-full after:h-full"
                      )}
                    />
                    <Label htmlFor={request._id}>
                      {request.name}
                      {request.needsQuotation && <span className="ml-2 text-red-500">(Quotation Needed)</span>}
                    </Label>
                  </div>
                ))}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-6">
            {!hasQuotationRequest ? (
            <Button className="bg-[#3b4ba7] hover:bg-[#2d3a8c]" onClick={handleActivatePlan}>
            Activate Plan
          </Button>  
            ):(
              <Button className="bg-[#3b4ba7] hover:bg-[#2d3a8c]" onClick={handleGetQuotation}>
              Request Quotation
            </Button>
            )}
            
            <div>
              {/* <span className="text-sm text-muted-foreground">Starting from</span> */}
              {!hasQuotationRequest &&
                <>
                  <span className="ml-1 text-2xl text-[red] font-bold">{currency}{totalPrice}</span>
                  <span className="text-sm text-muted-foreground">/Month</span>
                </>
              }
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}