import PaymentForm from "@/Components/PaymentForm"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Separator } from "@/Components/ui/separator"
import { Receipt } from 'lucide-react'

// Updated interface for component props
interface OrderSummaryProps {
  courseTitle: string;
  amount: number;
  subServiceId?: string;
  selectedFeatures?: string[];
  itemType: string;
  billingPeriod: string;
}

export default function OrderSummary({ 
  courseTitle, 
  amount, 
  subServiceId, 
  selectedFeatures,
  itemType, 
  billingPeriod,
}: OrderSummaryProps) {
  // Platform charge as a fixed percentage (e.g., 2% of the amount)
  const platformCharge = Math.round(amount * 0.02);
  
  // Calculate total including platform charge
  const total = amount + platformCharge;

  // Calculate tax (assuming a simple tax calculation)
  const taxAmount = Math.round(amount * 0.01);

  return (
    <section className="w-full max-w-3xl mx-auto px-6 py-8 sm:p-12 bg-transparent">
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold">Order Details</h2>
        <Separator className="bg-gray-300" />
      </div>

      <div className="space-y-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-200 p-2">
              <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-grey-700" />
            </div>
            <div>
              <p className="font-medium text-base sm:text-lg">{courseTitle}</p>
              {selectedFeatures && selectedFeatures.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Features: {selectedFeatures.join(", ")}
                </p>
              )}
            </div>
          </div>
          <p className="font-medium text-lg">Rs {amount}</p>
        </div>

        <Separator className="bg-gray-300" />

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Input placeholder="Gift or discount code" className="flex-1" />
          <Button className="w-full sm:w-auto px-6">Apply</Button>
        </div>

        <Separator className="bg-gray-300" />

        <div className="pt-6 space-y-4">
          <div className="flex justify-between text-base sm:text-lg">
            <p>Subtotal</p>
            <p>Rs {amount}</p>
          </div>
          <div className="flex justify-between text-base sm:text-lg">
            <p>Platform charge</p>
            <p>Rs {platformCharge}</p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 gap-4">
        <div>
          <p className="text-lg sm:text-xl font-bold">Total</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Including Rs {taxAmount.toFixed(2)} in taxes
          </p>
        </div>
        <p className="text-xl sm:text-2xl font-bold">Rs {total}</p>
      </div>
      <PaymentForm
        itemType={itemType} 
        amount={total}
        selectedFeatures={selectedFeatures} 
        subServiceId={subServiceId}
        billingPeriod={billingPeriod}
      />
    </section>
  )
}