import { useRef, useState, useEffect } from "react";

interface VideoCardProps {
  videoSrc?: string;
  descriptionHeading?: string;
  description?: string;
  width?: string;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
  autoPlayOnLoad?: boolean; // New prop for autoplay control
  muted?: boolean; // Adding muted prop since browsers often require muted for autoplay
}

const VideoCard = ({
  width = "",
  videoSrc = "https://res.cloudinary.com/diush63ly/video/upload/v1732811845/course_videos/ftx3m6weslqoknsmc8jo.mp4",
  descriptionHeading = "Default Heading",
  description = "Default Description",
  onPlay,
  onPause,
  autoPlayOnLoad = false, // Default to false
  muted = true, // Default to true for better autoplay support
}: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Set page as loaded
    setIsPageLoaded(true);

    // Attempt autoplay if enabled
    if (autoPlayOnLoad && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Autoplay failed:', err);
      });
    }

    // Cleanup function
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [autoPlayOnLoad]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
    // Try autoplay again after video data is loaded
    if (autoPlayOnLoad && isPageLoaded && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn('Autoplay failed after load:', err);
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Error loading video. Please try again.');
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      }
    }
  };

  return (
    <div
      className={`${width} h-auto rounded-[8.47px] shadow-[0px_5.64px_5.64px_-2.82px_#1018280A,0px_14.11px_16.93px_-2.82px_#1018281A] bg-white p-[17px] flex flex-col items-center relative`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded-[8.47px]">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[8.47px]">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full rounded-[8.47px] cursor-pointer"
        style={{ width }}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        onPlay={onPlay}
        onPause={onPause}
        playsInline
        preload="metadata"
        onClick={handleFullscreen}
        controls
        muted={muted}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="mt-[17px] text-center">
        <h4 className="font-[inter] text-[13px] sm:text-[14px] md:text-[16px] font-bold leading-[19.75px]">
          {descriptionHeading}
        </h4>
        <p className="font-[inter] text-[10px] sm:text-[12px] md:text-[14px] font-normal leading-[14.11px] mt-[5px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;