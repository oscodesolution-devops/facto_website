import { useState } from 'react'
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader} from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { Mail, Share2, Twitter, PhoneIcon as WhatsApp, BookOpen, BarChart, Globe, Subtitles, Link } from 'lucide-react'
import { Toast, ToastDescription } from "@/Components/ui/toast"
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  title: string
  description: string
  currentPrice: number
  courseId?: string
  totalLectures: number
  courseLevel: string
  language: string
  subtitleLanguage: string
  note?: string
}

export default function Component({
  title = "Tax Certificate Course",
  // description = "Lorem ipsum dolor sit amet",
  currentPrice = 1999,
  courseId,
  totalLectures = 6,
  courseLevel = "Beginner and Intermediate",
  language = "Hindi",
  subtitleLanguage = "English",
  note = "magna aliqua.Ut enim ad minim veniam"
}: CourseCardProps) {

  const [isCopied, setIsCopied] = useState(false)
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate("/payment", { 
      state: { 
        title:title,
        subServiceId: courseId,
        finalPrice: currentPrice,
        // selectedFeatures,
        itemType: "course"
      } 
    }); // Navigate to the Payment page
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setIsCopied(true)
      Toast({
        title: "Link copied!",
        variant: "default",  // specify the variant if needed
        children: (
          <ToastDescription>
            The course link has been copied to your clipboard.
          </ToastDescription>
        ),
      })
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(err => {
      console.error('Failed to copy: ', err)
      Toast({
        title: "Failed to copy",
        variant: "destructive",
        children: (
          <ToastDescription>
            An error occurred while copying the link.
          </ToastDescription>
        ),
      })
    })
  }

  return (
    <Card className="w-[424px]">
      <CardHeader>
        <div className="flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold">Rs {currentPrice.toLocaleString()}</span>
          </div>
        </div>
        {/* <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription> */}
        {/* <div className="text-red-500 text-sm mt-2">
          {daysLeft} days left at this price!
        </div> */}
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Total Lecture
            </span>
            <span>{totalLectures}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Course Level
            </span>
            <span>{courseLevel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language
            </span>
            <span>{language}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Subtitles className="h-4 w-4" />
              Subtitle Language
            </span>
            <span>{subtitleLanguage}</span>
          </div>
        </div>

        <Separator className="my-4" />

        <Button 
          onClick={handleBuyNow} 
          className="w-full bg-[#253483] hover:bg-[#1c2861] rounded-none">
          Buy Now
        </Button>

        {note && (
          <>
            <div className="text-sm text-muted-foreground">
              Note: {note}
            </div>
          </>
        )}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="text-sm font-medium">Share this course:</div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="bg-[#E9FFE9] hover:bg-[#D0FFD0]">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-[#E9FFE9] hover:bg-[#D0FFD0]">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-[#E9FFE9] hover:bg-[#D0FFD0]">
              <Mail className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-[#E9FFE9] hover:bg-[#D0FFD0]">
              <WhatsApp className="h-4 w-4" />
            </Button>
            <Button 
              onClick={copyLink} 
              className="w-[138px] bg-[#E9FFE9] text-black hover:bg-[#D0FFD0] flex items-center justify-center gap-2"
            >
              <Link className="h-4 w-4" />
              {isCopied ? 'Copied!' : 'Copy link'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
