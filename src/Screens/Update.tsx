import { useEffect, useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
import "aos/dist/aos.css";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Phone from "@/Components/Phone";
import NewsCardSkeleton from "@/Components/ui/news-card-skeleton";
import { Updates } from "@/api";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/Components/ui/breadcrumb";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/Components/ui/dropdown-menu";
// import { Button } from "@/Components/ui/button";

type Blog = {
  _id: string; // Unique identifier for the blog
  title: string; // Title of the blog
  content: string; // Main content of the blog
  contentType: "image" | "video" | "text"; // Type of content (image, video, or text)
  contentUrl: string; // URL for the media content (image or video)
  tags: string[]; // Array of tags associated with the blog
  reference: { url: string }; // Reference URL for additional details
  createdAt: string; // Creation date of the blog
};


// const DropdownMenuDemo = ({
//   selected,
//   setSelected,
// }: {
//   selected: string;
//   setSelected: React.Dispatch<React.SetStateAction<string>>;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const options = ["Daily", "Weekly", "Monthly", "Yearly"];

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           className="flex items-center font-[Poppins] font-light text-sm"
//         >
//           {selected}
//           {isOpen ? (
//             <ChevronUp className="ml-2 h-4 w-4" />
//           ) : (
//             <ChevronDown className="ml-2 h-4 w-4" />
//           )}
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-44 font-[Poppins] font-light text-sm">
//         <DropdownMenuGroup>
//           {options.map((option) => (
//             <DropdownMenuItem
//               key={option}
//               onClick={() => setSelected(option)}
//             >
//               {option}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

const Update = () => {
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  // const [selectedTimeframe, setSelectedTimeframe] = useState("Weekly");
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handleReadMore = (id: string) => {
    location.href = id;
  };

  const categories = ["All", "Recent Updates", "GST", "Income Tax", "Other2", "Other", "Other3"];

  const renderMediaContent = (blog: Blog) => {
    if (blog.contentType === "image") {
      return (
        <img
          src={blog.contentUrl || "https://via.placeholder.com/600x300"}
          alt={blog.title}
          className="w-full max-w-[600px] h-auto object-cover rounded-md"
          style={{ height: "300px" }}
        />
      );
    } else if (blog.contentType === "video") {
      if (blog.contentUrl.includes("youtube.com") || blog.contentUrl.includes("youtu.be")) {
        const embedUrl = blog.contentUrl.includes("youtube.com")
          ? blog.contentUrl.replace("watch?v=", "embed/")
          : `https://www.youtube.com/embed/${blog.contentUrl.split("/").pop()?.split("?")[0]}`;
        return (
          <iframe
            src={embedUrl}
            title="YouTube Video"
            className="w-full max-w-[600px] h-auto rounded-md"
            style={{ height: "300px" }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
      return (
        <video
          src={blog.contentUrl}
          controls
          className="w-full max-w-[600px] h-auto rounded-md"
          style={{ height: "300px" }}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
    return <p>No media content available.</p>;
  };
  

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await Updates.getBlogs();
        setBlogs(res.data.blogs);
        setIsLoadingBlogs(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <section>
        <div className="mb-10 pl-[83px] pt-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[#8F9EB2] font-light font-[Poppins]">
                  Update
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-black font-[Poppins]">
                  GST
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Categories */}
        <div className="w-full flex justify-center py-6">
          <div data-aos="fade-up" className="flex gap-5 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-w-[138px] px-4 py-2 rounded-full font-[Poppins] font-[300] text-sm transition-all ${
                  activeCategory === category ? "bg-primary text-white" : "bg-[#D1FADF] text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs */}
        <div
          data-aos="fade-up"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-10 pt-[40px] pb-[140px] mx-auto max-w-screen-xl"
        >
          {isLoadingBlogs
            ? Array(3)
                .fill(null)
                .map((_, index) => <NewsCardSkeleton key={index} />)
            : blogs.map((blog) => (
                <div key={blog._id} className="flex flex-col gap-4">
                  {renderMediaContent(blog)}
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-sm text-gray-500">{blog.content}</p>
                  <button
                    onClick={() => handleReadMore(blog.reference.url)}
                    className="text-primary underline text-sm"
                  >
                    Read More
                  </button>
                </div>
              ))}
        </div>
      </section>

      <div className="bg-[#DDE2FF] ">
        <Phone />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Update;
