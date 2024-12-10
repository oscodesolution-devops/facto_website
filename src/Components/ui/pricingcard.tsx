import { useState } from "react"
import PricingDialog from "./pricing-dialog"
interface Request {
  name: string;
  needsQuotation: boolean;
  priceModifier: number;
  _id: string;
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
  period = "/Month",
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
    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-[0px_7.36px_7.36px_-3.68px_#1018280A, 0px_-0.25px_22.07px_-3.68px_#1018281A]">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground font-poppins text-[#4A4A4A]">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-md bg-[#1F2B6C] px-4 py-2 text-sm font-medium text-white hover:bg-[#1F2B6C]/90"
        >
          {buttonText}
        </button>
        <button className="rounded-md bg-[#1F2B6C] px-4 py-2 text-sm font-medium text-white hover:bg-[#1F2B6C]/90" onClick={() => window.location.href = `/upload-page?serviceId=${serviceId}`}>
          Documents
        </button>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">{startingText}</span>
          <div>
            <span className="font-semibold text-red-500">
              {currency} {price}
            </span>
            <span className="text-sm text-muted-foreground">{period}</span>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <PricingDialog
          title={title}
          basePrice={Number(price)}
          currency={currency}
          period={period}
          requests={requests}
          subServiceId={serviceId} 
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  )
}
