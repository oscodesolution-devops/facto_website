function BlogSkeleton() {
    return (
        <div className="p-8 flex flex-col items-center animate-pulse">
            <div className="w-[80%] max-w-[1300px] flex flex-col items-center text-left mb-10">
                {/* Title Skeleton */}
                <div className="h-8 w-3/4 bg-gray-300 rounded-md mb-4"></div>

                {/* Image Skeleton */}
                <div className="w-full h-[344px] bg-gray-300 rounded-md mb-5"></div>

                {/* Date Skeleton */}
                <div className="h-4 w-1/4 bg-gray-300 rounded-md mb-4"></div>

                {/* Content Skeleton */}
                <div className="h-6 w-full bg-gray-300 rounded-md mb-4"></div>
                <div className="h-6 w-5/6 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-6 w-4/6 bg-gray-300 rounded-md mb-4"></div>

                {/* URL Skeleton */}
                <div className="h-4 w-1/3 bg-gray-300 rounded-md mt-8"></div>
            </div>
        </div>
    );
}

export default BlogSkeleton;
