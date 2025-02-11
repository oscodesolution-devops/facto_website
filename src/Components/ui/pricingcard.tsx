import { useState } from "react"
import PricingDialog from "./pricing-dialog"

interface Option {
  name: string;
  priceModifier: number;
  needsQuotation: boolean;
}

interface Request {
  name: string;
  needsQuotation: boolean;
  priceModifier: number;
  _id: string;
  inputType: "dropdown" | "checkbox";
  isMultipleSelect?: boolean;
  options?: Option[];
}

export default function PricingCard({
  title = "GSTR-1 & 3B Monthly",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  features = [
    "Capital gains",
    "More than one house property",
    "Foreign Income/Foreign Asset"
  ],
  requests=[],
  buttonText = "GET QUOTATION",
  startingText = "Starting from",
  price = "1001",
  currency = "Rs",
  serviceId = ""
}: {
  title?: string
  description?: string
  features?: string[]
  requests?: Request[]
  buttonText?: string
  startingText?: string
  price?: string
  currency?: string
  period?: string
  serviceId?: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <div className="sm:col-span-2 text-left mt-4 flex gap-4 items-center">
          <span className="block text-lg text-muted-foreground">{startingText}</span>
          <div>
            <span className="font-bold text-red-500 text-3xl">
              {currency}. {price}
            </span>
            {/* <span className="text-sm text-muted-foreground">{period}</span> */}
          </div>
        </div>
      <p className="mt-2 text-sm text-muted-foreground font-poppins text-[#4A4A4A]">{description}</p>
      
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="w-full rounded-md bg-[#1F2B6C] px-4 py-2 text-sm font-medium text-white hover:bg-[#1F2B6C]/90 transition-colors"
        >
          {buttonText}
        </button>
        <button 
          onClick={() => window.location.href = `/upload-page?serviceId=${serviceId}`}
          className="w-full rounded-md bg-[#1F2B6C] px-4 py-2 text-sm font-medium text-white hover:bg-[#1F2B6C]/90 transition-colors"
        >
          Documents
        </button>
        
      </div>

      {isDialogOpen && (
        <PricingDialog
          title={title}
          basePrice={Number(price)}
          currency={currency}
          
          requests={requests}
          subServiceId={serviceId} 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  )
}