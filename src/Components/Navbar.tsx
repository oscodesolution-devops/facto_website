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
      className="bg-white h-auto border-b border-primary flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 relative z-20"
      style={{ fontFamily: "Erode Variable" }}
      data-aos="fade-down"
    >
      {/* Logo */}
      <NavLink to="/">
        <img src={Logo} alt="Logo" className="w-48 h-auto cursor-pointer" />
      </NavLink>

      {/* Desktop Navigation Menu */}
      <div className="hidden md:flex items-center flex-grow justify-end">
        <NavigationMenu>
          <NavigationMenuList className="flex font-[poppins] text-lg gap-6 md:gap-10 font-medium">
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

        {/* Authentication Links */}
        {isAuthenticated ? (
          <NavLink to="/profile">
            <Avatar className="cursor-pointer ml-4">
              <AvatarImage
                src={user?.avatar || defaultAvatar}
                alt={user?.name || "User"}
              />
              <AvatarFallback>
                {user?.name ? user.name[0] : "U"}
              </AvatarFallback>
            </Avatar>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <button className="bg-primary text-white px-4 py-2 rounded-full">
              Log In
            </button>
          </NavLink>
        )}
      </div>

      {/* Dropdown Menu for Mobile */}
      <DropdownMenu>
        <DropdownMenuTrigger className="block md:hidden text-primary focus:outline-none">
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
          <div className="mt-4">
            {isAuthenticated ? (
              <NavLink to="/profile">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.avatar || defaultAvatar}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name ? user.name[0] : "U"}
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
    </nav>
  );
};

export default Navbar;
