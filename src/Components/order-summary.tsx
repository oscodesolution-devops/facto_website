import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Separator } from "@/Components/ui/separator"
import { Receipt } from 'lucide-react'

// Dummy data (this would typically come from a backend)
const orderDetails = {
  serviceName: "GST service",
  serviceDescription: "GSTR-1 & 3B",
  price: 999,
  platformCharge: 10,
  taxAmount: 2.24,
}

export default function Component() {
  const total = orderDetails.price + orderDetails.platformCharge;

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
              <p className="font-medium text-base sm:text-lg">{orderDetails.serviceName}</p>
              <p className="text-sm text-muted-foreground">{orderDetails.serviceDescription}</p>
            </div>
          </div>
          <p className="font-medium text-lg">Rs {orderDetails.price}</p>
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
            <p>Rs {orderDetails.price}</p>
          </div>
          <div className="flex justify-between text-base sm:text-lg">
            <p>Platform charge</p>
            <p>Rs {orderDetails.platformCharge}</p>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-300" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 gap-4">
        <div>
          <p className="text-lg sm:text-xl font-bold">Total</p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Including Rs {orderDetails.taxAmount.toFixed(2)} in taxes
          </p>
        </div>
        <p className="text-xl sm:text-2xl font-bold">Rs {total}</p>
      </div>
    </section>
  )
}
