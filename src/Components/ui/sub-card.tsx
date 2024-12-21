import { Check, CreditCard, FileText } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

interface TaxCardProps {
  title: string
  features: string[]
  showRevalidateButton: boolean
  price: number
  purchaseDate: string
  serviceId: string
  updatedAt: string
  requests: Array<{
    name: string
    needsQuotation: boolean
  }>
  onViewDetails?: () => void
  onRevalidate?: () => void
}

export default function TaxCard({
  title,
  features,
  showRevalidateButton,
  price,
  purchaseDate,
  serviceId,
  updatedAt,
  requests,
  onViewDetails = () => {},
  onRevalidate = () => {}, 
}: TaxCardProps) {
  return (
    <Card className="w-full max-w-[1300px] mx-auto">
      <CardHeader className="bg-green-500 text-white">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            {/* Features Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Buttons Section */}
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

            {/* Requests Section */}
            {requests.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-md font-semibold text-gray-700">
                  Service Requests
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {requests.map((request, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 bg-gray-100 p-2 rounded-md"
                    >
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700">
                        {request.name}
                      
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Details Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <p className="text-sm text-gray-600">
              Total Amount: ₹{price}
            </p>
            <p className="text-sm text-gray-600">
              Purchase Date: {new Date(purchaseDate).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-orange-500" />
              <div className="text-sm text-gray-600">
                <p>Service ID: {serviceId.slice(-4)}</p>
                <p>Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}