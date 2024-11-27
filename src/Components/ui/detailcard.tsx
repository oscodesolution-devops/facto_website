import { CircleDollarSign } from 'lucide-react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { useNavigate } from "react-router-dom"

interface GSTServiceCardProps {
  showPrimaryButton?: boolean
  showSecondaryButton?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  title?: string
  description?: string
  icon?: string
  _id?: string
}



export default function GSTServiceCard({
  showPrimaryButton = true,
  showSecondaryButton = true,
  primaryButtonText = "Start Filing",
  secondaryButtonText = "More Details",
  title,
  description,
  icon,
  _id,
  onPrimaryClick = () => {},
  // onSecondaryClick = () => {}
}: GSTServiceCardProps) {
  const navigate = useNavigate();  // Use the hook to navigate

  const handlePrimaryButtonClick = () => {
    navigate(`/services?id=${_id}`);  // Navigate to /services with _id as a query parameter
    if (onPrimaryClick) {
      onPrimaryClick();  // Optionally call the passed in callback function
    }
  };
  return (
    <Card className="w-[369.06px] max-h-[410px] overflow-auto">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-start">
          <div className="rounded-full bg-[#E6F7EC] p-3">
            <CircleDollarSign className="h-6 w-6 text-[#00A651]" />
          </div>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-[#32357B]">{title}</CardTitle>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm text-gray-600">
          {[
            'Click "More Details" or "Start Filing," then select the return type or request a callback directly.',
            'Choose options to get an estimated price.',
            'Activate your plan.'
          ].map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-gray-600 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
        
        <p className="text-xs italic text-[#32357B]">Note: You can pay after your GST filing is completed.</p>

        <div className="flex gap-2">
          {showSecondaryButton && (
            <Button 
              variant="outline" 
              className="flex-1 rounded-full border-2 border-[#32357B] text-[#32357B] hover:bg-[#32357B] hover:text-white text-sm py-1"
              onClick={handlePrimaryButtonClick}
            >
              {secondaryButtonText}
            </Button>
          )}
          {showPrimaryButton && (
            <Button 
              className="flex-1 rounded-full bg-[#32357B] text-white hover:bg-[#272968] text-sm py-1"
              onClick={handlePrimaryButtonClick}
            >
              {primaryButtonText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}