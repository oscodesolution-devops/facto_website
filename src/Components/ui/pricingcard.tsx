import { useState } from "react"
import PricingDialog from "./pricing-dialog"

export default function PricingCard({
  title = "GSTR-1 & 3B Monthly",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,",
  features = [
    "Capital gains",
    "More than one house property",
    "Foreign Income/Foreign Asset"
  ],
  buttonText = "GET QUOTATION",
  startingText = "Starting from",
  price = "1001",
  currency = "Rs",
  period = "/Month"
}: {
  title?: string
  description?: string
  features?: string[]
  buttonText?: string
  startingText?: string
  price?: string
  currency?: string
  period?: string
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
          price={price} 
          currency={currency}
          period={period}
          isOpen={isDialogOpen} 
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  )
}
