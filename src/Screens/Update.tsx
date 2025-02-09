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
import { FaFacebook, FaLink, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
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

const Update = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [singleBlog, setSingleBlog] = useState<Blog | null>(null);
  const handleReadMore = (id: string) => {
    location.href = id;
  };
  const navigate = useNavigate();

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
  const fetchSingleBlog = async (blogId: string) => {
    try {
      const res = await Updates.getBlogById(blogId);
      console.log(res) // Assume your API has a `getBlogById` method
      setSingleBlog(res.data.blog);
      setIsLoadingBlogs(false);
    } catch (err) {
      console.error("Error fetching single blog:", err);
    }
  };
  const fetchBlogs= async ()=> {
    try {
      const res = await Updates.getBlogs();
      setBlogs(res.data.blogs);
      setIsLoadingBlogs(false);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (id) {
      // Fetch a single blog if ID is in the URL
      fetchSingleBlog(id);
    } else {
      // Fetch all blogs if no ID is provided
      fetchBlogs();
    }
  }, [id]);

  return (
    <div className="overflow-hidden">
      <Navbar />
      <section>
        <div className="mb-10 pl-[83px] pt-[12px] ">
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
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-10 pt-[40px] pb-[140px] mx-auto max-w-screen-x mdpx-0 px-5"
        >
          {isLoadingBlogs
            ? Array(3)
                .fill(null)
                .map((_, index) => <NewsCardSkeleton key={index} />)
            :id && singleBlog ? 
              // Render Single Blog
              <div className="flex flex-col gap-4">
                {renderMediaContent(singleBlog)}
                <h1 className="text-2xl font-bold">{singleBlog.title}</h1>
                <p className="text-gray-700">{singleBlog.content}</p>
                {/* Share Options */}
                <div className="flex gap-4 mt-2">
                  {/* Facebook Share */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://facto.org.in/update/${singleBlog._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaFacebook/>
                  </a>
            
                  {/* Twitter Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://facto.org.in/update/${singleBlog._id}&text=${encodeURIComponent(singleBlog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FaTwitter/>
                  </a>
            
                  {/* WhatsApp Share */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Check this out: https://facto.org.in/update/${singleBlog._id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500"
                  >
                    <FaWhatsapp/>
                  </a>
            
                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://facto.org.in/update/${singleBlog._id}`);
                      alert('Link copied to clipboard!');
                    }}
                    className="text-gray-600 underline"
                  >
                    <FaLink/>
                  </button>
                </div>
                <button
                  onClick={() => navigate("/update")}
                  className="mt-4 text-primary underline"
                >
                  Back to Updates
                </button>
              </div>
             : blogs.map((blog) => (
              <div key={blog._id} className="flex flex-col gap-4 md:w-lvw md:px-8">
                {renderMediaContent(blog)}
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-500">{blog.content}</p>
                <button
                  onClick={() => handleReadMore(blog.reference.url)}
                  className="text-primary underline text-sm"
                >
                  Read More
                </button>
                {/* Share Options */}
                <div className="flex gap-4 mt-2">
                  {/* Facebook Share */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=https://facto.org.in/update/${blog._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    <FaFacebook/>
                  </a>
            
                  {/* Twitter Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://facto.org.in/update/${blog._id}&text=${encodeURIComponent(blog.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    <FaTwitter/>
                  </a>
            
                  {/* WhatsApp Share */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `Check this out: https://facto.org.in/update/${blog._id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500"
                  >
                    <FaWhatsapp/>
                  </a>
            
                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://facto.org.in/update/${blog._id}`);
                      alert('Link copied to clipboard!');
                    }}
                    className="text-gray-600 underline"
                  >
                    <FaLink/>
                  </button>
                </div>
              </div>
            ))
            
            }
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
