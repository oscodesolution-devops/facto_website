import { Facebook, Instagram, Twitter } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

interface ProfileCardProps {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}

export default function Component({
  name = "Test Name",
  title = "CEO",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  imageUrl = "/placeholder.svg?height=200&width=200",
  facebookUrl = "#",
  instagramUrl = "#",
  twitterUrl = "#",
}: ProfileCardProps) {
  return (
    <Card className="w-[287px] h-[399px] flex flex-col border-black shadow-xl bg-black bg-opacity-25">
      <CardHeader className="flex-grow flex flex-col items-center justify-center pt-6">
        {/* <img src={imageUrl} alt={name} className="w-32 h-32 bg-green-700 rounded-full mb-4 object-cover" /> */}
        <div className="relative inline-block">
          {/* Background circle */}
          <div className="w-36 h-36 bg-white rounded-full absolute top-2 left-2 opacity-20" />

          {/* Middle circle */}
          <div className="w-36 h-36 bg-white rounded-full absolute top-1 left-1 opacity-40" />

          {/* Front circle */}
          <div className="w-36 h-36 bg-white rounded-full relative">
            {/* Image container */}
            <div className="absolute inset-0 rounded-full">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardHeader>
      <CardContent className="text-center px-4">
        <p className="text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4 pb-6">
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#E8F3F3]"
        >
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <Facebook className="h-5 w-5" />
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#E8F3F3]"
        >
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5" />
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full bg-[#E8F3F3]"
        >
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-5 w-5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
