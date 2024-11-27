import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Logo from "../assets/logo.svg";
import { useGlobalContext } from "@/context/GlobalContext"; 

const Navbar = () => {
  const { user, isAuthenticated } = useGlobalContext(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const defaultAvatar = "./assets/user.png"; 
  const activeClass = "text-green-500 underline";
  const defaultClass = "text-primary hover:text-secondary";

  useEffect(() => {
    AOS.init({
      duration: 400,
    });
  }, []);
  
  useEffect(() => {
    console.log('User:', user);
    console.log("isAuthenticated in Navbar:", isAuthenticated); // Debugging
  }, [isAuthenticated]);
  

  return (
    <nav
      className="bg-white h-auto border-b border-primary flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10"
      style={{ fontFamily: "Erode Variable" }}
      data-aos="fade-down"
    >
      <div className="flex items-center justify-between w-full">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="w-48 h-auto cursor-pointer" />
        </NavLink>

        <button
          className="block md:hidden text-primary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-6 w-full mt-4 md:mt-0`}
      >
        <NavigationMenu>
          <NavigationMenuList className="flex font-[poppins] flex-col md:flex-row text-lg gap-4 md:gap-8 font-medium">
            <NavigationMenuItem>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Home
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Services
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Courses
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Contact
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Pricing
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/update"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Update
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLink
                to="/active-plans"
                className={({ isActive }) =>
                  isActive ? activeClass : defaultClass
                }
              >
                Active Plans
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile version */}
        <div className="flex flex-col items-center mt-4 md:hidden">
          {isAuthenticated ? (
            <NavLink to="/profile">
              <div className="w-14 h-14">
                <Avatar className="cursor-pointer w-full h-full">
                  <AvatarImage
                    src={user?.avatar || defaultAvatar}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name ? user.name[0] : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="bg-primary text-white px-4 py-2 rounded-full">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Desktop version */}
      {isAuthenticated && user && (
 <div className="block md:block ml-4 w-20 h-20 mr-4">
 <NavLink to="/profile">
   <Avatar className="cursor-pointer w-20 h-20">
     <AvatarImage src={user.avatar || defaultAvatar} alt={user.name || "User"} />
     <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
   </Avatar>
 </NavLink>
</div>

      )}

      {!isAuthenticated && (
        <div className="hidden md:block w-[200px] h-[auto] ml-4">
          <NavLink to="/login">
            <button className="bg-primary font-[poppins] font-[600] text-white px-4 py-2 rounded-full">
              Log In
            </button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
