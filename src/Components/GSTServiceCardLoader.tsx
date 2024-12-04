import { Card, CardContent, CardHeader } from "@/Components/ui/card";

export default function GSTServiceCardSkeleton() {
  return (
    <Card className="w-[369.06px] sm:w-[320px] md:w-[300px] lg:w-[369.06px] max-h-[410px] mx-auto overflow-auto animate-pulse">
      <CardHeader className="space-y-4 pb-4">
        {/* Icon Placeholder */}
        <div className="flex items-center justify-start">
          <div className="rounded-full bg-gray-200 h-10 w-10" />
        </div>

        {/* Title and Description Placeholder */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* List Steps Placeholder */}
        <ul className="space-y-2">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-200 flex-shrink-0" />
                <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
              </li>
            ))}
        </ul>

        {/* Note Placeholder */}
        <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>

        {/* Buttons Placeholder */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="h-8 bg-gray-200 rounded-full w-full"></div>
          <div className="h-8 bg-gray-200 rounded-full w-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}
