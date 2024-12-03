function PricingCardSkeleton() {
    return (
        <div className="w-full max-w-sm rounded-lg bg-gray-100 p-6 shadow-[0px_7.36px_7.36px_-3.68px_#1018280A, 0px_-0.25px_22.07px_-3.68px_#1018281A] animate-pulse">
            {/* Title Skeleton */}
            <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>

            {/* Description Skeleton */}
            <div className="mt-2 h-4 w-full bg-gray-300 rounded-md"></div>
            <div className="mt-1 h-4 w-5/6 bg-gray-300 rounded-md"></div>

            {/* Features Skeleton */}
            <ul className="mt-4 space-y-2">
                {Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded-md"></div>
                        </li>
                    ))}
            </ul>

            {/* Button and Price Skeleton */}
            <div className="mt-6 flex items-center justify-between">
                {/* Button */}
                <div className="h-10 w-24 bg-gray-300 rounded-md"></div>

                {/* Price Section */}
                <div className="space-y-1 text-right">
                    <div className="h-4 w-16 bg-gray-300 rounded-md"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}

export default PricingCardSkeleton;
