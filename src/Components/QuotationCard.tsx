import React from "react"
import { FileText, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { useNavigate } from "react-router-dom";

interface QuotationCardProps {
  title: string;
  price: number;
  currency: string;
  selectedFeatures: string[];
  subServiceId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function QuotationCard({
  title,
  price,
  currency,
  selectedFeatures,
  subServiceId,
  status,
  createdAt
}: QuotationCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };
  const navigate = useNavigate();

  const handlePayment = ()=>{
    navigate("/payment", { 
        state: { 
          title,
          subServiceId,
          finalPrice: price,
          selectedFeatures,
          itemType: "service"
        } 
      });
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-[#3b4ba7]" />
            <CardTitle>{title}</CardTitle>
          </div>
          <span className={`text-sm font-medium ${getStatusColor(status)} capitalize`}>{status}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">Quotation ID: {subServiceId.slice(-6)}</span>
          <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
        </div>
        <div className="text-2xl font-bold mb-4">
          {price&&currency}{price}
        </div>
        <div className="mb-2">
          <span className="text-sm font-medium">Selected Features:</span>
          {isExpanded ? (
            <ul className="list-disc list-inside mt-2">
              {selectedFeatures.map((feature, index) => (
                <li key={index} className="text-sm">{feature}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">{selectedFeatures.length} features selected</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-2"
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-[#3b4ba7] hover:bg-[#2d3a8c]" disabled={status !== 'approved'} onClick={handlePayment}>
          {status === 'approved' ? 'Proceed to Payment' : 'Awaiting Approval'}
        </Button>
      </CardFooter>
    </Card>
  )
}

