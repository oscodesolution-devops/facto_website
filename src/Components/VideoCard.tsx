import { useRef } from "react";

const VideoCard = ({
  width = "",
  videoSrc = "/assets/bulb.mp4",
  descriptionHeading = "Default Heading",
  description = "Default Description",
}: {
  videoSrc?: string;
  descriptionHeading?: string;
  description?: string;
  width?: string; 
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
      className={`${width} h-auto rounded-[8.47px] shadow-[0px_5.64px_5.64px_-2.82px_#1018280A,0px_14.11px_16.93px_-2.82px_#1018281A] bg-white p-[17px] flex flex-col items-center`}
    >
      <video
        ref={videoRef}
        className="w-full rounded-[8.47px] cursor-pointer"
        src={videoSrc}
        controls
        onClick={handleFullscreen}
      >
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
