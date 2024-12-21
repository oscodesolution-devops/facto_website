import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "./ui/navigation-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Logo from "../assets/logo.svg";
import { useGlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
  const { user, isAuthenticated } = useGlobalContext();
  const defaultAvatar = "./assets/user.png";
  const activeClass = "text-green-500 underline";
  const defaultClass = "text-primary hover:text-secondary";

  useEffect(() => {
    AOS.init({
      duration: 400,
    });
  }, []);

  return (
    <nav
      className="bg-white h-auto border-b border-primary px-4  relative z-20"
      style={{ fontFamily: "Erode Variable" }}
      data-aos="fade-down"
    >
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <div className="w-48">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-48 h-auto cursor-pointer" />
          </NavLink>
        </div>

        {/* Desktop Navigation Menu - Centered */}
        <div className="hidden md:flex items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex font-[poppins] text-lg gap-2 font-medium flex-wrap">
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
                  Quotation
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
                  Plans
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Authentication Links - Right aligned */}
        <div className="p-6 justify-end hidden md:flex">
          {isAuthenticated ? (
            <NavLink to="/profile">
              <Avatar className="cursor-pointer">
                <AvatarImage src={defaultAvatar} alt="User" />
                <AvatarFallback>
                  {user?.user?.fullName ? user?.user.fullName[0] : "U"}
                </AvatarFallback>
              </Avatar>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <button className="bg-primary text-white px-4 py-2 rounded-full">
                Log In/ Sign Up
              </button>
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button - Right aligned */}
        {/* Mobile Menu Button - Right aligned */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-primary focus:outline-none">
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
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white rounded-lg shadow-lg w-[90%] max-w-xs p-4 right-4 mt-2"
              side="bottom"
              align="end"
            >
              <DropdownMenuItem>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Home
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Services
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/courses"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Courses
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Contact
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Pricing
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/update"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Update
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <NavLink
                  to="/active-plans"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                >
                  Active Plans
                </NavLink>
              </DropdownMenuItem>

              {/* Login/Authenticated Links */}
              <div className="mt-4">
                {isAuthenticated ? (
                  <NavLink to="/profile">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={defaultAvatar} alt="User" />
                      <AvatarFallback>
                        {user?.user?.fullName ? user?.user?.fullName[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </NavLink>
                ) : (
                  <NavLink to="/login">
                    <button className="bg-primary text-white px-4 py-2 rounded-full w-full">
                      Log In
                    </button>
                  </NavLink>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
