function NewsCardSkeleton() {
    return (
        <div className="w-[355px] h-[434px] overflow-hidden shadow-lg border-none flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="relative w-full h-48 bg-gray-300 rounded-t-lg"></div>

            {/* Content Skeleton */}
            <div className="p-6 space-y-4 text-center flex-1 flex flex-col justify-between">
                {/* Title Skeleton */}
                <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>

                {/* Description Skeleton */}
                <div className="h-4 w-full bg-gray-300 rounded-md"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded-md"></div>

                {/* Button Skeleton */}
                <div className="h-10 w-full bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
}

export default NewsCardSkeleton;
