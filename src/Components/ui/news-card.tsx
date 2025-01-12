// import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
} from "@/Components/ui/card";

interface NewsCardProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  // buttonText: string;
  onButtonClick?: () => void;
}

export default function NewsCard({
  imageUrl,
  imageAlt,
  title,
  description,
  // buttonText,
  onButtonClick,
}: NewsCardProps) {
  return (
    <Card className="w-full max-w-[344px] min-h-[434px] p-2 shadow-lg border-none flex flex-col" onClick={onButtonClick}>
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="object-cover rounded-t-lg w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 text-center flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold leading-tight text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>
        
      </CardContent>
    </Card>
  );
}
