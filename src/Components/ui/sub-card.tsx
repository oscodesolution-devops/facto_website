import { Check, CreditCard } from 'lucide-react'

import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

interface TaxCardProps {
  title?: string
  checkedItems?: Array<string>
  showRevalidateButton?: boolean
  amount?: string
  dueDate?: string
  cardNumber?: string
  cardExpiry?: string
  onViewDetails?: () => void
  onRevalidate?: () => void
}

export default function Component({
  title = "GSTR-1 & 3B",
  checkedItems = [
    "Capital gains",
    "More than one house property",
    "Foreign income/Foreign Asset",
    "Foreign income/Foreign Asset",
  ],
  showRevalidateButton = true,
  amount = "Rs 299",
  dueDate = "30/10/2024",
  cardNumber = "1234",
  cardExpiry = "06/2024",
  onViewDetails = () => {},
  onRevalidate = () => {},
}: TaxCardProps) {
  return (
    <Card className="w-full max-w-[1300px]">
      <CardHeader className="bg-green-500 text-white">
        <CardTitle className="text-lg font-medium">1. {title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {checkedItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="outline"
                className="rounded-md px-6"
                onClick={onViewDetails}
              >
                View Details
              </Button>
              {showRevalidateButton && (
                <Button
                  className="rounded-md bg-red-500 px-6 hover:bg-red-600"
                  onClick={onRevalidate}
                >
                  Revalidate
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment</h3>
            <p className="text-sm text-gray-600">
              Your next bill is for {amount} + Tax on {dueDate}
            </p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-orange-500" />
              <div className="text-sm text-gray-600">
                <p>Mastercard ending in {cardNumber}</p>
                <p>Expiry {cardExpiry}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}