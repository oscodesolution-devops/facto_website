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

      {/* Normal Navbar Items */}
      <div className="hidden md:flex items-center space-x-8">
        <NavigationMenu>
          <NavigationMenuList className="flex font-[poppins] text-lg gap-6 font-medium">
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
            <button className="bg-primary text-white px-4 py-2 rounded-full">
              Log In
            </button>
          </NavLink>
        )}
      </div>

      {/* Hamburger Icon */}
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
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Dialog Box */}
      <div
        className={`fixed inset-0 z-50 bg-white bg-opacity-50 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bg-white w-[20%] h-full shadow-lg p-6 transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-999`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            className="self-end mb-4 text-primary"
            onClick={() => setMenuOpen(false)}
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Navigation Items in Dialog */}
          <NavigationMenu className="bg-white">
            <NavigationMenuList className="flex flex-col text-lg gap-6 font-medium">
              <NavigationMenuItem>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClass : defaultClass
                  }
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
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
                  onClick={() => setMenuOpen(false)}
                >
                  Active Plans
                </NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Authentication Links */}
          {isAuthenticated ? (
            <NavLink to="/profile">
              <Avatar className="cursor-pointer mt-4">
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
              <button className="bg-primary text-white px-4 py-2 rounded-full mt-4">
                Log In
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
